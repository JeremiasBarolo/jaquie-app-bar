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





@NgModule({
  declarations: [
    AdminComponent,
    InicioComponent,
    TipoArticulosComponent,
    MaestroArticulosComponent,
    DisponibilidadComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
