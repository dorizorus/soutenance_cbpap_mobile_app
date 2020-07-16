import {Client} from "./Client";
import {OrderLine} from "./OrderLine";

export class Commande{

  orderNumber:string;
  client: Client;
  orderLines: OrderLine[];
}
