import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Article} from "../../models/Article";
import { OrderService } from 'src/app/services/order.service';
import {ArticleService} from "../../services/article.service";

@Component({
    selector: 'app-single-article',
    templateUrl: './single-article.page.html',
    styleUrls: ['./single-article.page.scss'],
})
export class SingleArticlePage implements OnInit {
    article : Article;
    possibleQuantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    isEmpty : boolean;

    constructor(private articleNav : ArticleService,
                private modalController: ModalController,
                private router: Router) 
    {
    // TO DO En fait il faut pas passer un article mais une orderline avec la quantité
        this.article = articleNav.getArticle();
    }

    ngOnInit() {
        // pour eviter d'entrer par l'url - pas forcement utile
        this.modalController.dismiss(this).catch((error) => this.router.navigateByUrl('/nav'));
    }

    dismissModal() {
        this.modalController.dismiss(this);
    }

    // todo
    onReset() {
        
    }
}
