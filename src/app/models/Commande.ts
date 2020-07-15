import {Client} from "./Client";
import {OrderLine} from "./OrderLine";

export class Commande{

  id:number;
  client: Client;
  orderLines: OrderLine[];
}
