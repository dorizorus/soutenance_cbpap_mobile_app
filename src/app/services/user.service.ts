import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {F_COMPTET} from '../models/JSON/F_COMPTET';
import {F_DOCLIGNE} from '../models/JSON/F_DOCLIGNE';
import {Storage} from '@ionic/storage';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer: F_COMPTET;
    activeCustomer: F_COMPTET;
    public activeCustomer$: BehaviorSubject<F_COMPTET> = new BehaviorSubject<F_COMPTET>(null);
    customerAccounts: F_COMPTET[] = [];
    public customerAccounts$: BehaviorSubject<F_COMPTET[]> = new BehaviorSubject<F_COMPTET[]>([]);

    constructor(private http: HttpClient, private dataStorage: Storage) {
    }


    // récupère le compte acti
    getActiveCustomer() {
        return this.activeCustomer;
    }


    // permet de définir quel est le compte actif puis l'envoie au subscribe
    setActiveCustomer(f_comptet: F_COMPTET) {
        this.activeCustomer = f_comptet;
        this.activeCustomer$.next(this.activeCustomer);
        localStorage.setItem('user', JSON.stringify(this.activeCustomer));
    }

    // ici on fait simplement transiter un compte (pas forcément actif, utilisé dans settings)
    setCustomer(f_comptet: F_COMPTET) {
        this.customer = f_comptet;
        this.activeCustomer$.next(this.customer);
    }

    // Ajoute un compte au tableau de comptes du téléphone. Le client actif est attribué à ce moment la
    addCustomer(f_COMPTET: F_COMPTET) {
        this.customerAccounts.push(f_COMPTET);
        this.customerAccounts$.next(this.customerAccounts);
        this.setActiveCustomer(f_COMPTET);
    }

    // permet de récupérer la liste de comptes
    getCustomerAccounts() {
        return this.customerAccounts;
    }

    getAllF_COMPTETs() {
        // todo remplacer par l'appel à l'api
        return this.http.get<F_COMPTET[]>('assets/F_COMPTET.json');
    }

    getDocLignes() {
        // todo remplacer par l'appel à l'api
        return this.http.get<F_DOCLIGNE[]>('assets/F_DOCLIGNE.json');
    }

    async getUserValidity(login: string, password: string) {
        let F_Comptet = null;
        console.log('user validity');
        return new Promise((resolve, reject) => {
            this.getAllF_COMPTETs().subscribe(
                (F_COMPTETs) => {
                    let found = false;
                    let index = 0;

                    console.log(index);
                    console.log(F_COMPTETs.length);
                    while (!found && index < F_COMPTETs.length) {
                        if (F_COMPTETs[index].CT_Num.toUpperCase() == login.toUpperCase() && password == F_COMPTETs[index].MDP) {
                            found = true;
                            F_Comptet = F_COMPTETs[index];
                        } else {
                            index++;
                        }
                    }
                    if (found) {
                        this.setActiveCustomer(F_Comptet);
                        this.addCustomer(F_Comptet);
                        resolve(F_Comptet);
                    } else {
                        reject('Mauvais identifiant/mot de passe');
                    }
                }
            );
        });
    }

    getHF_COMPTETAPI(login: string) {
        // todo remplacer par l'appel à l'api
        return this.http.get<F_COMPTET>(environment.baseAPI + 'HF_COMPTET/' + login);
    }

    async getUserValidityAPI(login: string, password: string) {
        let F_Comptet = null;
        console.log('user validity');
        return new Promise((resolve, reject) => {
            this.getHF_COMPTETAPI(login).subscribe(
                (F_COMPTET) => {

                    if (F_COMPTET.CT_Num.toUpperCase() == login.toUpperCase() && password == F_COMPTET.MDP) {
                        this.setActiveCustomer(F_Comptet);
                        this.addCustomer(F_Comptet);
                        resolve(F_Comptet);
                    } else {
                        reject('Mauvais identifiant/mot de passe');
                    }
                }
            );
        });
    }

    setUserStorage(user: F_COMPTET) {
        // systéme de clé / valeur
        this.dataStorage.set(user.CT_Num, user);
        this.getUserStorage(user.CT_Num);
    }

    getUserStorage(login: string) {
        // systéme de promesse
        this.dataStorage.get(login).then((data: F_COMPTET) => {
            let taille: number;
            this.dataStorage.length().then((val: number) => {
                taille = val;
            });
            console.log('La taille du storage est de' + taille);
            console.log('J\'ai mon user' + data.CT_Num + ' dans le storage');
            return data;
        });
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
    removeCustomer(customer: F_COMPTET) {
        if (this.activeCustomer === customer) {
            this.activeCustomer = null;
            this.activeCustomer$.next(customer);
        }
        const i = this.customerAccounts.indexOf(this.customer);
        this.customerAccounts.splice(i, 1);
        this.customerAccounts$.next(this.customerAccounts);
    }
}
