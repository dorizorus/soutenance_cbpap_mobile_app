import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ContactPageModule} from '../contact/contact.module';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/Customer';

@Component({
    selector: 'app-delete-acc',
    templateUrl: './delete-acc.page.html',
    styleUrls: ['./delete-acc.page.scss'],
})
export class DeleteAccPage implements OnInit {

    customer : Customer;
    customerAccounts : Customer[] = [];

    constructor(private modalController: ModalController,
                private navCtrl: NavController,
                private userService : UserService) {
    }

    ngOnInit() {
        this.customer = this.userService.getCustomer();
    }


    async createContact() {
        const modal = await this.modalController.create({
            component: ContactPageModule,
            cssClass: 'modal-pop',
            backdropDismiss: true
        });
        return await modal.present();
    }

    deleteAcc() {
        console.log("A l'entrée je vaut " + this.customerAccounts.forEach(value => value.name));
        this.userService.removeCustomer(this.customer);
        this.customerAccounts = this.userService.getAccounts();
        
        if (this.customerAccounts != []) {
            console.log("Je suis pas vide");
            this.navCtrl.navigateRoot(['/acc-choice']);
        } else {
            console.log("Je suis vide");
            this.navCtrl.navigateRoot(['/login']);
            
        }
        console.log("A la sortie je vaut " + this.customerAccounts.forEach(value => value.name));
        
    }


}
