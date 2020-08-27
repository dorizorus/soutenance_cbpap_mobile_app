import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from "@ionic/storage";
import {Customer} from "../models/Customer";
import {environment} from "../../environments/environment";

import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    private customer: Customer;
    private token: string;
    private sizeStorage: number;
    private activeCustomer: Customer;
    public activeCustomer$: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);
    private customerAccounts: Customer[] = [];
    public customerAccounts$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
    public jwtHelper = new JwtHelperService();


    constructor(private http: HttpClient, private dataStorage: Storage) {

    }


    // récupère le compte actif
    getActiveCustomer() {
        return this.activeCustomer;
    }


    // permet de définir quel est le compte actif puis l'envoie au subscribe
    setActiveCustomer(customer: Customer) {
        this.dataStorage.get(customer.id + 'token').then(token => this.token = token);
        this.dataStorage.get(customer.id).then(customer => {
            this.activeCustomer = customer;
            this.activeCustomer$.next(this.activeCustomer);
        });
    }


    // ici on fait simplement transiter un compte (pas forcément actif, utilisé dans settings)
    setCustomer(customer: Customer) {
        this.customer = customer;
        this.activeCustomer$.next(this.customer);
        console.log(this.customer);
    }


    // Ajoute un compte au tableau de comptes du téléphone. Le client actif est attribué à ce moment la
    addCustomer(customer: Customer) {
        this.dataStorage.set(customer.id, customer);
        this.customerAccounts.push(customer);
        this.customerAccounts$.next(this.customerAccounts);
        this.setActiveCustomer(customer);
    }

    // permet de récupérer la liste de comptes
    getCustomerAccounts() {
        return this.customerAccounts;
    }


    async getUserValidity(id: string, password: string) {
        return new Promise((resolve, reject) => {
            this.http.post(environment.baseURL + 'customers/authentification',
                {id, password},
                {responseType: 'text'}).subscribe(
                (token) => {
                    this.token = token;
                    this.dataStorage.set(id + 'token', token);
                    this.http.get<Customer>(environment.customer + '/' + id)
                        .subscribe(responseCustomer => {
                            this.addCustomer(responseCustomer);
                            this.setActiveCustomer(responseCustomer);
                            this.setUserStorage(responseCustomer);
                            resolve(responseCustomer);
                            console.log('customer authentifié : ', responseCustomer);
                        });
                },
                error => {
                    reject('Mauvais identifiant ou mot de passe');
                }
            );
        });
    }

    getToken() {
        return this.token;
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
                return data;
            });
        });
    }

    setAllUsersStorage() {
        this.customerAccounts = [];
        this.dataStorage.ready().then(() => {
            this.dataStorage.forEach((valeur: Customer) => {
                this.customerAccounts.push(valeur);
            });
        })
    }

    getStorageLength() {
        this.dataStorage.length().then((total) => {
            setTimeout(() => {
                this.sizeStorage = total;
            }, 100)
        });
    }

    getSizeStorage() {
        return this.sizeStorage;
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

    isTokenExpired(){
        if(this.getToken()!=null){
            return this.jwtHelper.isTokenExpired(this.getToken())?true:false;
        } else {
            return true;
        }
    }


}
