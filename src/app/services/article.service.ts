import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {F_ARTICLE} from '../models/JSON/F_ARTICLE';
import {F_ARTCLIENT} from '../models/JSON/F_ARTCLIENT';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {


    constructor(private http: HttpClient) {
    }

    getF_ARTCLIENT(){
        return this.http.get<F_ARTCLIENT[]>('assets/F_ARTCLIENT.json');
    }

    getF_ARTICLE() {
        return this.http.get<F_ARTICLE[]>('assets/F_ARTICLE.json');
    }

}
