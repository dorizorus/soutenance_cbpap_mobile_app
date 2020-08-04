import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/Order';
import {OrderService} from '../../services/order.service';

@Component({
    selector: 'app-historique',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    public history: Order[];

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.history = this.orderService.getOrders();
        // this.history = this.initOrders();
    }

    private initOrders(): Order[] {
        const order1 = {
            orderNumber: 'MOBI1337',
            orderDate: new Date(2018, 8, 22),
            customer: {
                id: '1',
                phoneNumber: '101010',
                name: 'test',
                address: 'somewhere',
                email: '',
                password: '',
                customerPicture: '',
                city:
                    {
                        id: 55,
                        name: "Metz",
                        postalCode: 57000
                    },
                customerFiles: ''
            },
            orderLines: [
                {
                    orderNumber: 'commande1',
                    quantity: 10,
                    article: {
                        reference: 'AL30',
                        family: 'emballage',
                        label: 'rouleau alu + boite distrib',
                        unitPrice: 10,
                        finalPrice: 10,
                        articleImage: {id: 1, image: ''},
                        articleDetails: {id: 1, description: ''}
                    }
                },
                {
                    orderNumber: 'commande1',
                    quantity: 12,
                    article: {
                        reference: 'DP113',
                        family: 'decoration',
                        label: 'lapin coquin',
                        unitPrice: 60,
                        finalPrice: 60,
                        articleImage: {id: 1, image: ''},
                        articleDetails: {id: 1, description: ''}
                    }
                }
            ]
        };
        let order2 = {
            orderNumber: 'mobydick',
            orderDate: new Date(),
            customer: {
                id: '2',
                phoneNumber: '101010222',
                name: 'test2',
                address: 'somewhere2',
                email: '',
                password: '',
                customerPicture: '',
                city:
                    {
                        id: 55,
                        name: "Metz",
                        postalCode: 57000
                    },
                customerFiles: ''
            },
            orderLines: [
                {
                    orderNumber: 'commande2',
                    quantity: 10,
                    article: {
                        reference: 'test',
                        family: 'emballage',
                        label: 'rouleau alu + boite distrib',
                        unitPrice: 15,
                        finalPrice: 15,
                        articleImage: {id: 1, image: ''},
                        articleDetails: {id: 1, description: ''}
                    }
                },
                {
                    orderNumber: 'commande2',
                    quantity: 12,
                    article: {
                        reference: 'GT35',
                        family: 'verre',
                        label: 'gobelet',
                        unitPrice: 12.65,
                        finalPrice: 12.65,
                        articleImage: {id: 1, image: ''},
                        articleDetails: {id: 1, description: ''}
                    }
                }
            ]
        };
        let order3 = {
            orderNumber: 'test',
            orderDate: new Date(),
            customer: {
                id: '2',
                phoneNumber: '101010222',
                name: 'test2',
                address: 'somewhere2',
                email: '',
                password: '',
                customerPicture: '',
                city:
                    {
                        id: 55,
                        name: "Metz",
                        postalCode: 57000
                    },
                customerFiles: ''
            },
            orderLines: [
                {
                    orderNumber: 'commande2',
                    quantity: 1,
                    article: {
                        reference: 'test',
                        family: 'emballage',
                        label: 'rouleau alu + boite distrib',
                        unitPrice: 15,
                        finalPrice: 15,
                        articleImage: {id: 1, image: ''},
                        articleDetails: {id: 1, description: ''}
                    }
                },
                {
                    orderNumber: 'commande2',
                    quantity: 1,
                    article: {
                        reference: 'GT35',
                        family: 'verre',
                        label: 'gobelet',
                        unitPrice: 12.65,
                        finalPrice: 12.65,
                        articleImage: {id: 1, image: ''},
                        articleDetails: {id: 1, description: ''}
                    }
                }
            ]
        };
        return [order1, order2, order3];
    }

    onClickOrder(order: Order) {
        this.orderService.setOrder(order);
    }
}
