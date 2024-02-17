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
