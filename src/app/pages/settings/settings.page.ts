import {Component, OnInit} from '@angular/core';
import {NavController, AlertController} from '@ionic/angular';

import {Customer} from 'src/app/models/Customer';
import {UserService} from 'src/app/services/user.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    constructor(private navCtrl: NavController,
                private alertCtrl: AlertController,
                private userService: UserService) {
    }

    customer : Customer;

    ngOnInit() {
        this.customer = this.userService.getActiveCustomer();
    }

    // Avance vers la page suppression de manière directe, comme une redirection
    async goToDeleteAccount() {
        this.navCtrl.navigateForward(['/acc-choice/settings/delete-acc']);
    }

    // Fait apparaitre une alerte pour la confirmation. Le handler permet de faire des actions
    // via la fonction flechée

    async alertConfirm() {
        const alert = await this.alertCtrl.create({
            header: 'Suppression d\'un compte',
            // cssClass: 'maClasseCss'
            message: 'Êtes-vous certain de vouloir supprimer ce compte de cet appareil?',
            buttons: [
                {
                    text: 'Je refuse',
                    // cssClass: 'secondary',
                    role: 'cancel',
                    handler: () => {
                        console.log('Annulation de la suppression');
                    }
                }, {
                    text: 'J\'accepte',
                    handler: () => {
                        this.goToDeleteAccount();
                    }
                }
            ]
        });
        await alert.present();
    }
}
