import {Injectable} from '@angular/core';
import {Customer} from '../models/Customer';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    customer: Customer;
    customerAccounts: Customer[];

    constructor() {
    }

    setCustomer(client: Customer) {
        this.customer = client;
    }

    getCustomer(): Customer {
        return this.customer;
    }

    setCustomerAccounts(comptes: Customer[]) {
        this.customerAccounts = comptes;
    }

    getCustomerAccounts(): Customer[] {
        return this.customerAccounts;
    }

}
