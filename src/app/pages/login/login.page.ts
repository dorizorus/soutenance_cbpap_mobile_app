import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ContactPageModule} from '../contact/contact.module';
import {UserService} from 'src/app/services/user.service';
import {Router, NavigationEnd} from "@angular/router";
import { UserWeb } from 'src/app/models/UserWeb';
import { Customer } from 'src/app/models/Customer';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    // todo : comparer les données envoyé en front avec le back, ensuite récupérer un token avec les infos pour qu'on puisse afficher
    // les infos dans certaines parties de l'application (genre la partie compte). Actuellement dans l'application, on utilise un service
    // pour transférer les données d'un client sur les différentes page.

    login:string;
    password:string;
    error: string;
    userWeb : UserWeb;
    usersWeb : UserWeb[] = [];

    constructor(private navCtrl: NavController,
                private modalController: ModalController,
                private userService: UserService,
                private router:Router) {
                    // on subscribe a l'evenement lié au routeur, a chaque changement d'url, on lance
                    // la méthode. Si l'url est similaire a la page de login et si c'est vide, redirige vers la liste
                    this.router.events.subscribe((e) => {
                        if (e instanceof NavigationEnd) {
                            if (e.url == '/login' && this.userService.getAccounts().length > 0)
                                this.router.navigateByUrl('/nav/article');
                        }
                    });


    }


    ngOnInit() {
        if(this.userService.getAccounts().length == 1)
            this.router.navigateByUrl('/nav/article');
        else if(this.userService.getAccounts().length > 1)
            this.router.navigateByUrl('/acc-choice');

        this.getUsersWeb();
    }
    
    // On subscribe à l'url et on récupère les comptes éligible a l'application
    // C'est vraiment moche de récupérer le mdp et l'id comme ça n'empêche
    // Il y a un soucis quand je manipule un tableau donc je simule un tableau via un push
    async getUsersWeb() {
        this.userService.usersObservable.subscribe(
           (user : UserWeb) => {
               this.usersWeb = [];
               this.usersWeb.push(user);
               this.userWeb = user;
               console.log("Get effectué de " + this.userWeb.CT_Num + " et mdp " + this.userWeb.MDP);
               // Quand on aura le tableau, remplacer par
               // (users : UserWeb[]) => {
               // this.usersWeb = users;
           } 
        )
    }
    

    async initClient() {
        // on créer le compte
        const compte =
            {
                id: '1',
                name: 'Pizza Chez Moi Sarl',
                address: '5 rue des pizzaiolo',
                email: 'chezmoi@pizzasarl.com',
                password: 'test',
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
        
        // on ne va pas utiliser de set mais un systeme d'ajout/suppresion de compte. Ici, il est ajouté
        this.userService.addCustomer(compte);
    }

    // Pour pas a devoir refactor le customer, je vais prendre les paramètres de l'userweb et les mettre dans un customer
    initUserWebToCustomer(user : UserWeb) : Customer {
        let  customerWeb : Customer =
            {
                id: user.CT_Num,
                name: user.CT_Intitule,
                address: user.CT_Adresse,
                email: null,
                password: user.MDP,
                customerPicture: 'assets/icon/devanturePizzaHut.png',
                phoneNumber: null,
                city:
                    {
                        id: 55,
                        name: user.CT_Ville,
                        postalCode: 57525
                    },
                customerFiles: null

            };
        return customerWeb;
    }

    // permet d'ajouter le client et d'aller aux articles. Async obligatoire sous peine d'erreur
    async addCustomerAndGoToArticle() {
        this.initClient();
        this.navCtrl.navigateForward(['/nav/article']);
    }

    async goToAdministration() {
        this.navCtrl.navigateForward(['administration']);
    }

    // censé faire apparaitre la modal mais ne marche pas non plus. La modal est créer dans tabs.ts
    async createContact() {
        const modal = await this.modalController.create({
            component: ContactPageModule,
            cssClass: 'modal-pop',
            backdropDismiss: true
        });
        return await modal.present();
    }

    /* Utile plus tard, ne pas supprimer
    getUserData() {
        this.userService.getUserByRef(this.login).subscribe(user => {

        })
    } */

    // Ce n'est pas un booléen qui est checké mais un objet.
    async logIn() {
        let i = 0;
        let found = false;
        let res : UserWeb = null;

        while (!found && i < this.usersWeb.length) {
            if (this.usersWeb[i].CT_Num == this.login) {
                found = true;
                res = this.userService.getUserWebValidity(this.login,this.password);
            }
            else {
                i++;
                res = null;
            }
        }

        if(res) {
            console.log("Concorde avec les logins et mdp");
            let user = this.initUserWebToCustomer(res);
            this.userService.setActiveCustomer(user);
            this.userService.addCustomer(user);
            this.userService.setUserStorage(user);
            this.router.navigateByUrl('/nav/article');
        } else{
            this.error = "Mauvais identifiant/mot de passe";
        }
    }
}
