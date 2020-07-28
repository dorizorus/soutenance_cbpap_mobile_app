import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsPage} from "./tabs.page";

const routes: Routes = [
    {
        path:'',
        component:TabsPage,
        children:[
            {
                path:'article',
                loadChildren: () => import('../article/article.module').then(m => m.ArticlesPageModule)
            },
            {
                path:'history',
                loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
            },
            {
                path:'',
                redirectTo:'/nav/article',
                pathMatch:'full'
            }
        ]
    },
    {
        path:'',
        redirectTo:'/nav/article',
        pathMatch:'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {
}
