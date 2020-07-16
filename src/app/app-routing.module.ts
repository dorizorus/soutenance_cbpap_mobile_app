import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo : 'login',
    pathMatch : 'full'
    // similaire à : loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    //loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
    //loadChildren: './pages/tabs/tabs-routing.module#TabsPageRoutingModule'
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
    // loadChildren: './pages/settings/settings.module#SettingsPageModule'
  },  
  {
    path: 'documents',
    loadChildren: () => import('./pages/documents/documents.module').then( m => m.DocumentsPageModule)
    //loadChildren: './pages/documents/documents.module#DocumentsPageModule'
  },
  {
    path: 'produits',
    loadChildren: () => import('./pages/produits/produits.module').then( m => m.ProduitsPageModule)
    //loadChildren: './pages/documents/documents.module#DocumentsPageModule'
  },  {
    path: 'delete-acc',
    loadChildren: () => import('./pages/delete-acc/delete-acc.module').then( m => m.DeleteAccPageModule)
  }


  /*{
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)

  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
