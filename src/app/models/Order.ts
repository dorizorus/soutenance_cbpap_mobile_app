import {OrderLine} from './OrderLine';
import {F_COMPTET} from "./JSON/F_COMPTET";

export class Order {

    orderNumber: string;
    customer: F_COMPTET;
    orderLines: OrderLine[];
    orderDate: Date;
    isCancelled?: boolean;
}
