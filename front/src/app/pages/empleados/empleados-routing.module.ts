import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { MesasEmpleadosComponent } from './mesas-empleados/mesas-empleados.component';
import { PedidoProduccionEmpleadosComponent } from './pedido-produccion-empleados/pedido-produccion-empleados.component';
import { DisponibilidadEmpleadosComponent } from './disponibilidad-empleados/disponibilidad-empleados.component';
import { PedidoStockEmpleadosComponent } from './pedido-stock-empleados/pedido-stock-empleados.component';
import { CrearPedidoProduccionEmpleadosComponent } from './pedido-produccion-empleados/crear-pedido-produccion-empleados/crear-pedido-produccion-empleados.component';
import { ConsultaDisponibilidadEmpleadosComponent } from '../../shared/consulta-disponibilidad-empleados/consulta-disponibilidad-empleados.component';



const routes: Routes = [

  {path: '', component: EmpleadosComponent,
    children: [
  { path: 'inicio', component: MesasEmpleadosComponent },
  { path: 'mesas', component: MesasEmpleadosComponent },
  { path: 'pedido-produccion', component: PedidoProduccionEmpleadosComponent },
  { path: 'pedido-produccion/crear-editar', component: CrearPedidoProduccionEmpleadosComponent},
  { path: 'pedido-produccion/crear-editar/:id', component: CrearPedidoProduccionEmpleadosComponent},
  { path: 'pedido-stock', component: PedidoStockEmpleadosComponent },
  { path: 'disponibilidad', component: DisponibilidadEmpleadosComponent },
  { path: 'stock-disponible', component: ConsultaDisponibilidadEmpleadosComponent},
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
