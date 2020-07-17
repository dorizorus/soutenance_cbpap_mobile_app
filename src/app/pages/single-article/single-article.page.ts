import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.page.html',
  styleUrls: ['./single-article.page.scss'],
})
export class SingleArticlePage implements OnInit {
  public article;
  nombreQuantite : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  quantite : 2;


  constructor(private dataNav: DataService,
              private modalController:ModalController,
              private router: Router) {
    this.article = dataNav.getData();
  }

  ngOnInit() {
    // pour eviter d'entrer par l'url - pas forcement utile
    this.modalController.dismiss(this).catch((error) => this.router.navigateByUrl('/nav'));
  }

  dismissModal() {
    this.modalController.dismiss(this);
  }

  
}
