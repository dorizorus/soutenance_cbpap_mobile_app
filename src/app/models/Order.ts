import {OrderLine} from './OrderLine';
import {Customer} from "./Customer";

export class Order {

    orderNumber: string;
    customer: Customer;
    orderLines: OrderLine[];
    orderDate: Date;
    isCancelled?: boolean;
}
