import { ViewportScroller } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoStockService } from '../../../services/pedido-stock.service';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-pedido-stock',
  templateUrl: './pedido-stock.component.html',
  styleUrl: './pedido-stock.component.css'
})
export class PedidoStockComponent {
  breadcrumbItems: string[] = ['Pedido de Stock','Inicio', 'Pedido de Stock'];
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
  listPedidos: any[] = []
  private destroy$ = new Subject<void>();
  filteredPedidos: any;





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
    this.pedidoStockService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{

      this.listPedidos = data
      this.filteredPedidos = [...this.listPedidos];
    });

  
    this.maestroService.getAll().pipe(takeUntil(this.destroy$)).subscribe(maestros => {
      maestros.forEach(maestro => {
        if(maestro.tipo_articulo.description !== 'Productos Elaborados' && maestro.tipo_articulo.description !== 'Bebidas'){
          this.listMaestro.push(maestro)
        }
      })
      
    })
  }

  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.pedidoStockService.update(this.DataArticulos.id, this.pedidoNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)
        this.toastr.success('Pedido Actualizado', 'Exito');
      });
     } else{
      try {
        this.pedidoStockService.create(this.pedidoNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
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
      this.pedidoStockService.create({...pedido, sumarCantidades: true}).pipe(takeUntil(this.destroy$)).subscribe(() => {
     
        
        
        setTimeout(() => {
        window.location.reload();
        }, 600)

      
        this.toastr.success('Pedido Finalizado', 'Exito');

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
  this.pedidoStockService.delete(id!).pipe(takeUntil(this.destroy$)).subscribe(() => {
    this.toastr.success('Entidad eliminado exitosamente')
    setTimeout(() => {
      window.location.reload();
    }, 600)
    

  })
}

applyFilter(event: any): void {
  const value = event.target.value;
  
  this.filteredPedidos = this.listPedidos.filter(pedido => {
    return pedido.maestro_articulo.descripcion.toLowerCase().includes(value.toLowerCase());
  });
}

resetForm() {
  this.form.setValue({
    cant_requerida: '',
    articuloId: '',
  });

   
}

}
