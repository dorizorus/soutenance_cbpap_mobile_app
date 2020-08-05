import {Injectable} from '@angular/core';
import {Customer} from '../models/Customer';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {F_COMPTET} from '../models/JSON/F_COMPTET';
import {F_DOCLIGNE} from '../models/JSON/F_DOCLIGNE';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer: Customer;
    userWeb : UserWeb;
    usersWebPool : UserWeb[] = [];
    activeCustomer: Customer;

    f_COMPTET: F_COMPTET;
    activeF_COMPTET: F_COMPTET;
    public activeF_COMPTET$: BehaviorSubject<F_COMPTET> = new BehaviorSubject<F_COMPTET>(null);
    f_COMPTETAccounts: F_COMPTET[] = [];
    public f_COMPTETAccounts$: BehaviorSubject<F_COMPTET[]> = new BehaviorSubject<F_COMPTET[]>([]);


    constructor(private http: HttpClient) {
    }
    
    // Observable qui recupère un json du pool d'utilisateurs web. Mais vu
    // qu'il y en a qu'un ... Dur d'être dynamique x)
    // TODO remplacer adrano par .. rien afin d'avoir les utilisateurs web
    readonly usersObservable = new Observable ((observer) => {
        this.httpClient.
        get(environment.baseUrl + '/HF_COMPTET/' + 'ADRANO').
        subscribe(
            (user : UserWeb) => {
                console.log("Début du sub, le num du perso 0 est ")
                this.usersWebPool.push(user);
                observer.next(user);
                console.log(this.usersWebPool[0].CT_Num)

    // récupère le compte actif
    getActiveCustomer() {
        return this.activeF_COMPTET;
    }

    // on récupère un compte (utilisé dans del-acc)
    getCustomer() {
        return this.f_COMPTET;
    }


    // Ajoute un compte au tableau de comptes du téléphone. Le client actif est attribué à ce moment la
    addF_COMPTET(f_COMPTET: F_COMPTET) {
        this.f_COMPTETAccounts.push(f_COMPTET);
        this.f_COMPTETAccounts$.next(this.f_COMPTETAccounts);
        this.setActiveF_COMPTET(f_COMPTET);
    }

    // Supprimer un compte des comptes sur le téléphone.
    // On cherche l'index dans le tableau et on le supprime, ensuite on met à jour les subscribes
    removeF_COMPTET(f_COMPTET: F_COMPTET) {
        if (this.activeF_COMPTET === f_COMPTET) {
            this.activeF_COMPTET = null;
            this.activeF_COMPTET$.next(f_COMPTET);
        }
        const i = this.f_COMPTETAccounts.indexOf(this.f_COMPTET);
        this.f_COMPTETAccounts.splice(i, 1);
        this.f_COMPTETAccounts$.next(this.f_COMPTETAccounts);
    }

    // permet de récupérer la liste de comptes
    getF_COMPTETAccounts() {
        return this.f_COMPTETAccounts;
    }

    // permet de définir quel est le compte actif puis l'envoie au subscribe
    setActiveF_COMPTET(f_comptet: F_COMPTET) {
        this.activeF_COMPTET = f_comptet;
        this.activeF_COMPTET$.next(this.f_COMPTET);
        localStorage.setItem('user', JSON.stringify(this.activeF_COMPTET));
    }

    // récupère le compte actif
    getActiveF_COMPTET() {
        return this.activeF_COMPTET;
    }

    // ici on fait simplement transiter un compte (pas forcément actif, utilisé dans settings)
    setF_COMPTET(f_comptet: F_COMPTET) {
        this.f_COMPTET = f_comptet;
        this.activeF_COMPTET$.next(this.f_COMPTET);
    }

    // on récupère un compte (utilisé dans del-acc)
    getF_COMPTET() {
        return this.f_COMPTET;
    }

    getAllF_COMPTETs() {
        // todo remplacer par l'appel à l'api
        return this.http.get<F_COMPTET[]>('assets/F_COMPTET.json');
    }

    getDocLignes() {
        return this.http.get<F_DOCLIGNE[]>('assets/F_DOCLIGNE.json');
    }

    async getUserValidity(login: string, password: string){
        let F_Comptet = null;
        console.log("user validity");
        return new Promise((resolve,reject) => {
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
                        this.setActiveF_COMPTET(F_Comptet);
                        this.addF_COMPTET(F_Comptet);
                        resolve(F_Comptet);
                    } else {
                        reject('Mauvais identifiant/mot de passe');
                    }
                }
            );
        });
    }

    // A ne pas supprimer, utile avec l'arrivée du reste du webservice
    getUserByRef(login : string) : Observable<UserWeb> {
        return this.httpClient.get<UserWeb>(environment.baseUrl + '/HF_COMPTET/' + login);
    }

    setUserStorage(user : Customer) {
        // systéme de clé / valeur
        this.dataStorage.set(user.name, user);
        this.getUserStorage(user.name)
    }

    getUserStorage(login : string) {
        // systéme de promesse
        this.dataStorage.get(login).then((data : Customer) => {
            let taille : number;
            this.dataStorage.length().then((val : number) => {
                taille = val;
            })
            console.log("La taille du storage est de" + taille);
            console.log("J'ai mon user" + data.city + " dans le storage");
            return data;
        })
    }
}
