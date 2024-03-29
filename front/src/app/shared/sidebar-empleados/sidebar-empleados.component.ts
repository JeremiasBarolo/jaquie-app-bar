import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-empleados',
  templateUrl: './sidebar-empleados.component.html',
  styleUrl: './sidebar-empleados.component.css'
})
export class SidebarEmpleadosComponent {
  constructor( private router: Router) { }

    redirectTo(route:string){ {
      this.router.navigate([route]);
    }
  }
}
