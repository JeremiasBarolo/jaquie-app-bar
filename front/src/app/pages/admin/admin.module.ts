import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin.component';



@NgModule({
  declarations: [
    AdminComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
