import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Importa o Router para navegação
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido');
        this.router.navigate(['/tabs/tab1']);  // Navegar para a página inicial após login
      },
      error: (error) => {
        this.errorMessage = 'Erro ao fazer login.';
        console.error(error);
      },
    });
  }

  goToRegister() {
    // Navega para a página de cadastro
    this.router.navigate(['/register']);
  }
}
