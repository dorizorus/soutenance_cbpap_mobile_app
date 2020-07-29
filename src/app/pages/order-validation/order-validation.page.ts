import {Component, OnInit} from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Platform} from '@ionic/angular';

import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

import {CartService} from '../../services/cart.service';
import {WarehouseRetService} from '../../services/warehouse-ret.service';
import {UserService} from '../../services/user.service';
import {OrderLine} from '../../models/OrderLine';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-validation-com',
    templateUrl: './order-validation.page.html',
    styleUrls: ['./order-validation.page.scss'],
})
export class OrderValidationPage implements OnInit {

    total: number;

    pdfObj = null;
    orderlines: OrderLine[];


    constructor(private plt: Platform,
                private file: File,
                private fileOpener: FileOpener,
                private emailComposer: EmailComposer,
                private cartService: CartService,
                private warehouseRetService: WarehouseRetService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.orderlines = this.cartService.getCart();
        console.log(new Date().getHours() + 'h' + new Date().getMinutes());
        this.total = this.cartService.getTotal();
    }

    isWarehouseRet() {
        return this.warehouseRetService.getStatus() ? 'OUI' : 'NON';
    }


    header = [
        {text: 'Reference', style: 'tableHeader', alignment: 'center'},
        {text: 'Quantité', style: 'tableHeader', alignment: 'center'},
        {text: 'Prix', style: 'tableHeader', alignment: 'center'}
    ];


    myBody = [this.header];


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

    }

    downloadPdf() {
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer((buffer) => {
                // tslint:disable-next-line:prefer-const
                let blob = new Blob([buffer], {type: 'application/pdf'});

                // Save the PDF to the data Directory of our App
                this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, {replace: true}).then(fileEntry => {
                    //   // Open the PDf with the correct OS tools : à enelever !  je laisse juste pour les tests sur pc
                    this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
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
                // 'file:myletter.pdf'
            ],
            subject: 'Commande Number XXXX , REFCLIENT XXXX',
            body: 'How are you?',
            isHtml: true
        };
        this.emailComposer.open(email);

    }
}

