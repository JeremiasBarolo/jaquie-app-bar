import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin.component';
import { TipoArticulosComponent } from './tipo-articulos/tipo-articulos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaestroArticulosComponent } from './maestro-articulos/maestro-articulos.component';
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { RecetasComponent } from './recetas/recetas.component';
import { CrearEditarComponent } from './recetas/crear-editar/crear-editar.component';
import { PedidoStockComponent } from './pedido-stock/pedido-stock.component';
import { PedidoProduccionComponent } from './pedido-produccion/pedido-produccion.component';
import { CrearEditarPedidoProduccionComponent } from './pedido-produccion/crear-editar-pedido-produccion/crear-editar-pedido-produccion.component';
import { MesasComponent } from './mesas/mesas.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TableModule } from 'primeng/table';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TipoFormasPagoComponent } from './tipo-formas-pago/tipo-formas-pago.component';







@NgModule({
  declarations: [
    AdminComponent,
    InicioComponent,
    TipoArticulosComponent,
    MaestroArticulosComponent,
    DisponibilidadComponent,
    RecetasComponent,
    CrearEditarComponent,
    PedidoStockComponent,
    PedidoProduccionComponent,
    CrearEditarPedidoProduccionComponent,
    MesasComponent,
    EstadisticaComponent,
    UsuariosComponent,
    TipoFormasPagoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    TableModule

  ]
})
export class AdminModule { }
