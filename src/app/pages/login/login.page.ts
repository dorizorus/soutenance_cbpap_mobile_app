import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ContactPageModule} from '../contact/contact.module';
import {UserService} from 'src/app/services/user.service';
import {Router} from "@angular/router";

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

    constructor(private navCtrl: NavController,
                private modalController: ModalController,
                private userService: UserService,
                private router:Router) {
    }


    ngOnInit() {
        if(this.userService.getAccounts().length == 1)
            this.router.navigateByUrl('/nav/article')
        else if(this.userService.getAccounts().length > 1)
            this.router.navigateByUrl('/acc-choice')
        this.initClient();
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

    // permet d'ajouter le client et d'aller aux articles. Async obligatoire sous peine d'erreur
    async addCustomerAndgoToArticle() {
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

    logIn() {
        let accountsList = this.userService.getAllAccounts();
        let index = 0;
        let found = false;
        while(index < accountsList.length && !found){
            if(accountsList[index].name == this.login && accountsList[index].password == this.password)
                found = true
            else
                index++
        }
        if(index == accountsList.length) // pas trouve
            this.error = 'Mauvais mot de passe / identifiant'
        else {
            this.userService.setActiveCustomer(accountsList[index]);
            this.router.navigateByUrl('/nav/article');
        }
    }
}
