import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {F_COMPTET} from '../../models/JSON/F_COMPTET';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.page.html',
    styleUrls: ['./administration.page.scss'],
})
export class AdministrationPage implements OnInit {

    comptes: F_COMPTET[];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.initClient();
    }


    getClientSearched(ev: any) {
        // on réinitialise la liste d'article a affiché en refaisant appel à la liste originelle
        this.initClient();

        // set la valeur de l'input de la searchbar dans "val". On indique que c'est un input html
        const val = (ev.target as HTMLInputElement).value;

        // si rien n'est mis on affiche tout, sinon on filtre avec ce qui a été inséré
        if (val && val.trim() !== '') {
            this.comptes = this.comptes.filter((client) => {
                return (client.CT_Num.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                    client.CT_EMail.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    initClient() {
        this.userService.getAllF_COMPTETs().subscribe(
            (accounts) => {
                this.comptes = accounts;
            }
        );
    }

}

