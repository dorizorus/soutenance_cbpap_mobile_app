import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-choix-compte',
  templateUrl: './choix-compte.page.html',
  styleUrls: ['./choix-compte.page.scss'],
})
export class ChoixComptePage implements OnInit {

  client : Client;

  constructor(private navCtrl : NavController,
              private userService : UserService) { }

  ngOnInit() {
    this.client = this.userService.getClient()
  }

  toSettings() {
    this.navCtrl.navigateForward(['/choix-compte/settings']);
  }

}
