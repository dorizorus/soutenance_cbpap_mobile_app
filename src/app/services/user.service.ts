import {Injectable} from '@angular/core';
import {Customer} from '../models/Customer';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {F_COMPTET} from '../models/JSON/F_COMPTET';
import {F_DOCLIGNE} from "../models/JSON/F_DOCLIGNE";
import {F_ARTICLE} from "../models/JSON/F_ARTICLE";
import {F_ARTCLIENT} from "../models/JSON/F_ARTCLIENT";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer: Customer;
    activeCustomer: Customer;

    f_COMPTET: F_COMPTET;
    activeF_COMPTET: F_COMPTET;
    public activeF_COMPTET$: BehaviorSubject<F_COMPTET> = new BehaviorSubject<F_COMPTET>(null);
    f_COMPTETAccounts: F_COMPTET[] = [];
    public f_COMPTETAccounts$: BehaviorSubject<F_COMPTET[]> = new BehaviorSubject<F_COMPTET[]>([]);


    constructor(private http: HttpClient) {
    }
    // récupère le compte actif
    getActiveCustomer() {
        return this.activeF_COMPTET;
    }

    // on récupère un compte (utilisé dans del-acc)
    getCustomer() {
        return this.f_COMPTET;
    }

    private mockAccount() {
        const compte1 =
            {
                id: '1',
                name: 'test1',
                address: '5 rue des pizzaiolo',
                email: 'chezmoi@pizzasarl.com',
                password: 'test1',
                customerPicture: 'assets/icon/devanturePizzaHut.png',
                phoneNumber: '0387254981',
                city:
                    {
                        id: 55,
                        name: 'Metz',
                        postalCode: 57000
                    },
                customerFiles: ''
            };
        const compte2 =
            {
                id: '1',
                name: 'test2',
                address: '5 rue des pizzaiolo',
                email: 'chezmoi@pizzasarl.com',
                password: 'test2',
                customerPicture: 'assets/icon/devanturePizzaHut.png',
                phoneNumber: '0387254981',
                city:
                    {
                        id: 55,
                        name: 'Metz',
                        postalCode: 57000
                    },
                customerFiles: ''
            };
        const compte3 =
            {
                id: '1',
                name: 'test3',
                address: '5 rue des pizzaiolo',
                email: 'chezmoi@pizzasarl.com',
                password: 'test3',
                customerPicture: 'assets/icon/devanturePizzaHut.png',
                phoneNumber: '0387254981',
                city:
                    {
                        id: 55,
                        name: 'Metz',
                        postalCode: 57000
                    },
                customerFiles: ''
            };
        const compte4 =
            {
                id: '1',
                name: 'Pizza Chez Moi Sarl',
                address: '5 rue des pizzaiolo',
                email: 'chezmoi@pizzasarl.com',
                password: 'test3',
                customerPicture: 'assets/icon/devanturePizzaHut.png',
                phoneNumber: '0387254981',
                city:
                    {
                        id: 55,
                        name: 'Metz',
                        postalCode: 57000
                    },
                customerFiles: ''
            };
        return [compte1, compte2, compte3, compte4];
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
}
