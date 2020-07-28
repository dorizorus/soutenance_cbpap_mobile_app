import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TotalService {

    private total: number;

    constructor() {
    }

    // transfère le montant total du cart (utilisé dans la modal ValidationCom)
    setTotal(total: number) {
        this.total = total;
    }

    getTotal() {
        return this.total;
    }
}
