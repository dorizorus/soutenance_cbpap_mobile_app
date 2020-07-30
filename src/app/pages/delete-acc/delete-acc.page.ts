import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {ContactPageModule} from '../contact/contact.module';
import {UserService} from 'src/app/services/user.service';
import {Customer} from 'src/app/models/Customer';
import {Router} from "@angular/router";

@Component({
    selector: 'app-delete-acc',
    templateUrl: './delete-acc.page.html',
    styleUrls: ['./delete-acc.page.scss'],
})
export class DeleteAccPage implements OnInit {

    customer: Customer;
    error:string;
    password:string;

    constructor(private modalController: ModalController,
                private userService: UserService,
                private router:Router) {
    }

    ngOnInit() {
        this.customer = this.userService.getCustomer();
    }

    deleteAcc() {
        // recupere un msg d'erreur si invalid, sinon un account
        let res = this.userService.getUserValidity(this.customer.name,this.password);
        if(res == false)
            this.error = "Mauvais mot de passe / identifiant";
        else{
            this.userService.removeCustomer(res);
            if (this.userService.getAccounts().length != 0)
                this.router.navigateByUrl('/acc-choice');
            else
                this.router.navigateByUrl('/login');
        }
    }
}
