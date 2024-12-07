import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  private trackingCategory: string | null = null;
  private startTime: number = 0;
  private categoryTimes: { [category: string]: number } = {};

  // Inicia o rastreamento de tempo para uma categoria
  startTracking(category: string) {
    if (this.trackingCategory !== category) {
      this.stopTracking();
      this.trackingCategory = category;
      this.startTime = Date.now();
    }
  }

  // Para o rastreamento atual e acumula o tempo gasto
  stopTracking() {
    if (this.trackingCategory) {
      const elapsed = Date.now() - this.startTime;
      this.categoryTimes[this.trackingCategory] =
        (this.categoryTimes[this.trackingCategory] || 0) + elapsed;
      this.trackingCategory = null;
    }
  }

  // Retorna os tempos acumulados por categoria
  getTimeSpent(): { [category: string]: number } {
    // Finaliza qualquer rastreamento em andamento antes de retornar os dados
    this.stopTracking();
    return { ...this.categoryTimes }; // Retorna uma cópia para evitar modificações externas
  }

  // Reseta o rastreamento e os tempos acumulados
  resetTracking() {
    this.stopTracking();
    this.categoryTimes = {};
  }

  getCategoryTranslations(): { [key: string]: string } {
    return {
      all: 'Todos',
      games: 'Jogos',
      technology: 'Tecnologia',
      sports: 'Esportes',
      science: 'Ciência',
      entertainment: 'Entretenimento',
    };
  }
  
  getTranslatedTimeSpent(): { [key: string]: number } {
    const translations = this.getCategoryTranslations();
    const translatedTimes: { [key: string]: number } = {};
    for (const [category, time] of Object.entries(this.categoryTimes)) {
      translatedTimes[translations[category] || category] = time;
    }
    return translatedTimes;
  }
}
