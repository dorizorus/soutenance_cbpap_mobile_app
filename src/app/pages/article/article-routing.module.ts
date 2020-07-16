import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlePage } from './article.page';

const routes: Routes = [
  {
    path: '',
    component:ArticlePage
  },
  {
    path: 'single-article',
    loadChildren: () => import('../single-article/single-article.module').then(m => m.SingleArticlePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesPageRoutingModule {}
