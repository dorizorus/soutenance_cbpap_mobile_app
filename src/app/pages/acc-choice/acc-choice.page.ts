import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserService} from 'src/app/services/user.service';
import {Customer} from 'src/app/models/Customer';
import {F_COMPTET} from "../../models/JSON/F_COMPTET";

@Component({
    selector: 'app-choix-compte',
    templateUrl: './acc-choice.page.html',
    styleUrls: ['./acc-choice.page.scss'],
})
export class AccChoicePage implements OnInit {

    accounts: F_COMPTET[];
    customer: F_COMPTET;

    constructor(private navCtrl: NavController,
                private userService: UserService) {
    }

    ngOnInit() {
        // susbscribe à tout changement dans la liste de comptes
        this.userService.activeF_COMPTET$.subscribe(data => {
            this.customer = data;
        });
        this.userService.f_COMPTETAccounts$.subscribe(data => {
            this.accounts = data;
        });
    }

    selectAccountAndGoToArticles(customer: F_COMPTET) {
        this.userService.setActiveF_COMPTET(customer);
        this.navCtrl.navigateBack(['/nav/article']);
    }

    // on indique simplement le compte que l'on va récupérer dans la page des options
    goToSettings(compte: F_COMPTET) {
        this.userService.setActiveF_COMPTET(compte);
        this.navCtrl.navigateForward(['/acc-choice/settings']);
    }

    goToAddAccount() {
        this.navCtrl.navigateForward(['/acc-choice/add-acc']);
    }
}
