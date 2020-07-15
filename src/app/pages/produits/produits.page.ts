import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {SingleProduitPage} from "../single-produit/single-produit.page";

@Component({
  selector: 'app-produits',
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss'],
})
export class ProduitsPage implements OnInit {

  public tabProduits = [
    { name:'Machine à laver',
      description:'description blabla'
    },
    { name:'Télévision',
      description:'description blabla'
    },
    { name:'Ordinateur',
      description:'description blabla'
    }
  ];
  constructor(private navParamsService:DataService,
              private router: Router,
              private modalController: ModalController){ }

  ngOnInit() {
  }

  async onLoadProduit(produitData) {
    this.navParamsService.setData(produitData);
    const modal = await this.modalController.create({
      component: SingleProduitPage,
      cssClass:'modal-single-produit',
      backdropDismiss:true
    });
    return await modal.present();
  }

  goSettings() {
    console.log('clicked')
  }
}
