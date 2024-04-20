import { Component, OnInit } from '@angular/core';
import { MaestroArticulosService } from '../../services/maestro-articulos.service';
import { DisponibilidadArticulosService } from '../../services/disponibilidad-articulos.service';
import { RecetasService } from '../../services/recetas.service';
import { BebidasService } from '../../services/bebidas.service';

@Component({
  selector: 'app-consulta-disponibilidad-empleados',
  templateUrl: './consulta-disponibilidad-empleados.component.html',
  styleUrl: './consulta-disponibilidad-empleados.component.css'
})
export class ConsultaDisponibilidadEmpleadosComponent {
  breadcrumbItems: string[] = ['Stock Disponible'];
  maestros: any[] = [];
  disponibilidades: any[] = [];
  recetas: any[] = [];
  bebidas:any[] = []
  productos:any[] = []
  ProductosElaborados: any[] = [];
  BebidasStock: any[] = [];
  filteredProductos: any[] = [];
  filteredBebidas: any[] = [];
  

  constructor(
    private maestroService: MaestroArticulosService,
    private disponibilidadService: DisponibilidadArticulosService,
    private recetasService: RecetasService,
    private bebidasService: BebidasService
  ) { }


  ngOnInit(): void {
    this.loadAllEntities();
    
    
    
  }

  loadAllEntities(){
    this.maestroService.getAll().subscribe((data: any) => {
      
      
      this.maestros.push(...data);
      this.calcularRecetas(this.maestros);
    });

    this.bebidasService.getAll().subscribe((data: any) => {
      this.bebidas.push(...data)
      this.calcularBebidas(this.bebidas)
    });

    
  }

  calcularRecetas(maestros: any[]) {
    this.productos = []; 
    maestros.map((element: any) => {
      if (element.tipo_articulo.description === 'Productos Elaborados') {
        this.productos.push(element);
      }
    });
    
    this.productos.forEach((productoElaborado: any) => {
      const cantidadMaxima = this.calcularCantidadMaximaProductoElaborado(productoElaborado);
      this.ProductosElaborados.push({
        id: productoElaborado.id,
        name: productoElaborado.descripcion,
        cantidadMaxima: cantidadMaxima,
      })
    })

    this.filteredProductos = [...this.ProductosElaborados]
    


  }




  calcularBebidas(bebidas: any[]){  
    this.bebidasService.create({traerStock:true}).subscribe((data: any) => {
      this.BebidasStock.push(...data)
      this.filteredBebidas = [...this.BebidasStock]
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

calcularCantidadExactaBebida(componentes:any[]){
  let componentes_exactos: any[] = []


  componentes.map(async receta => {
    let alto = receta.cantidadMaxima * receta.cantidad
    let total = alto / 100

    let cant_principal = total / 1000
    let cant_principal_exacta = cant_principal 

    componentes_exactos.push({
      id: receta.id,
      cantidad: cant_principal_exacta,
      cantidadMaxima: receta.cantidadMaxima,
    })
  
  })

  return componentes_exactos


}

traerComponentesDeBebida(bebida:any ){

  let componentes = []
  

  for (const key of ['primerComponente', 'segundoComponente', 'tercerComponente', 'cuartoComponente', 'quintoComponente']) {
    if (bebida[key] !== null && bebida[`${key}Cantidad`] !== null) {
      componentes.push({
        id: bebida[key],
        cantidad: bebida[`${key}Cantidad`],
        cantidadMaxima:bebida.cantidadTotalRecipiente
      });
    }
  }

  return componentes
}


applyFilterProductos(event: any): void {
  const value = event.target.value;
  
  this.filteredProductos = this.ProductosElaborados.filter(insumo => {
    return insumo.name.toLowerCase().includes(value.toLowerCase());
  });
}

applyFilterBebidas(event: any): void {
  const value = event.target.value;
  
  this.filteredBebidas = this.BebidasStock.filter(insumo => {
    return insumo.name.toLowerCase().includes(value.toLowerCase());
  });
}
}
