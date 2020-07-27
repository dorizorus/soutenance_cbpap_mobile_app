import { Injectable } from '@angular/core';
import { Customer } from '../models/Customer';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  client : Customer;
  comptes : Customer[];

  constructor() { }



setClient(client : Customer) {
  this.client = client;
  console.log("CLient" + this.client.name + " a été enregistré")
}

getClient(): Customer {
  console.log("Le client" + this.client.name + " va être envoyé");
  return this.client;
}

setComptesClients(comptes : Customer[]) {
  this.comptes = comptes;
}

getComptesClients() : Customer[] {
  return this.comptes;
}

}
