import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-produit',
  templateUrl: './single-produit.page.html',
  styleUrls: ['./single-produit.page.scss'],
})
export class SingleProduitPage implements OnInit {
  private produit;

  constructor(private dataNav: DataService,
              private modalController:ModalController,
              private router: Router) {
    this.produit = dataNav.getData();
  }

  ngOnInit() {
    // pour eviter d'entrer par l'url - pas forcement utile
    this.modalController.dismiss(this).catch((error) => this.router.navigateByUrl('/tabs/produits'));
  }
}
