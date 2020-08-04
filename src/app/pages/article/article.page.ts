import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {SingleArticlePage} from '../single-article/single-article.page';
import {Article} from 'src/app/models/Article';
import {OrderLine} from 'src/app/models/OrderLine';
import {UserService} from 'src/app/services/user.service';
import {Customer} from 'src/app/models/Customer';
import {CartService} from '../../services/cart.service';
import {ArticleService} from '../../services/article.service';
import {Order} from '../../models/Order';

@Component({
    selector: 'app-articles',
    templateUrl: './article.page.html',
    styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

    possibleQuantities: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    articleList: Article[] = [];
    totalQuantity: number;
    cart: Order;
    orderLineList: OrderLine[] = [];
    orderLineBackup: OrderLine[] = [];

    constructor(private modalController: ModalController,
                private cartService: CartService,
                private userService: UserService,
                private articleService: ArticleService) {

        // initialisation de notre liste d'article de base
        this.initializeArticles();
        // this.initClient();
        this.initOrderLines(this.articleList);
    }

    ngOnInit(): void {
        this.cartService.cart$.subscribe(data => {
            this.cart = data;
            this.totalQuantity = data.orderLines.length;
        });

        this.cartService.orderLineList$.subscribe(
            (liste) => {
                this.orderLineList = liste;
            }
        );

        // à la création de la page on fait une copie de la liste.
        // cf. les methodes "getOrderLines()" et "getArticleSearched(ev: any)
        this.orderLineBackup = this.orderLineList;
    }

    // Dés qu'une quantité est selectionné pour un produit, la méthode la transmet au service
    // n'est plus utilisée car on utilise orderLine avec la quantité et non Article
    // onChange(ev: any, art: Article) {
    //     const val = ev.target.value;
    //     this.totalQuantity = 0;
    //
    //     // on ajoute une line pour l'afficher dans la commande par la suite
    //     const line = {
    //         orderNumber: null,
    //         article: art,
    //         quantity: val
    //     };
    //     // S'il n'y a pas de lignes, on ajoute directement. S'il y en a, on remplace la quantité de la line par la nouvelle.
    //     if (line.quantity === 0) { // suppression
    //
    //         if (this.cart.length !== 0) {
    //             const index = this.getArticlePosition(line);
    //             if (index !== -1) {
    //                 this.cart.splice(index, 1);
    //             }
    //         }
    //     } else { // ajout ou modif
    //         const index: number = this.getArticlePosition(line);
    //         if (index === -1) { // pas trouve donc on ajoute
    //             console.log('entré dans ajout');
    //             this.cart.push(line);
    //         } else { // update
    //             console.log('entré dans update');
    //             this.cart[index] = line;
    //         }
    //     }
    //     this.cartService.setCart(this.cart);
    // }

    // permet de retrouver la position d'un article à partir d'une ligne de commande
    // n'est plus utilisée car on utilise l'objet orderLine plutôt que article
    // getArticlePosition(ligne: OrderLine): number {
    //     let found = false;
    //     let index = 0;
    //     while (!found && index < this.cart.length) {
    //         if (this.cart[index].article === ligne.article) {
    //             found = true;
    //         }
    //         index++;
    //     }
    //     if (found) {
    //         return index - 1;
    //     }
    //     return -1;
    // }

    // quand on clique sur l'article, on affiche la description
    // n'est plus utilisée car on utilise l'objet orderLine plutôt que article
    // async createArticleDetails(articleData: Article) {
    //     this.articleService.setArticle(articleData);
    //     const modal = await this.modalController.create({
    //         component: SingleArticlePage,
    //         cssClass: 'modal-article',
    //         backdropDismiss: true
    //     });
    //     return await modal.present();
    // }

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
        this.cartService.initOrderLinesList(this.orderLineList);
    }

    // retourne un backup d'orderLineList générée en initialisation de page.
    // l'intérêt est d'avoir une liste clean en backup qu'on envoie à la fonction filtre
    getOrderLines() {
        return this.orderLineBackup;
    }

    // méthode pour la searchbar de ionic.
    getArticleSearched(ev: any) {
        // n'est plus utilisé car passage de la manipulation d'article à orderline
        // on réinitialise la liste d'article a afficher en refaisant appel à la liste originelle
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


    // quand on clique sur l'article (image ou libelle), on affiche la description de l'article(considéré comme un orderline ici)
    async createOrderLineDetails(orderLine: OrderLine) {

        const modal = await this.modalController.create({
            component: SingleArticlePage,
            cssClass: 'modal-article',
            backdropDismiss: true,
            componentProps: {
                orderLine
            }
        });
        return await modal.present();

    }

    // Dés qu'une quantité est selectionnée pour un article, la méthode met à jour le panier et envoie l'information au cartservice
    // on interprète le fait que c'est une suppression ou un ajout ou une mise à jour
    onChangeOrderLine($event: any, orderLine: OrderLine) {

        // récupération de la quantité modifiée
        const qty = $event.target.value;

        // récupération de la position de l'article modifié dans le panier
        const index = this.cart.orderLines.indexOf(orderLine);

        // 1er if : on checke si il s'agit d'une suppression
        // l'article est dans le panier : quantité = 0 et on supprime l'article du panier
        if (qty == 0 && this.cart.orderLines.length !== 0 && index !== -1) {
            this.cart.orderLines.splice(index, 1);

            // on met à jour la quantité d'article d'un article déjà présent dans le panier (mais pas à supprimer : qté >0)
        } else if (index !== -1) {
            orderLine.quantity = qty;
            this.cart.orderLines[index] = orderLine;

            // dernier cas : dans le cas d'un article qui n'est pas dans le panier (car index= -1 = article non trouvé)
            // on set la nouvelle quantité et on ajoute le nouvel article au panier
        } else {
            orderLine.quantity = qty;
            this.cart.orderLines.push(orderLine);
        }

        // on met à jour le nouveau panier dans le service
        this.cartService.setCart(this.cart);

        // on met à jour la liste d'articles avec la nouvelle quantité dans le service
        this.cartService.setOrderLineList(this.orderLineList);
    }

}

