import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SingleArticlePage} from '../single-article/single-article.page';
import {Article} from 'src/app/models/Article';
import {OrderLine} from 'src/app/models/OrderLine';
import {UserService} from 'src/app/services/user.service';
import {Customer} from 'src/app/models/Customer';
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
    totalQuantity: number;
    cart: OrderLine[] = [];
    orderLineList: OrderLine[] = [];
    orderLineBackup: OrderLine[] = [];
    activeF_COMPTET: F_COMPTET;

    articlesAndFrequency: ArticleAndFrequency[] = [];
    f_ARTICLES: F_ARTICLE[] = [];
    f_articleList: F_ARTICLE[] = [];

    constructor(private modalController: ModalController,
                private cartService: CartService,
                private userService: UserService,
                private articleService: ArticleService) {
    }

    ngOnInit(): void {
        // initialisation de notre liste d'article de base
        this.initializeArticles();
        this.initClient();
        this.initOrderLines(this.articleList);

        this.articleService.Articles$.subscribe(
            (list) => {
                this.f_articleList = list;
                //this.getF_ARTICLES();
            }
        );
        this.cartService.cart$.subscribe(data => {
            this.cart = data;
            this.totalQuantity = data.length;
        });
        this.cartService.orderLineList$.subscribe(
            (liste) => this.orderLineList = liste
        );

        // à la création de la page on fait une copie de la liste.
        // cf. les m&éthodes "getOrderLines()" et "getArticleSearched(ev: any)
        this.orderLineBackup = this.orderLineList;

        this.activeF_COMPTET = this.userService.getActiveF_COMPTET()
        this.userService.activeF_COMPTET$.subscribe(
            (F_COMPTET) => {
                this.activeF_COMPTET = F_COMPTET;
                this.initializeF_ARTICLE();
            }
        );
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

    // initialisation de la liste d'article créée. On utilisera le back à la place ici
    initializeArticles() {
        this.articleList = [{
            reference: 'AR578',
            label: 'Carton cache test long texte jtriueothikre',
            unitPrice: 40.00,
            finalPrice: 40.00,
            family: 'Carton',
            articleImage: {
                id: 1,
                image: 'assets/icon/devanturePizzaHut.png'
            },
            articleDetails: {
                id: 2,
                description: 'Un carton qui vous permet d\'echapper à vos poursuivants, que ce soit un huissier ou un membre de votre famille qui réclame le prêt qu\'il vous a attribué 10 ans auparavant. NE PAS APPROCHER DE LOUPS SAUVAGE, CETTE PROTECTION NE SUFFIRA PAS.'
            }
        },
            {
                reference: '3EA45F',
                label: 'Carton mystere',
                unitPrice: 20.00,
                finalPrice: 20.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton super grand'
                }
            },
            {
                reference: '98877RRF',
                label: 'Carton nature',
                unitPrice: 15.00,
                finalPrice: 15.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton basique'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            },
            {
                reference: 'AAA78ff',
                label: 'Carton rosé',
                unitPrice: 12.00,
                finalPrice: 12.00,
                family: 'Carton',
                articleImage: {
                    id: 1,
                    image: 'assets/icon/devanturePizzaHut.png'
                },
                articleDetails: {
                    id: 2,
                    description: 'Un carton qui sent bon la rose'
                }
            }
        ];
    }

    initClient() {
        let clientFactice = new Customer();
        clientFactice =
            {
                id: '2',
                name: 'Pizza Chez Moi Sarl',
                address: '5 rue des pizzaiolo',
                email: 'chezmoi@pizzasarl.com',
                password: '458dsqfdkdsqlfkqsd54',
                customerPicture: 'assets/icon/devanturePizzaHut.png',
                phoneNumber: '0387254981',
                customerFiles: 'blabla',
                city:
                    {
                        id: 55,
                        name: 'Metz',
                        postalCode: 57000
                    }

            };
        this.userService.setCustomer(clientFactice);
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

    initializeF_ARTICLE() {
        console.log(this.activeF_COMPTET);

        let map = new Map<string, number>();
        let array2: string[] = [];
        let array = [];
        this.cartService.getDocLignes().subscribe(
            (F_DOCLIGNES) => {
                F_DOCLIGNES.forEach(
                    (DOCLIGNE) => {
                        if (DOCLIGNE.CT_Num == this.activeF_COMPTET.CT_Num) {
                            if (DOCLIGNE.AR_Ref == '') {
                            } else {
                                // pourquoi ne pas faire une map pour la fréquence ?
                                // du type let map = new Map<object, string>(); ça remplace tout le while et probablement bcp plus perf
                                /*
                                let i = 0;
                                let found = false;
                                while (!found && i < this.articlesAndFrequency.length) {
                                    if (this.articlesAndFrequency[i].AR_Ref == DOCLIGNE.AR_Ref) {
                                        found = true;
                                        this.articlesAndFrequency[i].frequency++;
                                    } else {
                                        i++;
                                    }
                                }
                                if (!found) {
                                    this.articlesAndFrequency.push({AR_Ref: DOCLIGNE.AR_Ref, frequency: 1});
                                }
                                this.articlesAndFrequency.sort((a, b) => (b.frequency - a.frequency));
                                this.articlesAndFrequency.splice(15, this.articlesAndFrequency.length - 15);
                                 */
                                DOCLIGNE.AR_Ref = DOCLIGNE.AR_Ref.trim();
                                if (map.get(DOCLIGNE.AR_Ref) != undefined) {
                                    map.set(DOCLIGNE.AR_Ref, map.get(DOCLIGNE.AR_Ref)+1);
                                } else {
                                    map.set(DOCLIGNE.AR_Ref,1);
                                    array2.push(DOCLIGNE.AR_Ref);
                                }
                                array = Array.from(map.entries());
                            }
                        }
                    }
                );
                // on transforme le tableau de tableau en objet ArticleAndFrequency
                array.forEach(data => this.articlesAndFrequency.push({AR_Ref:data[0], frequency: data[1]}));
                // puis on le trie et ne garde que les 15 articles les plus commandés
                this.articlesAndFrequency.sort((a, b) => (b.frequency - a.frequency));
                this.articlesAndFrequency.splice(15, this.articlesAndFrequency.length - 15);
            }
        );
    }
}