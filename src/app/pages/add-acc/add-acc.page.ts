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
                private navCtrl: NavController) {
    }

    ngOnInit() {
    }

 async addAccountAndRedirect() {
       console.log('in addAccountAndRedirect(), yay');
        if (this.login == '' || this.login == null)

            if(this.password == '' || this.password == null)
                this.error = 'Veuillez entrer un identifiant & mot de passe';

            else
                this.error = 'Veuillez entrer un identifiant';

        else if(this.password == '' || this.password == null)
            this.error = 'Veuillez entrer un mot de passe';

        else {
            await this.userService.getUserValidity(this.login, this.password).then((data) => {
                console.log(data);
                console.log("win");
                this.navCtrl.navigateForward(['/nav/article']);
            }).catch((data) => {
                    this.error = data;
                    console.log("fail");
                }
            );
        }
    }
}
