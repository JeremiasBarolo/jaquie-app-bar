import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarEmpleadosComponent } from './sidebar-empleados/sidebar-empleados.component';
import { TitleEmpleadosComponent } from './title-empleados/title-empleados.component';
import { ConsultaDisponibilidadComponent } from './consulta-disponibilidad/consulta-disponibilidad.component';
import { TableModule } from 'primeng/table';
import { ConsultaDisponibilidadEmpleadosComponent } from './consulta-disponibilidad-empleados/consulta-disponibilidad-empleados.component';





@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SidebarEmpleadosComponent,
    TitleEmpleadosComponent,
    ConsultaDisponibilidadComponent,
    ConsultaDisponibilidadEmpleadosComponent,


  ],
  imports: [
    CommonModule,
    TableModule
    

  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SidebarEmpleadosComponent,
    TitleEmpleadosComponent,
    ConsultaDisponibilidadComponent,
    ConsultaDisponibilidadEmpleadosComponent
  ]
})
export class SharedModule { }
