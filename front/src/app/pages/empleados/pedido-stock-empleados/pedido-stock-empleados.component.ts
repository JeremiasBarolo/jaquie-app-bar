import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoStockService } from '../../../services/pedido-stock.service';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';

@Component({
  selector: 'app-pedido-stock-empleados',
  templateUrl: './pedido-stock-empleados.component.html',
  styleUrl: './pedido-stock-empleados.component.css'
})
export class PedidoStockEmpleadosComponent {
  breadcrumbItems: string[] = ['Pedido de Stock'];
  botonDeshabilitado = false;
  listPedido: any[] = [];
  subtotal: number = 0
  form!: FormGroup;
  cardData: any = {
    name: ''
  }
  DataArticulos: any={
    editar:false
  }
  listMaestro:any[] =[]
  IdsInsumosCantidad: any[] = []
  depositos: any[] = [] 
  selectedDepositoId: number | undefined;
  pedidoNuevo: any

  constructor(
    private pedidoStockService: PedidoStockService,
    private maestroService: MaestroArticulosService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller,
    private fb: FormBuilder,
    


    ) {
      this.form = this.fb.group({
        cant_requerida: ['',Validators.required],
        articuloId: ['',Validators.required],
      });
    }


  ngOnInit(): void {
    this.pedidoStockService.getAll().subscribe(data =>{
      this.listPedido = data
    });

    this.maestroService.getAll().subscribe(maestros => {
      maestros.forEach(maestro => {
        if(maestro.tipo_articulo.description === 'Insumos'){
          this.listMaestro.push(maestro)
        }
      })
      
    })
  }

  editarPedido(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    console.log(this.DataArticulos);
    
    this.form.patchValue({
      articuloId: this.DataArticulos.articuloId,
      cant_requerida: this.DataArticulos.cant_requerida
      
    });
}

  addPedido() {
    this.pedidoNuevo = {
      articuloId: this.form.value.articuloId,
      cant_requerida: this.form.value.cant_requerida,
    }

    if(this.DataArticulos.editar === true){
      this.pedidoStockService.update(this.DataArticulos.id, this.pedidoNuevo).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)
        this.toastr.success('Pedido Actualizado', 'Exito');
      });
     } else{
      try {
        this.pedidoStockService.create(this.pedidoNuevo).subscribe(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600)

          

   
          this.toastr.success('Pedido Creado', 'Exito');
  
        });
        
      } catch (error) {
        console.log(error);
      }

     }
      
  }

  SumarPedido(pedido: any) {
    try {
      this.pedidoStockService.create({...pedido, sumarCantidades: true}).subscribe(() => {
     
        
        
        setTimeout(() => {
          this.router.navigate(['admin/disponibilidad']);
        }, 600)

      
        this.toastr.success('Pedido Creado', 'Exito');

      });
      
    } catch (error) {
      console.log(error);
    }
  }

  

  
showCardDetails(card: any) {  
  this.cardData = card;  
  console.log(this.cardData);
}

updateEntidad(id:number){
  this.router.navigate(['dashboard/pedidos-compra/crear-editar', id]);
}

calcularSubtotal(pedido: any): any {
    let subtotal = 0

     return subtotal += pedido?.cant_requerida * pedido?.maestro_articulo?.costo_unitario;
     
     
};

calcularSubtotalGeneral(): number {
  let subtotalGeneral = 0;
  
  this.listPedido.forEach(item => {
      
      subtotalGeneral += this.calcularSubtotal(item);
  });
  return subtotalGeneral;
}





eliminarPedido(id?: number){
  this.pedidoStockService.delete(id!).subscribe(() => {
    this.toastr.success('Entidad eliminado exitosamente')
    setTimeout(() => {
      window.location.reload();
    }, 600)
    

  })
}
}
