import { Ville } from './Ville';
import {Client} from "./Client";

export class InfosClient {
    id : number;
    email : string;
    mdp : string;
    client : Client;
    ville: Ville; 
}
