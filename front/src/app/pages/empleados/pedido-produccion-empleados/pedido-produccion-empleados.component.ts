import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';
import { PedidoProduccionService } from '../../../services/pedido-produccion.service';
import { MesasService } from '../../../services/mesas.service';

@Component({
  selector: 'app-pedido-produccion-empleados',
  templateUrl: './pedido-produccion-empleados.component.html',
  styleUrl: './pedido-produccion-empleados.component.css'
})
export class PedidoProduccionEmpleadosComponent {
  breadcrumbItems: string[] = ['Pedido de Produccion'];
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
  listMesas: any[] = []

  filteredPedidos:any[] = []

  constructor(
    private pedidoProduccion: PedidoProduccionService,
    private mesasService: MesasService,
    private maestroService: MaestroArticulosService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller,
    private fb: FormBuilder,
    


    ) {
      this.form = this.fb.group({
        cant_requerida: ['',Validators.required],
        maestroId: ['',Validators.required],
        ventaId: ['',Validators.required],
      });
    }


  ngOnInit(): void {
    this.pedidoProduccion.getAll().subscribe(data =>{
      this.listPedido = data
    });

    this.mesasService.getAll().subscribe(data => {
      this.listMesas = data.filter(mesa => 
        mesa.estado !== "FINALIZADO" && mesa.estado !== "CANCELADO"
      );
      this.filteredPedidos = this.listMesas;
    });
  }

  editarPedido(card: any) {
    if(card.estado ==="FINALIZADO"){
      this.toastr.error(`No se puede editar el pedido, este esta ${card.estado}`)
    }else if(card.maestro_articulos.length === 0){
      this.toastr.error(`No se puede editar ya que no contiene un pedido asignado.`)
    }else{
      this.router.navigate(['admin/pedido-produccion/crear-editar', card.id]);
    }
    
   
}

  
showCardDetails(card: any) {  
  this.cardData = card;  
  this.cardData.subtotal = this.calcularSubtotal(card);
  console.log(card);
  
}

  calcularSubtotal(pedido?: any): any{
    let subtotal = 0
    
    pedido?.maestro_articulos?.forEach((item: any) => {
      
      subtotal += item?.pedido_produccion?.cant_requerida * item?.costo_unitario;
      
    })

    return subtotal;
    

     
     
     
};


calcularSubtotalGeneral(): any {
  let subtotalGeneral = 0;
  
  this.listPedido.forEach(item => {
      subtotalGeneral += item.maestro_articulo.costo_unitario * item.cant_requerida
  });
  return subtotalGeneral;
}





eliminarPedido(id?: number, pedido?:any){
 if(pedido.estado ==="COMIENDO" || pedido.estado ==="FINALIZADO" ){
  this.toastr.error(`No se puede eliminar el pedido, este esta ${pedido.estado}`)
 }else{
  this.pedidoProduccion.delete(id!).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Entidad eliminado exitosamente')

    })
  }
}

applyFilter(event: any): void {
  const value = event.target.value;
  
  this.filteredPedidos = this.listMesas.filter(insumo => {
    return insumo.mesa.toLowerCase().includes(value.toLowerCase());
  });
}
}
