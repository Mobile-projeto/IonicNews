import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';
import { from, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {

  private favoritesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.getFavorites());
  favorites$ = this.favoritesSubject.asObservable(); // Torna a lista observável

  constructor() {}

  // Atualizando o método para aceitar uma categoria
  doGet(category: string = 'all') {
    let url = 'https://newsapi.org/v2/everything?q=${q}&sortBy=publishedAt&language=pt&apiKey=833d2d44a59f4441b7b54fc0dbfb58f8';
    if (category && category !== 'all') {
      url = `https://newsapi.org/v2/everything?q=${category}&sortBy=publishedAt&language=pt&apiKey=833d2d44a59f4441b7b54fc0dbfb58f8`;
    }


    console.log('URL da requisição:', url);

    const options = {
      url: url,
    };

    return from(Http.get(options)); // Realiza a requisição HTTP
  }

  // Método para adicionar aos favoritos
  addFavorite(article: any) {
    let favorites = this.getFavorites();
    if (!favorites.some(fav => fav.title === article.title)) {
      favorites.push(article);
      this.updateFavorites(favorites);  // Atualiza o BehaviorSubject
      console.log('Favorito adicionado:', article);
    } else {
      console.log('Artigo já está nos favoritos:', article);
    }
  }

  // Método para remover dos favoritos
  removeFavorite(article: any) {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav.title !== article.title);
    this.updateFavorites(favorites);  // Atualiza o BehaviorSubject
    console.log('Artigo removido dos favoritos:', article);
  }

  // Método para verificar se o artigo está nos favoritos
  isFavorite(article: any): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.title === article.title);
  }

  // Método para obter os favoritos do localStorage
  getFavorites(): any[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  // Atualiza a lista de favoritos no BehaviorSubject
  private updateFavorites(favorites: any[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));  // Armazena no localStorage
    this.favoritesSubject.next(favorites);  // Atualiza o BehaviorSubject
  }
}
