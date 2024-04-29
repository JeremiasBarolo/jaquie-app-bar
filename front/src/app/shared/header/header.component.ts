import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = '';
  constructor(
    private router: Router
  ) {
  
  }
  logout() {
    // Eliminar el token del encabezado (suponiendo que guardas el token en localStorage)
    localStorage.removeItem('token');
    
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
  
}
