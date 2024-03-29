import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin.component';
import { TipoArticulosComponent } from './tipo-articulos/tipo-articulos.component';
import { MaestroArticulosComponent } from './maestro-articulos/maestro-articulos.component';
import { DisponibilidadComponent } from './disponibilidad/disponibilidad.component';
import { RecetasComponent } from './recetas/recetas.component';
import { CrearEditarComponent } from './recetas/crear-editar/crear-editar.component';
import { PedidoStockComponent } from './pedido-stock/pedido-stock.component';
import { PedidoProduccionComponent } from './pedido-produccion/pedido-produccion.component';
import { CrearEditarPedidoProduccionComponent } from './pedido-produccion/crear-editar-pedido-produccion/crear-editar-pedido-produccion.component';
import { MesasComponent } from './mesas/mesas.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';





const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'inicio', component: InicioComponent},
      { path: 'padrones', component: TipoArticulosComponent},
      { path: 'maestro', component: MaestroArticulosComponent},
      { path: 'disponibilidad', component: DisponibilidadComponent},
      { path: 'recetas', component: RecetasComponent},
      { path: 'recetas/crear-editar', component: CrearEditarComponent},
      { path: 'recetas/crear-editar/:id', component: CrearEditarComponent},
      { path: 'pedido-stock', component: PedidoStockComponent},
      { path: 'pedido-produccion', component: PedidoProduccionComponent},
      { path: 'pedido-produccion/crear-editar', component: CrearEditarPedidoProduccionComponent},
      { path: 'pedido-produccion/crear-editar/:id', component: CrearEditarPedidoProduccionComponent},
      { path: 'estadisticas', component: EstadisticaComponent},
      { path: 'mesas', component: MesasComponent},
      { path: '**', redirectTo: 'inicio' },
    
    ]

  }

    


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),


  ],

  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
