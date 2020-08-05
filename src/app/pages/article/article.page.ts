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
import {cloneDeep} from 'lodash';
import {Discount} from "../../models/Discount";
import {F_ARTCLIENT} from "../../models/JSON/F_ARTCLIENT";

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
        // console.log(this.getAllArticleUnitPrice('801332'));
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

        let articlesAndFrequency: [string, string, number][] = [];
        let AR_Ref_Array: string[] = [];
        const ctNum = this.userService.getActiveF_COMPTET().CT_Num;

        this.userService.getDocLignes().subscribe(
            (F_DOCLIGNES) => {
                F_DOCLIGNES.forEach(
                    (DOCLIGNE) => {
                        if (DOCLIGNE.CT_Num == ctNum) {

                            if (DOCLIGNE.AR_Ref.trim() != '')
                                if (AR_Ref_Array.indexOf(DOCLIGNE.AR_Ref.trim()) != -1) {
                                    articlesAndFrequency[AR_Ref_Array.indexOf(DOCLIGNE.AR_Ref.trim())][2]++;
                                } else {
                                    AR_Ref_Array.push(DOCLIGNE.AR_Ref.trim());
                                    articlesAndFrequency.push([DOCLIGNE.AR_Ref.trim(), DOCLIGNE.DL_Design, 1]);
                                }
                        }

                    }
                );
                articlesAndFrequency.sort((a, b) => (b[2] - a[2]));
                articlesAndFrequency.forEach(
                    data => {
                        const orderLine = {
                            article: {
                                reference: data[0],
                                label: data[1],
                                AC_PrixVen: 0,
                                AC_Remise: 0
                            },
                            quantity: 0,
                            orderNumber: null,
                        };
                        this.orderLineList.push(orderLine);
                    }
                )
            },
            (error) => console.error(error),
            () => {
                this.initAllInfosTest();
            }
        );
    }

    private initAllInfosTest() {
        console.log('in initAllInfosTest()');

        let ctNum = this.userService.getActiveF_COMPTET().CT_Num;

        this.articleService.getF_ARTCLIENT().subscribe(
            (F_ARTCLIENT) => {

                for (let orderLine of this.orderLineList) {

                    for (const discount of F_ARTCLIENT) {

                        if (discount.AR_Ref == orderLine.article.reference) {

                            if (discount.CT_Num == ctNum) {
                                const AC_PrixVen = parseFloat(discount.AC_PrixVen.replace(',', '.'));
                                const AC_Remise = parseFloat(discount.AC_Remise.replace(',', '.'));
                                if (AC_PrixVen != 0 && AC_Remise != 0) {
                                    orderLine.article.AC_PrixVen = AC_PrixVen;
                                    orderLine.article.AC_Remise = AC_Remise;
                                    break;
                                } else if (AC_PrixVen != 0 && AC_Remise == 0) {
                                    orderLine.article.AC_PrixVen = AC_PrixVen;
                                    break;
                                } else if (AC_PrixVen == 0 && AC_Remise != 0) {
                                    orderLine.article.AC_Remise = AC_Remise;
                                    break;
                                }
                                break;
                            }
                        }
                    }
                }
                // console.log(copyOrderLineList.length);


                /*F_ARTCLIENT.forEach(discount => {
                    // si le ctnum correspond, la reduction concerne le client actuel
                    if (discount.CT_Num == ctNum) {
                        console.log('ctNumFound');
                        for (let orderLine of copyOrderLineList) {
                            if (orderLine.article.reference == discount.AR_Ref.trim()) {
                                // console.log('AR_Ref found')
                                // les différents cas
                            } else {
                                // console.log('AR_Ref not found');
                            }
                        }
                    } else {
                        // console.log('ctNumNotFound')
                    }

                });*/
            },
            error => console.error(error),
            () => this.initAllPricesTest());
    }

    private initAllPricesTest() {
        console.log('in initAllPricesTest');
        let copyOfOrderLineList = cloneDeep(this.orderLineList);
        this.articleService.getF_ARTICLE().subscribe(
            (F_ARTICLES) => {
                for (const orderline of this.orderLineList) {

                    for (const article of F_ARTICLES) {

                        if (orderline.article.reference == article.AR_Ref.trim()) {

                            if (orderline.article.AC_PrixVen != 0 && orderline.article.AC_Remise != 0)
                                orderline.article.unitPrice =
                                    orderline.article.AC_PrixVen * (1 - orderline.article.AC_Remise / 100);

                            else if (orderline.article.AC_PrixVen != 0 && orderline.article.AC_Remise == 0)
                                orderline.article.unitPrice =
                                    orderline.article.AC_PrixVen;

                            else if (orderline.article.AC_PrixVen == 0 && orderline.article.AC_Remise != 0)
                                orderline.article.unitPrice =
                                    parseFloat(article.AR_PrixVen.replace(',', '.'))
                                    * (1 - orderline.article.AC_Remise / 100);

                            else
                                orderline.article.unitPrice =
                                    parseFloat(article.AR_PrixVen.replace(',', '.'));

                            copyOfOrderLineList.splice(copyOfOrderLineList.indexOf(orderline), 1);
                            break;
                        }
                        if (copyOfOrderLineList.length == 0)
                            break;
                    }
                }
            },
            error => console.error(error),
            () => this.cartService.setOrderLineList(this.orderLineList)
        );
    }


    private initAllPrices() {

        let copyOrderLineList = cloneDeep(this.orderLineList);
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
                                // j'ai cree une copie d'orderLineList que je vide au fur et a mesure que je trouve les prix
                                // a la fin il ne reste que les OrderLine qui n'ont pas de prix calcule
                                if (prixVen != 0 && customerDiscount != 0) {
                                    let index = copyOrderLineList.indexOf(this.orderLineList[i]);
                                    copyOrderLineList.slice(index, copyOrderLineList.length - index);
                                    this.orderLineList[i].article.finalPrice = prixVen * (1 - customerDiscount / 100);
                                } else if (customerDiscount == 0 && prixVen != 0) {
                                    let index = copyOrderLineList.indexOf(this.orderLineList[i]);
                                    copyOrderLineList.slice(index, copyOrderLineList.length - index);
                                    this.orderLineList[i].article.finalPrice = prixVen;
                                } else {
                                    // il faut recuperer le prix unitaire qui n'est pas présent dans le f_artclient
                                    // todo a voir comment changer getAll articles pour recup tous les prix d'un coup et non pas un seul
                                    // piste : se servir de copyOrderLineList en enlevant les articles qui ont un prix present dans f_artclient
                                    // et le passer a la fonction
                                    let unitPrice = this.getAllArticleUnitPrice();

                                    if (customerDiscount != 0 && prixVen == 0) {
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
    }

    private getAllArticleUnitPrice(): number {
        let price: number = 0;
        let copyOrderLineList = cloneDeep(this.orderLineList);
        this.articleService.getF_ARTICLE().subscribe(
            (F_ARTICLE) => {
                let i = 0;
                while (copyOrderLineList.length == 0 && i < F_ARTICLE.length) {
                    if (F_ARTICLE[i].AR_Ref === this.orderLineList[i].article.reference) {
                        price = parseFloat(F_ARTICLE[i].AR_PrixVen);
                        copyOrderLineList.slice(i, copyOrderLineList.length - i);
                    } else {
                        i++;
                    }
                }
            }, () => {
            },
            () => {
                return price;
            }
        );
        return 0;
    }
}
