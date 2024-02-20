import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';
import { PedidoProduccionService } from '../../../services/pedido-produccion.service';
import { MesasService } from '../../../services/mesas.service';

@Component({
  selector: 'app-pedido-produccion',
  templateUrl: './pedido-produccion.component.html',
  styleUrl: './pedido-produccion.component.css'
})
export class PedidoProduccionComponent {
  breadcrumbItems: string[] = ['Pedido de Produccion','Inicio', 'Pedido de Produccion'];
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

    this.mesasService.getAll().subscribe(data =>{
      this.listMesas = data;
    })

  }

  editarPedido(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    console.log(this.DataArticulos);
    
    this.form.patchValue({
      maestroId: this.DataArticulos.maestroId,
      cant_requerida: this.DataArticulos.cant_requerida,
      ventaId: this.DataArticulos.ventaId
      
    });
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
  this.pedidoProduccion.delete(id!).subscribe(() => {
    setTimeout(() => {
      window.location.reload();
    }, 600)
    this.toastr.success('Entidad eliminado exitosamente')

  })
}
}
