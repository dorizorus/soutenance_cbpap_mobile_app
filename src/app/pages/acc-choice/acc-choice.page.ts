import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserService} from 'src/app/services/user.service';
import {Customer} from 'src/app/models/Customer';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-choix-compte',
    templateUrl: './acc-choice.page.html',
    styleUrls: ['./acc-choice.page.scss'],
})
export class AccChoicePage implements OnInit, OnDestroy {

    accounts: Customer[];
    customer: Customer;

    activeCustomerSub: Subscription;
    customerAccountsSub: Subscription;

    constructor(private navCtrl: NavController,
                private userService: UserService) {
    }

    ngOnInit() {
        // susbscribe à tout changement dans la liste de comptes
        this.activeCustomerSub = this.userService.activeCustomer$.subscribe(data => {
            this.customer = data;
        });
        this.customerAccountsSub = this.userService.customerAccounts$.subscribe(data => {
            this.accounts = data;
        });
    }

    selectAccountAndGoToArticles(customer: Customer) {
        this.userService.setActiveCustomer(customer);
        this.navCtrl.navigateBack(['/nav/article']);
    }

    // on indique simplement le compte que l'on va récupérer dans la page des options
    goToSettings(compte: Customer) {
        this.userService.setActiveCustomer(compte);
        this.navCtrl.navigateForward(['/acc-choice/settings']);
    }

    goToAddAccount() {
        this.navCtrl.navigateForward(['/acc-choice/add-acc']);
    }

    ngOnDestroy(): void {
        this.customerAccountsSub.unsubscribe();
        this.activeCustomerSub.unsubscribe();
    }
}
