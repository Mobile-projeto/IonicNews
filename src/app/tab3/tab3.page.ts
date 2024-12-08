import { Component } from '@angular/core';
import { TimeTrackerService } from '../services/time-tracker.service';
import { Router } from '@angular/router'; // Importa o Router para navegação

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  categoryTimes: { [category: string]: number } = {};

  constructor(
    private timeTrackerService: TimeTrackerService,
    private router: Router // Injeta o Router para navegação
  ) {}

  // Atualiza os tempos ao entrar na página
  ionViewWillEnter() {
    this.categoryTimes = this.timeTrackerService.getTranslatedTimeSpent();
  }

  // Função para resetar os tempos
  resetTimes() {
    this.timeTrackerService.resetTracking();
    this.categoryTimes = {};
  }

  // Função para navegar para a página About
  goToAbout() {
    this.router.navigate(['/about']); // Navega para a página About
  }
}
