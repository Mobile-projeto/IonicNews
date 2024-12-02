// tab3.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user: any = null;  // Variável para armazenar as informações do usuário

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  // Função que carrega os dados do usuário logado
  loadUserData() {
    const userData = this.authService.getUserData();  // Recupera os dados do usuário
    if (userData) {
      this.user = userData;
    } else {
      // Caso o usuário não esteja autenticado ou sem dados, redireciona para o login
      this.router.navigate(['/login']);
    }
  }

  // Função para editar perfil (pode ser futuramente implementada)
  editProfile() {
    this.router.navigate(['/edit-profile']);  // Redireciona para a página de edição de perfil
  }
}
