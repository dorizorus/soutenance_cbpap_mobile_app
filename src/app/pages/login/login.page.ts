import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ContactPageModule} from '../contact/contact.module';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';
import {F_COMPTET} from '../../models/JSON/F_COMPTET';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    // todo : comparer les données envoyé en front avec le back, ensuite récupérer un token avec les infos pour qu'on puisse afficher
    // les infos dans certaines parties de l'application (genre la partie compte). Actuellement dans l'application, on utilise un service
    // pour transférer les données d'un client sur les différentes page.

    login: string;
    password: string;
    error: string;

    constructor(private navCtrl: NavController,
                private modalController: ModalController,
                private userService: UserService,
                private router: Router) {
    }


    ngOnInit() {
        if (this.userService.getAccounts().length == 1) {
            this.router.navigateByUrl('/nav/article');
        }
        else if (this.userService.getAccounts().length > 1) {
            this.router.navigateByUrl('/acc-choice');
 }
    }

    async initClient() {
        // on créer le compte
        const compte : F_COMPTET =
            {
                CT_Num: 'SORAPIZZA',
                CT_Intitule: 'SORA PIZZA',
                CT_Adresse: '109 AVENUE DE LA REPUBLIQUE',
                CT_CodePostal: 'F-54310',
                CT_Ville: 'HOMECOURT',
                CT_Pays: 'France',
                CT_Sommeil: 1,
                CT_Telephone: '03 82 33 84 68',
                CT_EMail: ''
            };
        // on ne va pas utiliser de set mais un systeme d'ajout/suppresion de compte. Ici, il est ajouté
        this.userService.addF_COMPTET(compte);
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

    // todo deplacer dans le service pour pouvoir reutiliser dans delete-acc
    logInF_COMPTET() {
        let F_Comptet: F_COMPTET = null;
        this.userService.getF_COMPTETValidity().subscribe(
            (F_COMPTETs) => {
                let found = false;
                let index = 0;

                while (!found && index < F_COMPTETs.length) {
                    if (F_COMPTETs[index].CT_Num.toUpperCase() == this.login.toUpperCase()) {
                        found = true;
                        F_Comptet = F_COMPTETs[index];
                    }
                    else {
                        index++;
                    }
                }
                if (found) {
                    this.userService.setActiveF_COMPTET(F_Comptet);
                    this.userService.addF_COMPTET(F_Comptet);
                    this.navCtrl.navigateForward(['/nav/article']);
                } else {
                    this.error = 'Mauvais identifiant/mot de passe';
                }
            }
        );
    }

    // plus utilise dans cette version
    logIn() {
        const res = this.userService.getUserValidity(this.login, this.password);
        console.log(res);
        if (res == false) {
            this.error = 'Mauvais identifiant/mot de passe';
        }
        else {
            this.userService.setActiveCustomer(res);
            this.userService.addCustomer(res);

            this.router.navigateByUrl('/nav/article');
        }
    }
}
