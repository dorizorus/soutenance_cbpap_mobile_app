import {Customer} from './Customer';
import {OrderLine} from './OrderLine';

export class Order {

    orderNumber: string;
    customer: Customer;
    orderLines: OrderLine[];
    orderDate: Date;
    isCancelled?: boolean;
}
