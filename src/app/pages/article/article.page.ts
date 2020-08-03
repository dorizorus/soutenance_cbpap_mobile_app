import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SingleArticlePage} from '../single-article/single-article.page';
import {Article} from 'src/app/models/Article';
import {OrderLine} from 'src/app/models/OrderLine';
import {UserService} from 'src/app/services/user.service';
import {CartService} from '../../services/cart.service';
import {ArticleService} from '../../services/article.service';
import {F_COMPTET} from '../../models/JSON/F_COMPTET';
import {ArticleAndFrequency} from '../../models/JSON/customs/ArticleAndFrequency';
import {F_ARTICLE} from '../../models/JSON/F_ARTICLE';

@Component({
    selector: 'app-articles',
    templateUrl: './article.page.html',
    styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

    possibleQuantities: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    articleList: Article[] = [];

    cart: OrderLine[] = [];
    orderLineList: OrderLine[] = [];
    orderLineBackup: OrderLine[] = [];
    activeF_COMPTET: F_COMPTET;

    articlesAndFrequency: ArticleAndFrequency[] = [];
    f_articleList: F_ARTICLE[] = [];
    arrayArRef: [string, number][];

    constructor(private modalController: ModalController,
                private cartService: CartService,
                private userService: UserService,
                private articleService: ArticleService) {
    }

    ngOnInit(): void {
        //this.initClient();
        this.initOrderLines(this.articleList);

        this.articleService.Articles$.subscribe(
            (list) => {
                this.f_articleList = list;
                //this.getF_ARTICLES();
            }
        );
        this.cartService.cart$.subscribe(data => {
            this.cart = data;
        });
        this.cartService.orderLineList$.subscribe(
            (liste) => this.orderLineList = liste
        );

        // à la création de la page on fait une copie de la liste.
        // cf. les m&éthodes "getOrderLines()" et "getArticleSearched(ev: any)
        this.orderLineBackup = this.orderLineList;

        this.userService.activeF_COMPTET$.subscribe(
            (F_COMPTET) => {
                this.activeF_COMPTET = F_COMPTET;
            }
        )
        this.activeF_COMPTET = this.userService.getActiveF_COMPTET();

        this.initializeTopF_ARTICLE();
    }

    // quand on clique sur l'article, on affiche la description
    async createArticleDetails(articleData: Article) {
        this.articleService.setArticle(articleData);
        const modal = await this.modalController.create({
            component: SingleArticlePage,
            cssClass: 'modal-article',
            backdropDismiss: true
        });
        return await modal.present();
    }

    initOrderLines(articleList: Article[]) {
        articleList.forEach(
            (article) => {
                const orderLine = {
                    orderNumber: null,
                    quantity: 0,
                    article
                };
                this.orderLineList.push(orderLine);
            }
        );
        this.cartService.setOrderLineList(this.orderLineList);
    }

    // retourne un backup d'orderLineList générée en initialisation de page.
    // l'intérêt est d'avoir une liste clean en backup qu'on envoit à la fonction filtre
    getOrderLines() {
        return this.orderLineBackup;
    }

    // méthode pour la searchbar de ionic.
    getArticleSearched(ev: any) {
        //
        // on réinitialise la liste d'article a affiché en refaisant appel à la liste originelle
        // this.initializeArticles();
        //
        // // set la valeur de l'input de la searchbar dans "val". On indique que c'est un input html
        // const val = (ev.target as HTMLInputElement).value;
        //
        // // si rien n'est mis on affiche tout, sinon on filtre avec ce qui a été inséré
        // if (val && val.trim() !== '') {
        //     this.articleList = this.articleList.filter((article) => {
        //         return (article.reference.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        //             article.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //     });
        // }

        // on réinitialise la liste d'article a affiché en refaisant appel à la liste originelle
        // this.initializeArticles();

        // *****************************************

        // ici on récupère notre backup qu'on pourra manipuler dans un objet différent.
        let orderLines = this.getOrderLines();
        // set la valeur de l'input de la searchbar dans "val". On indique que c'est un input html
        const val = (ev.target as HTMLInputElement).value;

        // si rien n'est mis on affiche tout, sinon on filtre avec ce qui a été inséré
        if (val && val.trim() !== '') {

            // on manipule et filtre l'objet
            orderLines = orderLines.filter((orderLine) => {
                return (orderLine.article.reference.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    orderLine.article.label.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }

        // on l'envoie à l'observable pour que la page se mette à jour
        // la raison pour laquelle la quantité ne revient pas à 0 est probablement dûe
        // au fait que le select est initialité à la création de la page
        // et modifié seulement si ionChange est appelé dans le template
        this.cartService.setOrderLineList(orderLines);
    }

    async createOrderLineDetails(orderLine: OrderLine) {
        this.cartService.setOrderLine(orderLine);
        const modal = await this.modalController.create({
            component: SingleArticlePage,
            cssClass: 'modal-article',
            backdropDismiss: true
        });
        return await modal.present();

    }

    onChangeOrderLine($event: any, orderLine: OrderLine) {
        const index = this.cart.indexOf(orderLine);
        orderLine.quantity = $event.target.value;
        // S'il n'y a pas de lignes, on ajoute directement. S'il y en a, on remplace la quantité de la line par la nouvelle.
        if (orderLine.quantity == 0) { // suppression
            if (this.cart.length !== 0) {
                if (index !== -1) {
                    this.cart.splice(index, 1);
                }
            }
        } else { // ajout ou modif
            if (index === -1) { // pas trouve donc on ajoute
                this.cart.push(orderLine);
            } else { // update
                this.cart[index] = orderLine;
            }
        }
        this.cartService.setCart(this.cart);
    }

    initializeTopF_ARTICLE() {
        let map = new Map<string, number>();
        this.arrayArRef = [];
        this.userService.getDocLignes().subscribe(
            (F_DOCLIGNES) => {
                F_DOCLIGNES.forEach(
                    (DOCLIGNE) => {
                        if (DOCLIGNE.CT_Num == this.activeF_COMPTET.CT_Num) {
                            if (DOCLIGNE.AR_Ref == '') {
                            } else {
                                DOCLIGNE.AR_Ref = DOCLIGNE.AR_Ref.trim();
                                if (map.get(DOCLIGNE.AR_Ref) != undefined) {
                                    map.set(DOCLIGNE.AR_Ref, map.get(DOCLIGNE.AR_Ref) + 1);
                                } else {
                                    map.set(DOCLIGNE.AR_Ref, 1);
                                }
                                this.arrayArRef = Array.from(map.entries());
                            }
                        }
                    }
                );
                console.log("avant " + this.arrayArRef.length);
                // on transforme le tableau de tableau en objet ArticleAndFrequency
                this.arrayArRef.forEach(data => this.articlesAndFrequency.push({AR_Ref: data[0], frequency: data[1]}));
                console.log("après " + this.arrayArRef.length);
                // puis on le trie et ne garde que les 15 articles les plus commandés
                this.articlesAndFrequency.sort((a, b) => (b.frequency - a.frequency));
                this.articlesAndFrequency.splice(15, this.articlesAndFrequency.length - 15);

                this.arrayArRef = [];
                for (let articleFreq of this.articlesAndFrequency) {
                    this.arrayArRef.push([articleFreq.AR_Ref, articleFreq.frequency]);
                }
                this.initializeArticles();
            }
        );
    }

    // recupere le top article à partir des articles
    private initializeArticles() {
        console.log(new Date());
        let tabArticle: F_ARTICLE[] = [];
        console.log("TABLEAU DES REF : ");
        for (let article of this.arrayArRef) {
            console.log(article[0]);
        }
        console.log(this.arrayArRef[10][0]);
        this.userService.getArticles().subscribe(
            (F_ARTICLE) => {
                let i = 0;
                while (i < F_ARTICLE.length && this.arrayArRef.length != 0) {
                    let found = false;
                    let j = 0;
                    while (!found && j < this.arrayArRef.length) {
                        if (F_ARTICLE[j].AR_Ref == this.arrayArRef[j][0]) {
                            found = true;
                            tabArticle.push(tabArticle[j]);
                        } else {
                            j++;
                        }
                    }
                    i++;
                }
            });
    }
}