import {Component, OnInit} from '@angular/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {ModalController, Platform} from '@ionic/angular';

import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

import {CartService} from '../../services/cart.service';
import {WarehouseRetService} from '../../services/warehouse-ret.service';
import {UserService} from '../../services/user.service';
import {OrderLine} from '../../models/OrderLine';
import {OrderService} from '../../services/order.service';
import {Order} from '../../models/Order';
import {cloneDeep} from 'lodash';
import {GenerateIDService} from '../../services/generate-id.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-validation-com',
    templateUrl: './order-validation.page.html',
    styleUrls: ['./order-validation.page.scss'],
})
export class OrderValidationPage implements OnInit {

    finalTotal: number;
    pdfObj = null;
    order: Order;
    statusShipping: boolean;

    constructor(private plt: Platform,
                private file: File,
                private fileOpener: FileOpener,
                private emailComposer: EmailComposer,
                private cartService: CartService,
                private warehouseRetService: WarehouseRetService,
                private userService: UserService,
                private orderService: OrderService,
                private modalController: ModalController,
                private generateIdService: GenerateIDService,
                private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.order = this.cartService.getCart();
        console.log('init order', this.order);
        this.finalTotal = this.cartService.getFinalTotal();
        this.statusShipping = this.warehouseRetService.getStatusShipping();
    }


    // permet d'indiquer si y a un retrait entrepôt ou non en fonction du statut du toogle du retrait entrepôt
    isWarehouseRet() {
        return this.warehouseRetService.getStatus() ? 'OUI' : 'NON';
    }

    shipping() {
        return this.statusShipping ? '20 €' : 'gratuite';
    }


    header = [
        {text: 'Reference article', style: 'tableHeader', alignment: 'center'},
        {text: 'Quantité', style: 'tableHeader', alignment: 'center'},
        {text: 'Prix', style: 'tableHeader', alignment: 'center'}
    ];

    myBody = [this.header];

    constructBody() {
        for (const orderline of this.order.orderLines) {
            // @ts-ignore
            this.myBody.push([`${orderline.article.reference}`, `${orderline.quantity}`,
                // @ts-ignore
                `${Number(orderline.article.finalPrice * orderline.quantity).toFixed(2) + '€'}`]);
        }
        return this.myBody;
    }


