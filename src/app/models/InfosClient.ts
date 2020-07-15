import { Client } from 'appli_mobile_cbpapiers/src/app/models/Client';
import { Ville } from './Ville';

export class InfosClient {
    id : number;
    email : string;
    mdp : string;
    client : Client;
    ville: Ville;
}