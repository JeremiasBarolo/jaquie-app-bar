import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  login(userData:any): Observable<any> {
    console.log(userData);
    
    return this.http.post<any>(`${this.apiUrl}/login`, userData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken && decodedToken.rol === 'ADMIN';
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
