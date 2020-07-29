import {Injectable} from '@angular/core';
import {Customer} from '../models/Customer';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer : Customer;
    activeCustomer: Customer;
    customerAccounts : Customer[] = [];
    public customerAccounts$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
    public activeCustomer$: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);

    constructor() {
    }

    addCustomer( customer : Customer ) {
        this.customerAccounts.push(customer);
        this.customerAccounts$.next(this.customerAccounts);
        this.setActiveCustomer(customer);
    }

    removeCustomer( customer : Customer) {
        // console.log(this.customerAccounts.forEach(value => value.name));
        let i = this.customerAccounts.indexOf(customer);
        this.customerAccounts.splice(i,1);
        this.customerAccounts$.next(this.customerAccounts);
        this.activeCustomer$.next(this.customerAccounts[0]);
        // .log(this.customerAccounts.forEach(value => value.name));
    }

    getAccounts() {
        return this.customerAccounts;
    }

    setActiveCustomer( customer : Customer) {
        let i = this.customerAccounts.indexOf(customer);
        this.activeCustomer = this.customerAccounts[i];
        this.activeCustomer$.next(this.activeCustomer);
    }

    getActiveCustomer() {
        return this.activeCustomer;
    }

    setCustomer(customer : Customer) {
        this.customer = customer;
    }

    getCustomer() {
        return this.customer;
    }

    /* // Ajoute un compte des comptes sur le téléphone. La position 0 est le client actif
    addCustomerAccount(compte : Customer) {
        this.customerAccounts.push(compte);
        console.log("Le nom du client ajouté est " + this.customerAccounts[0].name);
    }

    // Supprimer un compte des comptes sur le téléphone
    removeCustomerAccount(compte : Customer) {
        let index = this.customerAccounts.indexOf(compte);
        this.customerAccounts.splice(index);
    }

    setActiveCustomer(client: Customer) {
        let actif = this.customerAccounts.indexOf(client);

        if (actif >= this.customerAccounts.length) {
            var t = t - this.customerAccounts.length + 1;
            while (t--) {
                t.push(undefined);
            }
        }
        this.customerAccounts.splice(actif, 0, this.customerAccounts.splice(this.customerAccounts.indexOf(this.customerAccounts[0]), 1)[0]);
        console.log("L'utilisateur en position 0 " + this.customerAccounts[0].name + ". L'utilisateur actif est " + this.customer.name)
    }

    getActiveCustomer(): Customer {
        return this.customerAccounts[0];
    }

    
    getCustomerAccounts(): Customer[] {
        return this.customerAccounts;
    }

    // cette fonction est reservé à la partie admin afin d'attribuer les comptes du back au front
    setCustomerAccounts( comptes : Customer[]) {
        this.customerAccounts = comptes;
    } */

}
