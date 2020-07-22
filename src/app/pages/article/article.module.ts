import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArticlePage} from './article.page';
import {ArticlesPageRoutingModule} from "./article-routing.module";
import {HeaderComponent} from "../../header/header.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ArticlesPageRoutingModule
    ],
    exports: [HeaderComponent],
    declarations: [ArticlePage, HeaderComponent]
})
export class ArticlesPageModule {
}
