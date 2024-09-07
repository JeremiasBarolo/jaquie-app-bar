import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';

import { ConsultaDisponibilidadComponent } from './consulta-disponibilidad/consulta-disponibilidad.component';
import { TableModule } from 'primeng/table';
import { VerPdfComponent } from './ver-pdf/ver-pdf.component';






@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    ConsultaDisponibilidadComponent,
    VerPdfComponent,



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
    ConsultaDisponibilidadComponent,
    VerPdfComponent,
  ]
})
export class SharedModule { }
