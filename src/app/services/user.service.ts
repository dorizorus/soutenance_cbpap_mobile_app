import { Injectable } from '@angular/core';
import { Client } from '../models/Client';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  client : Client;

  constructor() { }



setClient(client : Client) {
  this.client = client;
  console.log("CLient" + this.client.name + " a été enregistré")
}

getClient(): Client {
  console.log("Le client" + this.client.name + " va être envoyé");
  return this.client;
}

}
