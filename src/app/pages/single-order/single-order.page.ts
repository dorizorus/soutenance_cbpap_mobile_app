import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/order.service';
import {AlertController, NavController, Platform, ToastController} from '@ionic/angular';
import { cloneDeep } from 'lodash';
import {CartService} from '../../services/cart.service';

import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {UserService} from '../../services/user.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-single-order',
    templateUrl: './single-order.page.html',
    styleUrls: ['./single-order.page.scss'],
})
export class SingleOrderPage implements OnInit {

    order: Order;
    total = 0;
    canEdit: boolean;
    pdfObj = null;

    constructor(private orderService: OrderService,
                private cartService: CartService,
                private alertController: AlertController,
                private navController: NavController,
                private toastController: ToastController,
                private plt: Platform,
                private file: File,
                private fileOpener: FileOpener,
                private emailComposer: EmailComposer,
                private userService: UserService) {}

    ngOnInit(): void {
        this.order = this.orderService.getOrder();
        this.total = 0;
        this.order.orderLines.forEach(value => this.total += (value.article.finalPrice * value.quantity));

        const limite: Date = this.order.orderDate;
        limite.setHours(limite.getHours() + 3);

        if (limite.getTime() > new Date().getTime()) {
            this.canEdit = true;
        }

    }

    async alertConfirm() {
        const alert = await this.alertController.create({
            header: 'Annulation d\'une commande',
            message: 'Êtes-vous certain de vouloir annuler cette commande ?',
            buttons: [
                {
                    text: 'Non',
                    // cssClass: 'secondary',
                    role: 'cancel',
                    handler: () => {
                    }
                }, {
                    text: 'Oui',
                    handler: () => {
                        this.sendCancel();
                    }
                }
            ]
        });
        await alert.present();
    }

    private sendCancel() {
        // todo : supprimer order dans le app preference
        // todo : on ne doit pas supprimer la commande annulée de l'historique des commandes ou plutôt ajouter un petit indicateur annulée
        this.createPdf();
        this.sendMail();
        this.orderService.getOrder().isCancelled = true;
        this.navController.navigateBack(['/nav/history']);

    }

    // met a jour le cart dans le service
    reorder() {
        // création du toast
        // this.toastClick();
        // fait un deep clone des lignes de la order
        const newCart = cloneDeep(this.order);
        // on met à jour le panier avec le clone
        newCart.orderNumber = null;
        this.cartService.setOrderLineList(newCart.orderLines);
        this.navController.navigateBack(['/nav/article']);
    }

    editOrder() {
        // création du toast
        // this.toastClick();
        // fait un deep clone des lignes de la order
        const newCart = cloneDeep(this.order);
        // on met à jour le panier avec le clone
        this.cartService.setOrderLineList(newCart.orderLines);
        this.cartService.updateCartInfos(newCart.orderNumber, newCart.orderDate);
        this.navController.navigateBack(['/nav/article']);
    }

    // génère un toast pour indiquer le transfert de panier
    async toastClick() {
        const toast = await this.toastController.create({
          color: 'green',
          position: 'top',
          duration: 3000,
          message: 'Commande bien transférée!'
        });

        await toast.present();
      }

      createPdf(){
        const docDefinition = {
              content: [
                  {text: 'CBPAPIERS', style: 'header'},
                  // impression de la date au format dd/mm/yyyy hh'h'mm
                  {
                      text: new Date().toLocaleDateString() + ' '
                          + new Date().toLocaleTimeString(),
                      alignment: 'right'
                  },
                  {text: 'Commande du : ' + this.order.orderDate.toLocaleDateString() + ' '
                          // this.order.orderDate.getDate() + '/'
                          // + ('0' + (this.order.orderDate.getMonth() + 1)).slice(-2) + '/'
                          // + this.order.orderDate.getFullYear() + ' '
                          + this.order.orderDate.toLocaleTimeString(), style: 'subheader'},
                  {text: 'Ref client : ' + this.userService.getActiveCustomer().id},
                  {text: this.userService.getActiveCustomer().name},
                  {text: this.userService.getActiveCustomer().address},
                  {text: 'Commande à annuler ! ! ! ', style: 'subheader'},
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
      }

      downloadPdf(){
          if (this.plt.is('cordova')) {
              this.pdfObj.getBuffer((buffer) => {
                  // tslint:disable-next-line:prefer-const
                  let blob = new Blob([buffer], {type: 'application/pdf'});

                  // Save the PDF to the data Directory of our App
                  this.file.writeFile(this.file.dataDirectory, 'annulation.pdf', blob, {replace: true}).then(fileEntry => {
                  });
              });
          } else {
              // On a browser simply use download!
              this.pdfObj.download();
          }
      }

      sendMail(){
          const email = {
              // to: 'contact@cbpapiers.com',
              to: 'adrien.fek@gmail.com',
              cc: 'justine.gracia@gmail.com',
              attachments: [
                  this.file.dataDirectory + 'annulation.pdf'
              ],
          subject: 'ANNULATION COMMANDE ' + ' REFCLIENT : ' + this.userService.getActiveCustomer().id ,
              body: 'ATTENTION ANNULATION ',
              isHtml: true
          };
          this.emailComposer.open(email);
      }



}
