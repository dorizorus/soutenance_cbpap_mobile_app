import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    { // Actuellement on se sert du rooting de tabs (nav) ici pour tout démarrer
        path: 'nav',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
      path: 'choix-compte',
      loadChildren: () => import('./pages/choix-compte/choix-compte.module').then( m => m.ChoixComptePageModule)
    },
    {
      path: 'administration',
      loadChildren: () => import('./pages/administration/administration.module').then( m => m.AdministrationPageModule)
    },
     {
    path : '',
    redirectTo : 'login',
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
