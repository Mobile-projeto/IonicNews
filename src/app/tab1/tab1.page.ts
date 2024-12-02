import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  data: any[] = [];  // Dados das notícias
  selectedCategory: string = 'all';  // Categoria selecionada, valor inicial "all" para mostrar todas as notícias

  constructor(public getdata: GetdataService) {}

  ngOnInit() {
    // Carregar notícias ao iniciar com a categoria "Todos"
    this.loadNews();
  }

  // Carregar notícias com base na categoria selecionada
  loadNews() {
    this.getdata.doGet(this.selectedCategory).subscribe(res => {
      this.data = res.data.articles;
      console.log(this.data);  // Verificando as notícias retornadas
    });
  }

  // Função para adicionar o artigo aos favoritos
  addFavorite(article: any) {
    if (!this.getdata.isFavorite(article)) {  // Verifica se o artigo já não está nos favoritos
      console.log('Adicionando artigo aos favoritos:', article);
      this.getdata.addFavorite(article);  // Chama o serviço para adicionar aos favoritos
      console.log('Lista de favoritos atualizada:', this.getdata.getFavorites());
    } else {
      console.log('Artigo já está nos favoritos:', article);
    }
  }

  // Verifica se o artigo está na lista de favoritos
  isFavorite(article: any): boolean {
    return this.getdata.isFavorite(article);
  }

  // Filtra as notícias de acordo com a categoria selecionada
  filterNews() {
    this.loadNews();  // Atualiza as notícias ao selecionar uma nova categoria
  }
}
