import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage {
  article: any;

  constructor(private router: Router) {
    const navState = this.router.getCurrentNavigation()?.extras.state;
    if (navState) {
      this.article = navState['article'];
    }
  }
}