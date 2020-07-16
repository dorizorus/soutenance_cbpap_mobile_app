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
  private article;

  constructor(private dataNav: DataService,
              private modalController:ModalController,
              private router: Router) {
    this.article = dataNav.getData();
  }

  ngOnInit() {
    // pour eviter d'entrer par l'url - pas forcement utile
    this.modalController.dismiss(this).catch((error) => this.router.navigateByUrl('/tabs/article'));
  }
}
