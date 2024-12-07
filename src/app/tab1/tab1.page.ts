import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { Router } from '@angular/router';
import { CacheService } from '../services/cache.service';
import { TimeTrackerService } from '../services/time-tracker.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {
  data: any[] = []; // Dados das notícias
  selectedCategory: string = 'all'; // Categoria selecionada, valor inicial "all" para mostrar todas as notícias

  constructor(
    public getdata: GetdataService,
    private router: Router,
    private cacheService: CacheService,
    private timeTrackerService: TimeTrackerService // Serviço de rastreamento de tempo
  ) {}

  ngOnInit() {
    this.loadNews(); // Carrega as notícias ao iniciar
  }

  ionViewWillEnter() {
    // Começa a rastrear a categoria ao entrar na aba
    this.timeTrackerService.startTracking(this.selectedCategory);
  }

  ionViewWillLeave() {
    // Para o rastreamento ao sair da aba
    this.timeTrackerService.stopTracking();
  }

  ngOnDestroy() {
    // Garantia de que o rastreamento será interrompido se o componente for destruído
    this.timeTrackerService.stopTracking();
  }

  // Carregar notícias com base na categoria selecionada
  loadNews() {
    const cachedData = this.cacheService.getFromCache(this.selectedCategory);
    if (cachedData) {
      this.data = cachedData;
      console.log('Dados carregados do cache:', this.data);
    } else {
      this.getdata.doGet(this.selectedCategory).subscribe((res) => {
        this.data = res.data.articles;
        console.log('Dados carregados da API:', this.data);
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
    this.timeTrackerService.stopTracking(); // Finaliza o rastreamento anterior
    this.selectedCategory = this.selectedCategory; // Atualiza a categoria
    this.timeTrackerService.startTracking(this.selectedCategory); // Inicia o rastreamento para a nova categoria
    this.loadNews(); // Recarrega as notícias
  }

  // Abre a página de detalhes para o artigo
  openArticleDetails(article: any) {
    this.router.navigate(['/news-detail'], { state: { article } });
  }
}
