import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarEmpleadosComponent } from './sidebar-empleados/sidebar-empleados.component';
import { TitleEmpleadosComponent } from './title-empleados/title-empleados.component';




@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SidebarEmpleadosComponent,
    TitleEmpleadosComponent

  ],
  imports: [
    CommonModule,

  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SidebarEmpleadosComponent,
    TitleEmpleadosComponent
  ]
})
export class SharedModule { }
