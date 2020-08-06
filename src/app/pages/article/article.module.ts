import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ArticlePage} from './article.page';
import {ArticlesPageRoutingModule} from "./article-routing.module";
import {ComponentsModule} from "../../header/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ComponentsModule,
        ArticlesPageRoutingModule
    ],
    declarations: [ArticlePage]
})
export class ArticlesPageModule {
}
