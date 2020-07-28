import {Injectable} from '@angular/core';
import {Article} from "../models/Article";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private article: Article; // certainement a modifier en OrderLine pour toi Adrien !
    constructor() {
    }

    setArticle(article: Article) {
        this.article = article;
    }

    getArticle() {
        return this.article;
    }
}
