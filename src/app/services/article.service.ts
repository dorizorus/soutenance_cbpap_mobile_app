import {Injectable} from '@angular/core';
import {Article} from '../models/Article';
import {HttpClient} from '@angular/common/http';
import {F_ARTICLE} from '../models/JSON/F_ARTICLE';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private article: Article; // certainement a modifier en OrderLine pour toi Adrien !
    private ARTICLES: F_ARTICLE[] = [];
    public Articles$: BehaviorSubject<F_ARTICLE[]> = new BehaviorSubject<F_ARTICLE[]>([]);
    constructor(private http: HttpClient) {
    }

    setArticle(article: Article) {
        this.article = article;
    }

    getArticle() {
        return this.article;
    }

    getF_ARTICLES() {
        this.http.get<F_ARTICLE[]>('assets/F_ARTICLE.json')
            .subscribe(
                (F_ARTICLES) => this.Articles$.next(F_ARTICLES)
            );
    }

}
