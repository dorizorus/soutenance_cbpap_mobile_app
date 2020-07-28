import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.page.html',
    styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

    // inutilise puisque pas possible sans back
    constructor() {
    }

    ngOnInit() {
    }

    onClick() {
        console.log("test");
    }

}
