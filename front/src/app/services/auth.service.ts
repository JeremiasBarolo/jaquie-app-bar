import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {jwtDecode} from 'jwt-decode'; 
 

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
 


  isAllowed(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      if(decodedToken.rol == 'ADMIN'){
        return true;
      }else{
        return false;
      }
      
    }
    
  }

  

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token); 
    } catch (Error) {
      return null;
    }
  }

  getUserData(): Observable<any> {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return of(decodedToken); 
    }
    return of(null);
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}


