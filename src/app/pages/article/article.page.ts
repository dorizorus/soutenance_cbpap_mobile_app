import {Component, OnInit} from '@angular/core';
import {DataService} from "../services/data.service";
import {ModalController} from "@ionic/angular";
import {SingleArticlePage} from "../single-article/single-article.page";
import {Article} from 'src/app/models/Article';
import {OrderLine} from 'src/app/models/OrderLine';
import {OrderService} from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from 'src/app/models/Client';

@Component({
    selector: 'app-articles',
    templateUrl: './article.page.html',
    styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

    nombreQuantite: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    listeArticles: Article[];
    quantiteTotal: number;
    orderLines: OrderLine[] = [];


    constructor(private navParamsService: DataService,
                private modalController: ModalController,
                private orderService: OrderService,
                private userService : UserService) {

        // initialisation de notre liste d'article de base
        this.initializeArticles();
        this.initClient();
        
    }

    ngOnInit() {
    }

    // Dés qu'une quantité est selectionné pour un produit, la méthode
    // est censée la transmettre au service mais ça déconne
    onChange(ev: any, art: Article) {
        const val = ev.target.value;
        this.quantiteTotal = 0;


        // on ajoute une ligne pour l'afficher dans la commande par la suite
        let ligne = {
            orderNumber: null,
            article: art,
            quantity: val
        }
        // S'il n'y a pas de lignes, on ajoute directement. S'il y en a, on remplace
        // la quantité de la ligne par la nouvelle.
        // !!  Créer des lignes a chaque changement et le calcul de la quantité marche pas

        if (ligne.quantity == 0) { // suppression
            if (this.orderLines.length != 0) {
                let index = this.getArticlePosition(ligne);
                if (index != -1)
                    this.orderLines.splice(index, 1);
            }
        } else { // ajout ou modif
            let index: number = this.getArticlePosition(ligne);
            if (index == -1) { // pas trouve donc on ajoute
                this.orderLines.push(ligne);
                this.quantiteTotal++;
            } else { // update
                this.orderLines[index] = ligne;
            }
        }
        this.orderService.setPanier(this.orderLines);
        console.log(this.orderLines);
        console.log(this.orderService.getPanier().length) 
    }

    getArticlePosition(ligne: OrderLine): number {
        let trouve: boolean = false;
        let index = 0;
        while (!trouve && index < this.orderLines.length) {
            if (this.orderLines[index].article === ligne.article) {
                trouve = true;
            }
            index++;
        }
        console.log(index + " index ")
        if (trouve)
            return index - 1;
        return -1;
    }


    // Retire du tableau si une commande a 0 article et calcule le total de la quantité d'article
    checkQuantity(ligneQuantity: OrderLine, element: OrderLine) {

        if (ligneQuantity.quantity > element.quantity) {
            // Si le quantité input est supérieure, on soustrait l'ancienne et on ajoute la nouvelle
            this.quantiteTotal -= element.quantity;
            this.quantiteTotal += ligneQuantity.quantity;

            // Si la quantité input est inférieure et non égale à 0, on soustrait la différence
        } else if ((ligneQuantity.quantity < element.quantity) && (!(ligneQuantity.quantity === 0))) {
            this.quantiteTotal -= (element.quantity - ligneQuantity.quantity);

            // Si aucun des deux critères n'est rempli, c'est que c'est à 0 donc on supprime la ligne
        } else {
            const cle = this.orderLines.indexOf(element)
            this.orderLines.splice(cle, 1);
        }
    }

    // créer une modal avec les donnée d'un article pour les transférer dans la modal
    async onLoadArticle(articleData) {
        this.navParamsService.setData(articleData);
        const modal = await this.modalController.create({
            component: SingleArticlePage,
            cssClass: 'modal-article',
            backdropDismiss: true
        });
        return await modal.present();
    }

    // initialisation de la liste d'articlé crée la dedans. On utilisera le back a la place ici
    initializeArticles() {
        this.listeArticles = [{
            ref: 'AR578',
            libelle: 'Carton cache',
            prixUnitaire: 40.00,
            famille: 'Carton',
            image: {
                id: 1,
                document: 'assets/icon/devanturePizzaHut.png'
            },
            description: {
                id: 2,
                contenu: "Un carton qui vous permet d'echapper à vos poursuivants, que ce soit un huissier ou un membre de votre famille qui réclame le prêt qu'il vous a attribué 10 ans auparavant. NE PAS APPROCHER DE LOUPS SAUVAGE, CETTE PROTECTION NE SUFFIRA PAS."
            }
        },
            {
                ref: '3EA45F',
                libelle: 'Carton mystere',
                prixUnitaire: 20.00,
                famille: 'Carton',
                image: {
                    id: 1,
                    document: 'assets/icon/devanturePizzaHut.png'
                },
                description: {
                    id: 2,
                    contenu: "Un carton super grand"
                }
            },
            {
                ref: '98877RRF',
                libelle: 'Carton nature',
                prixUnitaire: 15.00,
                famille: 'Carton',
                image: {
                    id: 1,
                    document: 'assets/icon/devanturePizzaHut.png'
                },
                description: {
                    id: 2,
                    contenu: "Un carton basique"
                }
            },
            {
                ref: 'AAA78ff',
                libelle: 'Carton rosé',
                prixUnitaire: 12.00,
                famille: 'Carton',
                image: {
                    id: 1,
                    document: 'assets/icon/devanturePizzaHut.png'
                },
                description: {
                    id: 2,
                    contenu: "Un carton qui sent bon la rose"
                }
            }
        ];
    }

    initClient(){
      let clientFactice = new Client();
      clientFactice =
              {
        id : 2,
        nom: "Pizza Chez Moi Sarl",
        adresse: "5 rue des pizzaiolo",
        email : "chezmoi@pizzasarl.com",
        mdp : "458dsqfdkdsqlfkqsd54",
        image : "assets/icon/devanturePizzaHut.png",
        numeroTel : "0387254981",
        ville  :
        {
          id : 55,
          nomVille : "Metz",
          codePostal : 57000
        }
  
      };
      this.userService.setClient(clientFactice);
    }


    // méthode pour la searchbar de ionic.
    getArticleSearched(ev: any) {

        // on réinitialise la liste d'article a affiché en refaisant appel à la liste originelle
        this.initializeArticles();

        // set la valeur de l'input de la searchbar dans "val". On indique que c'est un input html
        const val = (ev.target as HTMLInputElement).value;

        // si rien n'est mis on affiche tout, sinon on filtre avec ce qui a été inséré
        if (val && val.trim() !== '') {
            this.listeArticles = this.listeArticles.filter((article) => {
                return (article.ref.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    article.libelle.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

}

