import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/order.service';
import {TotalService} from '../../services/total.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Platform} from '@ionic/angular';

import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

import {CartService} from '../../services/cart.service';
import {WarehouseRetService} from '../../services/warehouse-ret.service';
import {UserService} from '../../services/user.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-validation-com',
    templateUrl: './order-validation.page.html',
    styleUrls: ['./order-validation.page.scss'],
})
export class OrderValidationPage implements OnInit {

    total: number;

    pdfObj = null;
    orderlines;
    pdfcreated: boolean;
    

    constructor(private totalService: TotalService, private plt: Platform, private file: File, private fileOpener: FileOpener, private emailComposer: EmailComposer, private cartService: CartService, private warehouseRetService: WarehouseRetService, private userService: UserService) {
    }

    ngOnInit() {
        this.total = this.totalService.getTotal();
        this.orderlines = this.cartService.getCart();
    }

    //permet d'indiquer si y a un retrait entrepôt ou non en fonction du statut du toogle du retrait entrepôt
    isWarehouseRet() {
      return this.warehouseRetService.getStatus() ? 'OUI' : 'NON';
    }

    //construction du header du tableau du pdf = titres des colonnes du tableau
    header = [
        {text: 'Reference article', style: 'tableHeader', alignment: 'center'},
        {text: 'Quantité', style: 'tableHeader', alignment: 'center'},
        {text: 'Prix', style: 'tableHeader', alignment: 'center'}
    ];

    //on initialise les lignes du tableau avec le header
    myBody = [this.header];

    //construction des lignes du tableau : pour chaque orderline récupérée du panier on ajoute cette orderline dans une ligne du tableau avec les éléments dont on a besoin : ici reference de l'article, quantité et prix final
    //l'array myBody est donc incrémenté de nouvelles données
    constructBody() {
        for (const orderline of this.orderlines) {
            // @ts-ignore
            this.myBody.push([`${orderline.article.reference}`, `${orderline.quantity}`, `${orderline.article.finalPrice * orderline.quantity  + '€'}`]);
        }
        return this.myBody;
    }

    createPdf() {
        let docDefinition = {
            content: [
                {text: 'CBPAPIERS', style: 'header'},
                //impression de la date au format dd/mm/yyyy hh'h'mm
                {text: new Date().getDate() + '/' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + 'h' + new Date().getMinutes(), alignment: 'right'},
                {text: 'Commande : ' , style: 'subheader'},
                {text: 'Ref client : ' + this.userService.getCustomer().id},
                {text: this.userService.getCustomer().name},
                {text: this.userService.getCustomer().address},
// c'est ici qu'on construit le tableau dans le pdf : on indique le nombre de colonnes et on injecte l'array myBody construit dans la méthode constructBody()
                {
                    style: 'tableExample',
                    table: {
                        widths: ['*', '*', '*'],
                        body: this.constructBody()
                    }
                },
                {
                    text: 'Total HT : ' + this.total + ' €', alignment: 'right'
                },
                {
                    text: 'Retrait entrepôt : ' + this.isWarehouseRet(), alignment: 'right'
                }
            ],
            styles: {
                subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                alignment: 'justify'
            }
        };
        this.pdfObj = pdfMake.createPdf(docDefinition);
        this.downloadPdf();
        //le pdf a été créé donc je passe mon boolean à true pour que le bouton envoimail soit activé
        this.pdfcreated = true;

    }

    //permet d'enregistrer le pdf dans le data Directory de l'application

    downloadPdf() {
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer((buffer) => {
                // tslint:disable-next-line:prefer-const
                let blob = new Blob([buffer], {type: 'application/pdf'});

                // Save the PDF to the data Directory of our App
                this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, {replace: true}).then(fileEntry => {
                    //  à enlever !  je laisse juste pour les tests sur pc
                    // this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
                });
            });
        } else {
            // On a browser simply use download!
            this.pdfObj.download();
        }

    }

    sendMail() {
        const email = {
            // to: 'contact@cbpapiers.com',
            to: 'adrien.fek@gmail.com',
            cc: 'justine.gracia@gmail.com',
            attachments: [
                this.file.dataDirectory + 'myletter.pdf'
            ],
            subject: ' REFCLIENT : ' + this.userService.getCustomer().id,
            body: 'How are you?',
            isHtml: true
        };
        this.emailComposer.open(email);

    }
}

