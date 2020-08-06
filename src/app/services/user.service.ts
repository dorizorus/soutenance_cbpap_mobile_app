import {Injectable} from '@angular/core';
import {Customer} from '../models/Customer';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserWeb } from '../models/UserWeb';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer: Customer;
    userWeb : UserWeb;
    usersWebPool : UserWeb[] = [];
    activeCustomer: Customer;
    login : string = '';
    customerAccounts: Customer[] = [];
    public customerAccounts$: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
    public activeCustomer$: BehaviorSubject<Customer> = new BehaviorSubject<Customer>(null);
    public adresseAdrano : string = 'http://80.14.6.243:8080/HF_COMPTET/ADRANO';
    hfComptetUrl : string = '/HF_COMPTET/';
    
    constructor(private httpClient : HttpClient,
                private dataStorage : Storage) {
    }
    
    // Observable qui recupère un json du pool d'utilisateurs web. Mais vu
    // qu'il y en a qu'un ... Dur d'être dynamique x)
    // TODO remplacer adrano par .. rien afin d'avoir les utilisateurs web
    readonly usersObservable = new Observable ((observer) => {
        this.httpClient.get(environment.baseUrl + this.hfComptetUrl + 'ADRANO').subscribe(
            (user : UserWeb) => {
                console.log("Début du sub, le num du perso 0 est ")
                this.usersWebPool.push(user);
                observer.next(user);
                console.log(this.usersWebPool[0].CT_Num)

            // Quand on aura un tableau, remplacer le code par ça
            /* (users : UserWeb[]) => {
               this.usersWebPool = users
               observer.next(users);
            */
            }
        )
    } )
    


    // Ajoute un compte au tableau de comptes du téléphone. Le client actif est attribué à ce moment la
    addCustomer(customer: Customer) {
        this.customerAccounts.push(customer);
        this.customerAccounts$.next(this.customerAccounts);
        this.setActiveCustomer(customer);
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

    // permet de récupérer la liste de comptes
    getAccounts() {
        return this.customerAccounts;
    }

    // permet de définir quel est le compte actif puis l'envoie au subscribe
    setActiveCustomer(customer: Customer) {
        this.activeCustomer = customer;
        this.activeCustomer$.next(this.activeCustomer);
        localStorage.setItem('user', JSON.stringify(this.activeCustomer))
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

    getAllAccounts(): Customer[] {
        // todo recup tous les comptes existants peut-être un localstorage avant de faire la requête
        return this.mockAccount();
    }

    // cherche dans la liste des comptes & verifie login / password corrects
    getUserValidity(login:string,password:string){
        let accountsList = this.getAllAccounts();
        let index = 0;
        let found = false;
        while(index < accountsList.length && !found){
            if(accountsList[index].name == login && accountsList[index].password == password)
                found = true
            else
                index++
        }
        if(index == accountsList.length) // pas trouve
            return false;
        else {
            this.setActiveCustomer(accountsList[index]);
            return accountsList[index];
        }
    }

    // Compare si les logins sont bons et si c'est le cas, renvoie l'utilisateur
    // On pourrait mettre un booléen mais ça permet de directement récup l'objet comme ça
    getUserWebValidity(login : string, password : string) : UserWeb {
        let i = 0;
        let found = false;

        while (!found && i < this.usersWebPool.length) {
        if (this.usersWebPool[i].CT_Num == login && this.usersWebPool[i].MDP == password) {
            console.log("trouvé");
            found = true;
            return this.usersWebPool[i];
            } else {
                i++;
            }
            console.log("Pas trouvé :(");
            return null;
        }
    }

    // plus utile ?
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
