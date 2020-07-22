import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {ContactPageModule} from "../contact/contact.module";
import { Client } from 'src/app/models/Client';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  client : Client;

  // to do : comparer les données envoyé en front avec le back, ensuite récupérer un token avec les infos pour qu'on puisse afficher
  // les infos dans certaines parties de l'application (genre la partie compte). Actuellement dans l'application, on utilise un service 
  // pour transférer les données d'un client sur les différentes page.

  constructor(private navCtrl : NavController,
              private modalController : ModalController,
              private userService : UserService) { }

  

  ngOnInit(){
    this.initClient();
  }


  initClient(){
    let clientFactice = new Client();
    clientFactice =
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
    this.userService.setClient(clientFactice);
  }

  // permet d'amener vers la route x
  async navTabs() {
    this.navCtrl.navigateForward(['/nav/article']); 
  }

  // censé faire apparaitre la modal mais ne marche pas non plus. La modal est créer dans tabs.ts
  async onContactPop() {
    const modal = await this.modalController.create({
      component: ContactPageModule,
      cssClass:'modal-pop',
      backdropDismiss:true
    });
    return await modal.present();
  }

}
