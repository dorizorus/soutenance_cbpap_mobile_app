import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {Customer} from 'src/app/models/Customer';
import {NavController} from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-acc',
    templateUrl: './add-acc.page.html',
    styleUrls: ['./add-acc.page.scss'],
})
export class AddAccPage implements OnInit {

    login: string;
    password: string;
    error: string;

    constructor(private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
    }

/*    addAccountAndRedirect() {
        // recupere un msg d'erreur si invalid, sinon un account
        let res = this.userService.getUserValidity(this.login,this.password);
        if(res == false)
            this.error = "Mauvais mot de passe / identifiant";
        else{
            this.userService.addCustomer(res);
            this.userService.setActiveCustomer(res);
            this.router.navigateByUrl('/acc-choice');
        }
    }*/
}
