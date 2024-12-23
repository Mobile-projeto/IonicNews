import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailPage } from './news-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NewsDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsDetailPageRoutingModule {}
