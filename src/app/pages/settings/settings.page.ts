import { Component, OnInit } from '@angular/core';
import {NavController, AlertController} from "@ionic/angular";

import { Ville } from 'src/app/models/Ville';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private navCtrl : NavController,
              private alertCtrl : AlertController ) { }

  client : Client =
    {
      id : 2,
      nom: "Pizza Chez Moi Sarl",
      adresse: "5 rue des pizzaiolo",
      email : "chezmoi@pizzasarl.com",
      mdp : "458dsqfdkdsqlfkqsd54",
      image : "assets/icon/devanturePizzaHut.png",
      numeroTel : "0387254981",
      ville  :
      {
        id : 55,
        nomVille : "Metz",
        codePostal : 57000
      }

    };

  ngOnInit() {

  }
  // Avance vers la page suppression de manière directe, comme une redirection
  async versSuppression() {
    this.navCtrl.navigateForward('/settings/delete-acc');
}
  // Fait apparaitre une alerte pour la confirmation. Le handler permet de faire des actions
  // via la fonction flechée
  
  async alertConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Suppression d'un compte",
      //cssClass: 'maClasseCss'
      message: 'Êtes-vous certain de vouloir supprimer ce compte de cet appareil?',
      buttons: [
        {
          text: 'Je refuse',
          //cssClass: 'secondary',
          role: 'cancel',
          handler: () => {
            console.log('Annulation de la suppression');
          }
        }, {
          text: "J'accepte",
          handler: () => {
            this.versSuppression();
          }
        }
      ]
    });
    await alert.present();
    }
}
