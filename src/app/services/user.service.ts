import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Storage} from "@ionic/storage";
import {Customer} from "../models/Customer";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer: Customer;
    sizeStorage: number;
    activeCustomer: Customer;
    public activeCustomer$: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);
    customerAccounts: Customer[] = [];
    public customerAccounts$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

    constructor(private http: HttpClient, private dataStorage: Storage) {
    }


    // récupère le compte actif
    getActiveCustomer() {
        return this.activeCustomer;
    }


    // permet de définir quel est le compte actif puis l'envoie au subscribe
    setActiveCustomer(customer : Customer) {
        this.activeCustomer = customer;
        this.activeCustomer$.next(this.activeCustomer);
        this.dataStorage.set(customer.id, this.activeCustomer);
    }


    // ici on fait simplement transiter un compte (pas forcément actif, utilisé dans settings)
    setCustomer(customer: Customer) {
        this.customer = customer;
        this.activeCustomer$.next(this.customer);
    }


    // Ajoute un compte au tableau de comptes du téléphone. Le client actif est attribué à ce moment la
    addCustomer(customer: Customer) {
        this.customerAccounts.push(customer);
        this.customerAccounts$.next(this.customerAccounts);
        this.setActiveCustomer(customer);
    }

    // permet de récupérer la liste de comptes
    getCustomerAccounts() {
        return this.customerAccounts;
    }


    async getUserValidity(login: string, password: string) {
        let customer : Customer = null;
        console.log("user validity");
        return new Promise((resolve, reject) => {
            this.http.post(environment.baseURL + 'customers/authentification', {id: login, password}, {responseType: 'text'}).subscribe(
                (token) => {
                   this.dataStorage.set(login + 'token',token);

                    console.log('mon token', token);
                    this.http.get<Customer>(environment.customer + '/' + login).subscribe( (responseCustomer) =>
                    {
                        customer = responseCustomer;
                        this.setActiveCustomer(customer);
                        this.addCustomer(customer);
                        this.setUserStorage(customer);
                        this.getStorageLength();
                        resolve(Customer);
                    });
                },
                error => {
                    reject('Mauvais identifiant/mot de passe');
                }

            );
        });
    }

    setUserStorage(customer: Customer) {
        // On attend que le storage prêt
        this.dataStorage.ready().then(() => {
            // systéme de clé / valeur
            this.dataStorage.set(customer.id, customer);
            this.getUserStorage(customer.id);
        });

    }

    getUserStorage(login: string) {
        this.dataStorage.ready().then(() => {
            // systéme de promesse
            this.dataStorage.get(login).then((data: Customer) => {
                console.log("J'ai mon user " + data.id + " dans le storage");
                console.log(this.getStorageLength());
                return data;
            });
        });
    }

    setAllUsersStorage() {
        this.customerAccounts = [];
        this.dataStorage.ready().then(() => {
            this.dataStorage.forEach((valeur: Customer) => {
                this.customerAccounts.push(valeur);
                console.log("3 " + valeur.id + " ajouté a customerAccounts");
            });
        })
    }

    getStorageLength() {
        this.dataStorage.length().then((total) => {
            setTimeout(() => {
                return total;
            }, 100)
        });
        /*
        return this.dataStorage.ready().then(() => {
            this.sizeStorage = 0;
            // this.dataStorage.clear().then(() => {
                this.dataStorage.length().then((val : number) => {
                    this.sizeStorage = val;
                    console.log(" 2 Size storage vaut " + this.sizeStorage);
                });
            // });
            });
         */
    }

    /**
     * méthodes pour le del-acc
     */

    // on récupère un compte (utilisé dans del-acc)
    getCustomer() {
        return this.customer;
    }

    // Supprimer un compte des comptes sur le téléphone.
    // On cherche l'index dans le tableau et on le supprime, ensuite on met à jour les subscribes
    removeCustomer(customer: Customer) {
        if (this.activeCustomer === customer) {
            this.activeCustomer = null;
            this.activeCustomer$.next(customer);
        }
        const i = this.customerAccounts.indexOf(this.customer);
        this.customerAccounts.splice(i, 1);
        this.customerAccounts$.next(this.customerAccounts);
    }
}
