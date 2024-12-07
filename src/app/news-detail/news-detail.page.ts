import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';  // Importando o SocialSharing

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage {
  article: any;

  constructor(
    private router: Router,
    private socialSharing: SocialSharing  // Injetando o SocialSharing
  ) {
    const navState = this.router.getCurrentNavigation()?.extras.state;
    if (navState) {
      this.article = navState['article'];
    }
  }

  // Função para compartilhar o artigo
  shareArticle() {
    const message = `${this.article.title}\n\nLeia mais em: ${this.article.url}`;
    const subject = 'Confira esta notícia!';
    const url = this.article.url;
  
    this.socialSharing.share(message, subject, undefined, url).then(() => {
      console.log('Notícia compartilhada com sucesso!');
    }).catch((error) => {
      console.error('Erro ao compartilhar notícia:', error);
    });
  }
}
