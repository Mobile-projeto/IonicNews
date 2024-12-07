// src/app/services/cache.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {

  constructor() {}

  // Verifica se há dados armazenados no cache (localStorage)
  getFromCache(key: string): any {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      return JSON.parse(cachedData); // Retorna os dados em formato de objeto
    }
    return null; // Caso não exista no cache
  }

  // Armazena dados no cache (localStorage)
  saveToCache(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data)); // Armazena os dados como string JSON
  }

  // Limpa o cache para uma chave específica
  clearCache(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpa todo o cache
  clearAllCache(): void {
    localStorage.clear();
  }

  
}
