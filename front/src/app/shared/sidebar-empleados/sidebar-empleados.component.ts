import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstadisticaService } from '../../services/estadistica.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar-empleados',
  templateUrl: './sidebar-empleados.component.html',
  styleUrl: './sidebar-empleados.component.css'
})
export class SidebarEmpleadosComponent {
  constructor( 
    private router: Router,
    private estadisticaService: EstadisticaService,
    private toastr: ToastrService
  
  ) { }

    redirectTo(route:string){ {
      this.router.navigate([route]);
    }
  }


  cerrarCaja(){
    this.estadisticaService.create({cerrarCaja: true}).subscribe(
      (response) => {
       
        if (response && response.recaudacion !== undefined) {
            this.toastr.success('Caja cerrada exitosamente');
            setTimeout(() => {
                window.location.reload();
            }, 600);
        }
    },
    (error) => {
      console.log(error.error);
        this.toastr.error(error.error.error);
        console.error('Error al cerrar la caja:', error.error);
    });
  }
}
