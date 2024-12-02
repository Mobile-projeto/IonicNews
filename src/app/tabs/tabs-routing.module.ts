import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
      },
      {
        path: '',
        redirectTo: 'tab1', // Redireciona para a aba 'tab1' dentro de 'tabs'
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '', // Rota principal sem prefixo
    redirectTo: 'tabs', // Redireciona para 'tabs'
    pathMatch: 'full',
  },
  {
    path: '**', // Rota coringa para lidar com erros de rota
    redirectTo: 'tabs', // Redireciona para 'tabs' em caso de erro
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
