import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  favorites: any[] = [];  // Lista de favoritos

  constructor(private getdata: GetdataService) {}

  ngOnInit() {
    // Inscreve-se no Observable de favoritos para que a página seja atualizada automaticamente
    this.getdata.favorites$.subscribe(favorites => {
      this.favorites = favorites;
      console.log('Favoritos atualizados na Tab2:', this.favorites);
    });
  }

  // Alterna o estado de favorito para um artigo
  toggleFavorite(article: any) {
    if (this.getdata.isFavorite(article)) {
      this.getdata.removeFavorite(article); // Remove dos favoritos
    } else {
      this.getdata.addFavorite(article); // Adiciona aos favoritos
    }
  }

  // Verifica se o artigo está na lista de favoritos
  isFavorite(article: any): boolean {
    return this.getdata.isFavorite(article);
  }
}
