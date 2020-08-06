import {Injectable} from '@angular/core';
import {Article} from '../models/Article';
import {HttpClient} from '@angular/common/http';
import {F_ARTICLE} from '../models/JSON/F_ARTICLE';
import {BehaviorSubject} from "rxjs";
import {F_ARTCLIENT} from '../models/JSON/F_ARTCLIENT';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private article: Article;
    public articles$: BehaviorSubject<F_ARTICLE[]> = new BehaviorSubject<F_ARTICLE[]>([]);
    public articlePrice$: BehaviorSubject<F_ARTCLIENT[]> = new BehaviorSubject<F_ARTCLIENT[]>([]);
    constructor(private http: HttpClient) {
    }

    setArticle(article: Article) {
        this.article = article;
    }

    getArticle() {
        return this.article;
    }

    getF_ARTCLIENT(){
        return this.http.get<F_ARTCLIENT[]>('assets/F_ARTCLIENT.json');
    }

    getF_ARTICLE() {
        return this.http.get<F_ARTICLE[]>('assets/F_ARTICLE.json');
    }

}
