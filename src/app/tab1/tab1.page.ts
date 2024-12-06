import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { Router } from '@angular/router';
import { CacheService } from '../services/cache.service';  // Importando o serviço de cache

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  data: any[] = []; // Dados das notícias
  selectedCategory: string = 'all'; // Categoria selecionada, valor inicial "all" para mostrar todas as notícias

  constructor(
    public getdata: GetdataService, 
    private router: Router,
    private cacheService: CacheService  // Injetando o serviço de cache
  ) {}

  ngOnInit() {
    // Carregar notícias ao iniciar com a categoria "Todos"
    this.loadNews();
  }

  // Carregar notícias com base na categoria selecionada
  loadNews() {
    const cachedData = this.cacheService.getFromCache(this.selectedCategory);  // Verifica se os dados estão no cache
    if (cachedData) {
      // Se os dados estiverem no cache, usa eles diretamente
      this.data = cachedData;
      console.log('Dados carregados do cache:', this.data);
    } else {
      // Se não tiver no cache, faz a requisição à API
      this.getdata.doGet(this.selectedCategory).subscribe(res => {
        this.data = res.data.articles;
        console.log('Dados carregados da API:', this.data);
        
        // Armazenar os dados no cache para as próximas requisições
        this.cacheService.saveToCache(this.selectedCategory, this.data);
      });
    }
  }

  // Função para adicionar o artigo aos favoritos
  addFavorite(article: any) {
    if (!this.getdata.isFavorite(article)) {
      console.log('Adicionando artigo aos favoritos:', article);
      this.getdata.addFavorite(article);
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
    this.loadNews(); // Atualiza as notícias ao selecionar uma nova categoria
  }

  // Abre a página de detalhes para o artigo
  openArticleDetails(article: any) {
    this.router.navigate(['/news-detail'], { state: { article } });
  }
}
