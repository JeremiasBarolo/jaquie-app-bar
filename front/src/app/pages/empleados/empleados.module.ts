import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { InicioEmpleadosComponent } from './inicio-empleados/inicio-empleados.component';


@NgModule({
  declarations: [

  
    InicioEmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    SharedModule
  ]
})
export class EmpleadosModule { }
