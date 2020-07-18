import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    /* {   
    path: '',
    // redirectTo : 'login', Login déconne car la route pour accéder au tabs ne marche pas
    redirectTo : 'nav', // La redirection vers nav déconne aussi.
    pathMatch : 'full'

    },*/
    { // Actuellement on se sert du rooting de tabs (nav) ici pour tout démarrer
        path: '',
        loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
      path: 'single-commande',
      loadChildren: () => import('./pages/single-commande/single-commande.module').then( m => m.SingleCommandePageModule)
    },
    {
      path : 'settings',
      loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
    },  {
    path: 'panier',
    loadChildren: () => import('./pages/panier/panier.module').then( m => m.PanierPageModule)
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
