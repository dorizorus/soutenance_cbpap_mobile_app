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

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-validation-com',
    templateUrl: './order-validation.page.html',
    styleUrls: ['./order-validation.page.scss'],
})
export class OrderValidationPage implements OnInit {

    total: number;

    pdfObj = null;
    

    constructor(private totalService: TotalService, private plt: Platform, private file: File, private fileOpener: FileOpener, private emailComposer: EmailComposer, private cartService: CartService, private warehouseRetService: WarehouseRetService) {
    }

    ngOnInit() {
        this.total = this.totalService.getTotal();
    }

    isWarehouseRet() {
      return this.warehouseRetService.getStatus() ? 'OUI' : 'NON';
    }


    header = [
        {text: 'ID', style: 'tableHeader', alignment: 'center'},
        {text: 'Name', style: 'tableHeader', alignment: 'center'},
        {text: 'Quantity', style: 'tableHeader', alignment: 'center'}
    ];


    myBody = [this.header];

    ARTICLES = [
        {
            id: 1,
            name: 'Tomates',
            quantity: 5
        },
        {
            id: 2,
            name: 'Courgettes',
            quantity: 3
        },
        {
            id: 3,
            name: 'Poireaux',
            quantity: 4
        },
        {
            id: 4,
            name: 'Cerises',
            quantity: 2
        }
    ];


    constructBody() {
        for (const article of this.ARTICLES) {
            // @ts-ignore
            this.myBody.push([`${article.id}`, `${article.name}`, `${article.quantity}`]);
        }
        return this.myBody;
    }

    createPdf() {
        let docDefinition = {
            content: [
                {text: 'REMINDER', style: 'header'},
                {text: new Date().toTimeString(), alignment: 'right'},

                // {text: 'From', style: 'subheader'},
                // {text: this.letterObj.from},
                //
                // {text: 'To', style: 'subheader'},
                // this.letterObj.to,

                // {text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20]},

                {text: 'Ma commande', style: 'subheader'},
                {
                    style: 'tableExample',
                    table: {
                        widths: ['*', '*', '*'],
                        body: this.constructBody()
                    }
                },
                {
                    text: 'Total HT :' + this.total + ' €'
                },
                {
                    text: 'Retrait entrepôt : ' + this.isWarehouseRet()
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

