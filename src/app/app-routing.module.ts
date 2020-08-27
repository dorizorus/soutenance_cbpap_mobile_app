import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./security/auth-guard.guard";

const routes: Routes = [
    {
        path: 'nav',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'acc-choice',
        loadChildren: () => import('./pages/acc-choice/acc-choice.module').then(m => m.AccChoicePageModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
