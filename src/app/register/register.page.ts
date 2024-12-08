import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'; // Importando o Router

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';  // Alterado de 'name' para 'username'
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Função de registro
  register() {
    
    const userData = {
      username: this.username,  // Alterado para 'username'
      email: this.email,
      password: this.password,
    };


    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Preencha todos os campos';           
    } else { this.authService.register(userData).subscribe({
      next: () => {
        console.log('Usuário cadastrado com sucesso!');
        // Após o cadastro bem-sucedido, redireciona para a página de login
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Usuário já cadastrado!';
        console.error(error);
      },
    });}
  
  }

  
  goToLogin() {
    // Navega para a página de login
    this.router.navigate(['/login']);
  }
}
