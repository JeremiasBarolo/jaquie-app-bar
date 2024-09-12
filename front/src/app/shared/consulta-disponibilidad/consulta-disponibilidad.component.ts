import { Component, OnInit } from '@angular/core';
import { MaestroArticulosService } from '../../services/maestro-articulos.service';
import { BebidasService } from '../../services/bebidas.service';
import { DisponibilidadArticulosService } from '../../services/disponibilidad-articulos.service';

@Component({
  selector: 'app-consulta-disponibilidad',
  templateUrl: './consulta-disponibilidad.component.html',
  styleUrls: ['./consulta-disponibilidad.component.css']
})
export class ConsultaDisponibilidadComponent implements OnInit {
  breadcrumbItems: string[] = ['Stock Disponible', 'Inicio', 'Stock Disponible'];
  maestros: any[] = [];
  bebidas: any[] = [];
  productos: any[] = [];
  ProductosElaborados: any[] = [];
  BebidasStock: any[] = [];
  filteredData: any[] = [];
  disponibilidad: any[]=[];
  listDisponibilidad: any[] = [];
  allData: any[] = [];

  constructor(
    private maestroService: MaestroArticulosService,
    private bebidasService: BebidasService,
    private disponibilidadService: DisponibilidadArticulosService
  ) { }

  ngOnInit(): void {
    this.loadAllEntities();
    
  }

  loadAllEntities() {
    this.maestroService.getAll().subscribe((data: any) => {
      this.maestros = data;
      this.calcularRecetas(this.maestros);
    });

    this.bebidasService.getAll().subscribe((data: any) => {
      this.bebidas = data;
      this.calcularBebidas(this.bebidas);
    });

    this.disponibilidadService.getAll().subscribe((data: any) => {
      data.map( (element: { maestro_articulo: { tipoId: number; }; }) =>{
        if(element.maestro_articulo.tipoId == 2){
          this.disponibilidad.push(element) 
        }
      })
      this.calcularComidas(this.disponibilidad);
    });

    this.allData = [...this.ProductosElaborados];
    this.filteredData = [...this.allData];
  }

  calcularRecetas(maestros: any[]) {
    this.productos = maestros.filter((element: any) => element.tipo_articulo.description === 'Productos Elaborados');

    this.ProductosElaborados = this.productos.map((productoElaborado: any) => {
      const cantidadMaxima = this.calcularCantidadMaximaProductoElaborado(productoElaborado);
      return {
        id: productoElaborado.id,
        name: productoElaborado.descripcion,
        cantidadMaxima: cantidadMaxima,
        tipo: 'Producto Elaborado'
      };
    });

    this.allData = [...this.ProductosElaborados];
    this.filteredData = [...this.allData];
  }

  calcularBebidas(bebidas: any[]) {
    this.bebidasService.create({traerStock:true}).subscribe((data: any) => {
      this.BebidasStock.push(...data)
      this.allData = [...this.allData, ...this.BebidasStock];
      this.filteredData = [...this.allData]
    })

  }

  calcularCantidadMaximaProductoElaborado(productoElaborado: any): number {
    let cantidadMaxima = Infinity;
    for (const receta of productoElaborado.receta) {
      const disponibilidad = receta.disponibilidad_articulo;
      if (disponibilidad && disponibilidad.cant_disponible !== null) {
        const cantidadNecesaria = receta.cant_necesaria;
        const cantidadDisponible = disponibilidad.cant_disponible;
        const cantidadPosible = Math.floor(cantidadDisponible / cantidadNecesaria);
        cantidadMaxima = Math.min(cantidadMaxima, cantidadPosible);
      } else {
        cantidadMaxima = 0;
        break;
      }
    }
    return cantidadMaxima;
  }


  calcularComidas(disponibilidad:any){
    this.disponibilidad = disponibilidad.map((element: { id: any; maestro_articulo: { descripcion: any; }; cant_disponible: any; }) => {
      return {
        id: element.id,
        name: element.maestro_articulo.descripcion,
        cantidadMaxima: element.cant_disponible,
        tipo: 'Comida'
      }
    })
    this.allData = [...this.allData, ...this.disponibilidad];
    this.filteredData = [...this.allData];
  }

  

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredData = this.allData.filter(disponible => {
      return disponible.name.toLowerCase().includes(value.toLowerCase());
    });
  }
}
