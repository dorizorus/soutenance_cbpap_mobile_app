import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {SingleArticlePage} from "../single-article/single-article.page";

@Component({
  selector: 'app-articles',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  public tabArticles = [
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

  async onLoadArticle(articleData) {
    this.navParamsService.setData(articleData);
    const modal = await this.modalController.create({
      component: SingleArticlePage,
      cssClass:'modal-single-article',
      backdropDismiss:true
    });
    return await modal.present();
  }

  goSettings() {
    console.log('clicked')
  }
}
