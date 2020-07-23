import {Client} from './Client';
import {OrderLine} from './OrderLine';

export class Commande {

    orderNumber: string;
    customer: Client;
    orderLines: OrderLine[];
    dateCommande: Date;
}
