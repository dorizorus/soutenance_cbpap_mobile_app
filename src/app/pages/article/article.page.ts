import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ModalController} from "@ionic/angular";
import {SingleArticlePage} from "../single-article/single-article.page";
import { Article } from 'src/app/models/Article';

@Component({
  selector: 'app-articles',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  nombreQuantite : number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

  listeArticles : Article[] = [{
    ref: 'AR578',
    libelle: 'Carton cache',
    prixUnitaire: 40.00,
    famille:'Carton',
    image : {
      id : 1,
      document : 'assets/icon/devanturePizzaHut.png'
    },
    description : {
    id : 2,
    contenu : "Un carton qui vous permet d'echapper à vos poursuivants, que ce soit un huissier ou un membre de votre famille qui réclame le prêt qu'il vous a attribué 10 ans auparavant. NE PAS APPROCHER DE LOUPS SAUVAGE, CETTE PROTECTION NE SUFFIRA PAS."
    }
  },
  {
    ref: '3EA45F',
    libelle: 'Carton mystere',
    prixUnitaire: 20.00,
    famille:'Carton',
    image : {
      id : 1,
      document : 'assets/icon/devanturePizzaHut.png'
    },
    description : {
    id : 2,
    contenu : "Un carton super grand"
    }
  },
  {
    ref: '98877RRF',
    libelle: 'Carton nature',
    prixUnitaire: 15.00,
    famille:'Carton',
    image : {
      id : 1,
      document : 'assets/icon/devanturePizzaHut.png'
    },
    description : {
    id : 2,
    contenu : "Un carton basique"
    }
  },
  {
    ref: 'AAA78ff',
    libelle: 'Carton rosé',
    prixUnitaire: 12.00,
    famille:'Carton',
    image : {
      id : 1,
      document : 'assets/icon/devanturePizzaHut.png'
    },
    description : {
    id : 2,
    contenu : "Un carton qui sent bon la rose"
    }
  }
];

  /*public tabArticles = [
    { name:'Machine à laver',
      description:'description blabla'
    },
    { name:'Télévision',
      description:'description blabla'
    },
    { name:'Ordinateur',
      description:'description blabla'
    } 
  ];*/


  constructor(private navParamsService:DataService,
              private modalController: ModalController){ }

  ngOnInit() {
  }

  async onLoadArticle(articleData) {
    this.navParamsService.setData(articleData);
    const modal = await this.modalController.create({
      component: SingleArticlePage,
      cssClass:'modal-article',
      backdropDismiss:true
    });
    return await modal.present();
  }

}
