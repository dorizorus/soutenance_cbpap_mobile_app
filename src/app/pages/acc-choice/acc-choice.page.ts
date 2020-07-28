import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserService} from 'src/app/services/user.service';
import {Customer} from 'src/app/models/Customer';

@Component({
    selector: 'app-choix-compte',
    templateUrl: './acc-choice.page.html',
    styleUrls: ['./acc-choice.page.scss'],
})
export class AccChoicePage implements OnInit {

    client: Customer;

    constructor(private navCtrl: NavController,
                private userService: UserService) {
    }

    ngOnInit() {
        this.client = this.userService.getCustomer()
    }

    goToSettings() {
        this.navCtrl.navigateForward(['/acc-choice/settings']);
    }
}