    sendPdf() {
        const docDefinitionPart1 = [
            {text: 'CBPAPIERS', style: 'header'},
            {
                text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
                alignment: 'right'
            }
        ];

        let docDefinitionPart2;
        if (this.order.orderNumber == null) {
            this.order.orderDate = new Date();
            docDefinitionPart2 = [
                {text: 'Commande : ', style: 'subheader'},
                {text: 'Ref client : ' + this.userService.getActiveCustomer().id},
                {text: this.userService.getActiveCustomer().name},
                {text: this.userService.getActiveCustomer().address},
                {text: this.userService.getActiveCustomer().city.postalCode + ' ' + this.userService.getActiveCustomer().city.name}
            ];

        } else {
            docDefinitionPart2 = [
                {
                    text: 'ATTENTION Commande ' + this.cartService.getCart().orderNumber
                        + ' ' + new Date(this.cartService.getCart().orderDate).toLocaleDateString()  +
                        ' ' + new Date(this.cartService.getCart().orderDate).toLocaleTimeString()
                        + ' MODIFIEE', style: 'subheader'
                },
                {text: 'Ref client : ' + this.userService.getActiveCustomer().id},
                {text: this.userService.getActiveCustomer().name},
                {text: this.userService.getActiveCustomer().address},
                {text: this.userService.getActiveCustomer().city.postalCode + ' ' + this.userService.getActiveCustomer().city.name}
            ];
        }

        const docDefinitionPart3 = [
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*', '*'],
                    body: this.constructBody()
                }
            },
            {text: 'Livraison : ' + this.shipping(), alignment: 'right'},
            {
                text: 'Total HT : ' + Number(this.finalTotal).toFixed(2) + ' €', alignment: 'right'
            },
            {
                text: 'Retrait entrepôt : ' + this.isWarehouseRet(), alignment: 'right'
            }
        ];

        const docDefinition = {
            content: [docDefinitionPart1, docDefinitionPart2, docDefinitionPart3],
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
        this.sendMail();
        if (this.order.orderNumber == null) {
            this.saveOrder();
        }
        else {
            this.editOrder();
        }
    }


    downloadPdf() {
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer((buffer) => {
                let blob = new Blob([buffer], {type: 'application/pdf'});
                this.file.writeFile(this.file.dataDirectory, 'commande.pdf', blob, {replace: true}).then(fileEntry => {
                });
            });
        } else {
            this.pdfObj.download();
        }
    }



    sendMail() {
        const email = {
            to: 'contact@cbpapiers.com',
            attachments: [
                this.file.dataDirectory + 'commande.pdf'
            ],
            subject: ' REFCLIENT : ' + this.userService.getActiveCustomer().id,
            body: 'Ci-joint le récapitulatif de la commande',
            isHtml: true
        };
        this.emailComposer.open(email);

    }


    //fermeture de la modal après envoi commande
    onDismiss() {
        this.modalController.dismiss();
    }

    // remise à 0 du panier et des quantités d'article sélectionnées après envoi commande
    deleteAll(orderlines: OrderLine[]) {
        orderlines.forEach(
            (orderLine) => {
                orderLine.quantity = 0;
            }
        );

        this.cartService.resetCart();
        this.warehouseRetService.setStatus(false);
        this.onDismiss();
    }

    // enregistrer la commande dans la bdd
    saveOrder() {
        console.log(this.order);
        this.httpClient.post(environment.order, this.order).subscribe((data) =>
                console.log('Enregistrement effectué', data),
            error => console.log(error),
            () => {
                this.deleteAll(this.order.orderLines);
                this.orderService.getOrders(this.order.customer.id);
            }
        );
    }

    editOrder() {
        console.log(this.order);
        this.httpClient.post(environment.order + 'edit', this.order).subscribe((data) =>
                console.log('enregistre', data),
            error => console.log(error),
            () => {
                // on reinitialise les orderlines de panier pour le remettre à 0
                this.deleteAll(this.order.orderLines);
                this.orderService.getOrders(this.order.customer.id);
            }
        );
    }

    // sendPdfEdit() {
    //     // enregistrement de la commande réalisée dans le tableau des commandes de orderService
    //     const docDefinition = {
    //         content: [
    //             {text: 'CBPAPIERS', style: 'header'},
    //             // impression de la date au format dd/mm/yyyy hh'h'mm
    //             {
    //                 text: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    //                 alignment: 'right'
    //             },
    //             // tslint:disable-next-line:max-line-length
    //             {
    //                 text: 'ATTENTION Commande ' + this.cartService.getCart().orderNumber + ' ' + this.cartService.getCart().orderDate.toLocaleDateString() +
    //                     ' ' + this.cartService.getCart().orderDate.toLocaleTimeString() + ' MODIFIEE',
    //                 style: 'subheader'
    //             },
    //             {text: 'Ref client : ' + this.userService.getActiveCustomer().id},
    //             {text: this.userService.getActiveCustomer().name},
    //             {text: this.userService.getActiveCustomer().address},
    //             {text: this.userService.getActiveCustomer().city.postalCode + ' ' + this.userService.getActiveCustomer().city.name},
    //
    //             // c'est ici qu'on construit le tableau dans le pdf :
    //             // on indique le nombre de colonnes et on injecte l'array myBody construit dans la méthode constructBody()
    //             {
    //                 style: 'tableExample',
    //                 table: {
    //                     widths: ['*', '*', '*'],
    //                     body: this.constructBody()
    //                 }
    //             },
    //             {text: 'Livraison : ' + this.shipping(), alignment: 'right'},
    //             {
    //                 text: 'Total HT : ' + Number(this.finalTotal).toFixed(2) + ' €', alignment: 'right'
    //             },
    //             {
    //                 text: 'Retrait entrepôt : ' + this.isWarehouseRet(), alignment: 'right'
    //             }
    //         ],
    //         styles: {
    //             subheader: {
    //                 fontSize: 16,
    //                 bold: true,
    //                 margin: [0, 10, 0, 5]
    //             },
    //             tableExample: {
    //                 margin: [0, 5, 0, 15]
    //             },
    //             tableHeader: {
    //                 bold: true,
    //                 fontSize: 13,
    //                 color: 'black'
    //             }
    //         },
    //         defaultStyle: {
    //             alignment: 'justify'
    //         }
    //     };
    //
    //     this.pdfObj = pdfMake.createPdf(docDefinition);
    //     this.downloadPdf();
    //     this.sendMail();
    //
    //     // on fait un clone de la commande
    //     // on envoie ce clone pour modification de la commande déjà existante avec le même numéro de commande
    //     const ORDER_HISTORY = cloneDeep(this.order);
    //     this.orderService.editOrder(ORDER_HISTORY);
    //
    //
    //     // on reinitialise les orderlines de panier pour le remettre à 0
    //     this.deleteAll(this.order.orderLines);
    //     // on set le orderNumber à null car sinon lors des prochaines commandes il va encore modifier la dernière
    //     this.cartService.getCart().orderNumber = null;
    // }
}
