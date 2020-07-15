import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsPage} from "./tabs.page";

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'article',
                loadChildren: () => import('../article/article.module').then(m => m.ProduitsPageModule)
            },
            {
                path: 'historique',
                loadChildren: () => import('../historique/historique.module').then(m => m.HistoriquePageModule)
            },
            {
                path: 'documents',
                loadChildren: () => import('../documents/documents.module').then(m => m.DocumentsPageModule)
            },
            {
                path:'',
                redirectTo:'/article'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/article',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
