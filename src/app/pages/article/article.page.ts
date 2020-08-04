import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SingleArticlePage} from '../single-article/single-article.page';
import {Article} from 'src/app/models/Article';
import {OrderLine} from 'src/app/models/OrderLine';
import {UserService} from 'src/app/services/user.service';
import {CartService} from '../../services/cart.service';
import {ArticleService} from '../../services/article.service';
import {F_ARTICLE} from '../../models/JSON/F_ARTICLE';
import {ArticleLabelRef} from '../../models/JSON/custom/ArticleLabelRef';
import {deepclone} from 'lodash';

@Component({
    selector: 'app-articles',
    templateUrl: './article.page.html',
    styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

    possibleQuantities: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    cart: OrderLine[] = [];
    orderLineList: OrderLine[] = [];
    orderLineBackup: OrderLine[] = [];

    f_articleList: F_ARTICLE[] = [];

    constructor(private modalController: ModalController,
                private cartService: CartService,
                private userService: UserService,
                private articleService: ArticleService) {
    }

    ngOnInit(): void {
        this.articleService.articles$.subscribe(
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
        // cf. les méthodes "getOrderLines()" et "getArticleSearched(ev: any)
        this.orderLineBackup = this.orderLineList;

        this.initTopF_ARTICLE();
        console.log(this.getAllArticleUnitPrice('801332'));
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

    initTopF_ARTICLE() {

        let map = new Map<string, number>();
        let articlesAndFrequency: [string, number][];
        let ctNum = this.userService.getActiveF_COMPTET().CT_Num;
        let tabRefLabel: [string, string][] = [];
        this.userService.getDocLignes().subscribe(
            (F_DOCLIGNES) => {
                let i = 0;
                F_DOCLIGNES.forEach(
                    (DOCLIGNE) => {
                        if (DOCLIGNE.CT_Num == ctNum) {
                            DOCLIGNE.AR_Ref = DOCLIGNE.AR_Ref.trim();
                            let stringDocligne = JSON.stringify({ref: DOCLIGNE.AR_Ref, label: DOCLIGNE.DL_Design});
                            if (DOCLIGNE.AR_Ref == '') {
                            } else if (map.get(stringDocligne) != undefined) {
                                map.set(stringDocligne, map.get(stringDocligne) + 1);
                            } else {
                                map.set(stringDocligne, 1);
                            }
                            i++;
                        }
                    }
                );
                // je recupere la map et la transforme en tableau
                articlesAndFrequency = Array.from(map.entries());
                // puis on le trie et ne garde que les 15 articles les plus commandés
                articlesAndFrequency.sort((a, b) => (b[1] - a[1]));
                articlesAndFrequency.splice(15, articlesAndFrequency.length - 15);

                articlesAndFrequency.forEach(data => this.orderLineList.push(this.stringTabToOrderLine(JSON.parse(data[0]))));
                console.log(articlesAndFrequency);
                this.initAllPrices();
            }
        );
    }

    stringTabToOrderLine(articleAndRef: ArticleLabelRef): OrderLine {
        console.log();
        let orderLine: OrderLine = new OrderLine();
        orderLine.quantity = 0;
        orderLine.orderNumber = null;
        orderLine.article = new Article();
        orderLine.article.label = articleAndRef.label;
        orderLine.article.reference = articleAndRef.ref;
        return orderLine;
    }

    private initAllPrices() {
        let copyOrderLineList = deepclone(this.orderLineList);
        let ctNum = this.userService.getActiveF_COMPTET().CT_Num;
        this.articleService.getF_ARTCLIENT().subscribe(
            (F_ARTCLIENT) => {
                F_ARTCLIENT.forEach(discount => {
                    // si le ctnum correspond, la reduction concerne le client actuel
                    if (discount.CT_Num == ctNum) {
                        let found = false;
                        let i = 0;
                        // je parcours le tableau afin de savoir si la remise correspond à un article de mon top
                        while (!found && i < this.orderLineList.length) {
                            // s'il correspond, je calcule le prix
                            if (this.orderLineList[i].article.reference == discount.AR_Ref) {
                                // 4 cas ici
                                let prixVen = parseInt(discount.AC_PrixVen);
                                let customerDiscount = parseInt(discount.AC_Remise);
                                if (prixVen != 0 && customerDiscount != 0) {
                                    this.orderLineList[i].article.finalPrice = prixVen * (1 - customerDiscount / 100);
                                } else if (customerDiscount == 0 && prixVen != 0) {
                                    this.orderLineList[i].article.finalPrice = prixVen;
                                } else{
                                    // il faut recuperer le prix unitaire qui n'est pas présent dans le f_artclient
                                    // todo a voir comment changer getAll articles pour recup tous les prix d'un coup et non pas un seul
                                    // piste : se servir de copyOrderLineList en enlevant les articles qui ont un prix present dans f_artclient
                                    // et le passer a la fonction


                                    //let unitPrice = this.getAllArticleUnitPrice();
                                    let unitPrice = 0;

                                    if (customerDiscount != 0 && prixVen == 0){
                                        this.orderLineList[i].article.finalPrice = unitPrice * (1 - customerDiscount / 100);
                                    } else {
                                        this.orderLineList[i].article.finalPrice = unitPrice;
                                    }
                                }
                            }
                        }
                    }
                });
            });
    };

    private getAllArticleUnitPrice():number {
        let price: number = 0;
        let copyOrderLineList = deepclone(this.orderLineList);
        this.articleService.getF_ARTICLE().subscribe(
            (F_ARTICLE) => {
                let i = 0;
                while (copyOrderLineList.length == 0 && i < F_ARTICLE.length) {
                    if (F_ARTICLE[i].AR_Ref === this.orderLineList[i].article.reference) {
                        price = parseFloat(F_ARTICLE[i].AR_PrixVen);
                        copyOrderLineList.slice(i, copyOrderLineList.length - i)
                    } else {
                        i++;
                    }
                }
                return price;
            }
        );
    }
}
