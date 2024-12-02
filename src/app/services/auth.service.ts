import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // URL do backend
  private tokenKey = 'jwt_token';  // Chave para armazenar o token JWT
  private userKey = 'user_data';  // Chave para armazenar os dados do usuário
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient, private router: Router) {}

  // Função de registro de usuário
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData).pipe(
      catchError((error) => {
        console.error('Erro no cadastro:', error);
        if (error.error) {
          return throwError(() => new Error(error.error?.message || 'Erro desconhecido'));
        } else {
          return throwError(() => new Error('Erro ao conectar com o servidor. Tente novamente.'));
        }
      })
    );
  }

  // Função de login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          this.storeToken(response.token);
          this.storeUserData(response.user);
          this.isLoggedInSubject.next(true);
          this.router.navigate(['/tabs/tab1']);  // Redireciona após login bem-sucedido
        }
      }),
      catchError((error) => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => error);
      })
    );
  }

  // Obter estado de autenticação como Observable
  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // Armazenar o token no LocalStorage
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Obter o token armazenado
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Fazer logout (remover o token e os dados do usuário)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);  // Redireciona para a página de login
  }

  // Armazenar os dados do usuário
  storeUserData(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Recuperar os dados do usuário armazenados
  getUserData(): any {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }
}
