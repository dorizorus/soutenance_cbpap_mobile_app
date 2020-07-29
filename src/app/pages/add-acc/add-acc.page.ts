import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/Customer';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-acc',
  templateUrl: './add-acc.page.html',
  styleUrls: ['./add-acc.page.scss'],
})
export class AddAccPage implements OnInit {

  constructor(private userService : UserService,
              private navCtrler : NavController) { }

  ngOnInit() {
  }

  addAccountAndRedirect() {
    let customer : Customer = 
            {
                id: '6',
                name: "Au 3 del arte",
                address: "5 rue des pizzaiolo",
                email: "chezmoi@pizzasarl.com",
                password: "458dsqfdkdsqlfkqsd54",
                customerPicture: "assets/icon/devanturePizzaHut.png",
                phoneNumber: "0387254981",
                city:
                    {
                        id: 55,
                        name: "Augny",
                        postalCode: 57000
                    },
                customerFiles: ''

            };
        // on ne va pas utiliser de set mais un systeme d'ajout/suppresion de compte. Ici, il est ajouté
        this.userService.addCustomer(customer);
        this.navCtrler.navigateBack(['/acc-choice']);
  }
}
