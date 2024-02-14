import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { AdminComponent } from './admin.component';





const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'inicio', component: InicioComponent},
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
