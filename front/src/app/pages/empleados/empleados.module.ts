import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { EmpleadosComponent } from './empleados.component';
import { MesasEmpleadosComponent } from './mesas-empleados/mesas-empleados.component';
import { DisponibilidadEmpleadosComponent } from './disponibilidad-empleados/disponibilidad-empleados.component';
import { PedidoProduccionEmpleadosComponent } from './pedido-produccion-empleados/pedido-produccion-empleados.component';
import { PedidoStockEmpleadosComponent } from './pedido-stock-empleados/pedido-stock-empleados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'primeng/table';
import { CrearPedidoProduccionEmpleadosComponent } from './pedido-produccion-empleados/crear-pedido-produccion-empleados/crear-pedido-produccion-empleados.component';



@NgModule({
  declarations: [
  EmpleadosComponent,
  MesasEmpleadosComponent,
  DisponibilidadEmpleadosComponent,
  PedidoProduccionEmpleadosComponent,
  PedidoStockEmpleadosComponent,
  CrearPedidoProduccionEmpleadosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    TableModule
  ]
})
export class EmpleadosModule { }
