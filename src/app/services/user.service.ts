import {Injectable} from '@angular/core';
import {Customer} from '../models/Customer';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer: Customer;
    activeCustomer: Customer;
    customerAccounts: Customer[] = [];
    public customerAccounts$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
    public activeCustomer$: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);

    constructor() {
    }

    // Ajoute un compte au tableau de comptes du téléphone. Le client actif est attribué à ce moment la
    addCustomer(customer: Customer ) {
        this.customerAccounts.push(customer);
        this.customerAccounts$.next(this.customerAccounts);
        this.setActiveCustomer(customer);
    }

    // Supprimer un compte des comptes sur le téléphone.
    // On cherche l'index dans le tableau et on le supprime, ensuite on met à jour les subscribes
    removeCustomer(customer: Customer) {
        if(this.activeCustomer === customer) {
            this.activeCustomer = null;
            this.activeCustomer$.next(customer);
        }
        const i = this.customerAccounts.indexOf(this.customer);
        this.customerAccounts.splice(i, 1);
        this.customerAccounts$.next(this.customerAccounts);
    }

    // permet de récupérer la liste de comptes
    getAccounts() {
        return this.customerAccounts;
    }

    // permet de définir quel est le compte actif puis l'envoie au subscribe
    setActiveCustomer(customer: Customer) {
        this.activeCustomer = customer;
        this.activeCustomer$.next(this.activeCustomer);
        localStorage.setItem('user',JSON.stringify(this.activeCustomer))
    }

    // récupère le compte actif
    getActiveCustomer() {
        return this.activeCustomer;
    }

    // ici on fait simplement transiter un compte (pas forcément actif, utilisé dans settings)
    setCustomer(customer: Customer) {
        this.customer = customer;
        this.activeCustomer$.next(this.customer);
    }

    // on récupère un compte (utilisé dans del-acc)
    getCustomer() {
        return this.customer;
    }

}
