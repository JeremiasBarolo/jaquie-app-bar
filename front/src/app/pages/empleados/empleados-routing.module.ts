import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioEmpleadosComponent } from './inicio-empleados/inicio-empleados.component';


const routes: Routes = [
  { path: '', component: InicioEmpleadosComponent },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
