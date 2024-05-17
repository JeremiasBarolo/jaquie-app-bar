import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MesasService } from '../../../services/mesas.service';
import { LoginComponent } from '../../../auth/login/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadisticaService } from '../../../services/estadistica.service';
import { PedidoProduccionService } from '../../../services/pedido-produccion.service';


@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent implements OnInit{
  breadcrumbItems: string[] = ['Mesas','Inicio', 'Mesas'];
  listComiendo: any[] = [];
  listFinalizado: any[] = [];
  listPreparacion: any[] = [];
  subtotal: number = 0
  selectedDepositoId: number | undefined;
  depositos:any[] = []
  form!: FormGroup;

  cardData: any = {
    name: ''
  }
  cardDataGeneral: any = {
    name: ''
  }  
  IdsInsumosCantidad: any[] = []
  recetaData: any;
  costoTotal: number = 0;
  accion:any = 'agregarPedido'
  idAccion:any


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller,
    private mesasService: MesasService,
    private fb: FormBuilder,
    private estadisticaService: EstadisticaService,
    private pedidoProduccionService: PedidoProduccionService



    ){
      this.form = this.fb.group({
        mesa: ['',Validators.required],
        pago: ['',Validators.required],
      });
     }

  ngOnInit(): void {
    this.mesasService.getAll().subscribe((data: any) => {
      console.log(data);
      
      data.forEach(
        (element: any) => {
          if(element.estado === 'PREPARACION'){
            this.listPreparacion.push(element);
          }else if(element.estado === 'COMIENDO'){
            this.listComiendo.push(element);
          }else{
            this.listFinalizado.push(element);
          }
        }
      )
    
      this.traerPedidosMesas()
    })

    

    
    
  }

cambiarEstado(id?: number, pedido?: any, estado?: string, devolverInsumos?: any, selectedId?:number) {
  if (id){
    pedido.estado = estado;
    
    
    if(estado === 'COMIENDO'){
      if(pedido.maestro_articulos.length === 0){
        
        this.toastr.error(`Debe asiganrle un pedido a la mesa de ${pedido.mesa}`)
      }else{

        pedido.subtotal = this.calcularSubtotal(pedido);
        
        
        this.mesasService.update(id, pedido).subscribe(() => {
        this.toastr.success(`Mesa ${pedido.name} ${estado} exitosamente`)
        setTimeout(() => {
          window.location.reload();
        }, 600)
      })
      }
      

  
  }
  else if(estado === 'FINALIZADO'){

    if(pedido.pedidoPreparacion.length !== 0){
      this.toastr.error(`No puede realizar esta accion. Esta mesa tiene pedido pendientes.`)
    
    }else{
        pedido.forma_pago = this.form.value.pago
        pedido.subtotal = this.calcularSubtotal(pedido);

        this.mesasService.update(id, {...pedido, estado:"FINALIZADO"}).subscribe(() => {
        this.toastr.success(`Mesa ${pedido.name} ${estado} exitosamente`)
        setTimeout(() => {
          window.location.reload();
        }, 600)
      })
    }
      
    
    


    }else if (estado === 'DEVOLVER'){

      this.mesasService.update(id, {...pedido}).subscribe(() => {
      this.toastr.success(`Mesa ${pedido.name} ${estado} exitosamente`)
      setTimeout(() => {
        window.location.reload();
      }, 600);
      })


    }else{
      this.mesasService.update(id, {...pedido, devolverInsumos:devolverInsumos}).subscribe(() => {
        this.toastr.success(`Mesa ${pedido.name} ${estado} exitosamente`)
        setTimeout(() => {
          window.location.reload();
        }, 600);
    }
      
    
    )}
    }

      
}

guardarMesa(finalizar?:any){
  this.recetaData = {
    ...this.form.value,
    estado: 'PREPARACION'
  };

 

  this.mesasService.create({...this.recetaData, forma_pago: this.form.value.pago}).subscribe(() => {
    this.toastr.success('Mesa creada exitosamente');
    setTimeout(() => {
      window.location.reload();
    }, 600)
    
  
  
  }
)}

  
showCardDetails(card: any) {  
  this.cardData = card;  
  let subtotal = this.calcularSubtotal(card) 
  this.cardData.total = subtotal

 
  
}

updateEntidad(id:number){
  
}

calcularSubtotal(ventas: any) {
  let subtotal = 0;

    ventas.maestro_articulos.forEach((articulo: { costo_unitario: number; pedido_produccion: { cant_requerida: number; }; }) => {
        subtotal += articulo?.costo_unitario * articulo?.pedido_produccion?.cant_requerida;
    });
  

  return subtotal;
}

cerrarCaja(){
  this.estadisticaService.create({cerrarCaja: true}).subscribe(
    (response) => {
     
      if (response && response.recaudacion !== undefined) {
          this.toastr.success('Caja cerrada exitosamente');
          setTimeout(() => {
              window.location.reload();
          }, 600);
      }
  },
  (error) => {
    console.log(error.error);
      this.toastr.error(error.error.error);
      console.error(error.error);
  });
}

agregarPedido(entidad:any){
    this.router.navigate(['admin/pedido-produccion', this.accion, entidad.id]);
    

}

traerPedidosMesas() {
  this.listComiendo.forEach((mesa) => {
    this.pedidoProduccionService.traerPedidos(mesa.id).subscribe(
      (pedidos: any[]) => {
        
        mesa.pedidoFinalizado = mesa.pedidoFinalizado || [];
        mesa.pedidoPreparacion = mesa.pedidoPreparacion || [];

        
        pedidos.forEach((pedido) => {
          if (pedido.estado === 'FINALIZADO') {
            mesa.pedidoFinalizado.push(pedido);
          } else {
            mesa.pedidoPreparacion.push(pedido);
          }
        });
      },
      (error: any) => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  });

  this.listFinalizado.forEach((mesa) => {
    this.pedidoProduccionService.traerPedidos(mesa.id).subscribe(
      (pedidos: any[]) => {
        
        mesa.pedidoFinalizado = mesa.pedidoFinalizado || [];
        pedidos.forEach((pedido) => {
          
            mesa.pedidoFinalizado.push(pedido);
          
        });
      },
      (error: any) => {
        console.error('Error al obtener los pedidos:', error);
      }
    );
  });

  console.log(this.listComiendo);
  
}


devolverPedido(){
 this.mesasService.devolverPedido(this.idAccion).subscribe(
    (response) => {
      if (response) {
        this.toastr.success('Pedido devuelto exitosamente');
        setTimeout(() => {
          window.location.reload();
        }, 600);
      }
    },
    (error) => {
      console.error('Error al devolver el pedido:', error);
      this.toastr.error('Error al devolver el pedido');
    }
  );
}

sumarPedido(){
this.mesasService.sumarPedido(this.idAccion).subscribe(
  (response) => {
    if (response) {
      this.toastr.success('Pedido sumado exitosamente');
      setTimeout(() => {
        window.location.reload();
      }, 600);
    }
  },
  (error) => {
    console.error('Error al sumar el pedido:', error);
    this.toastr.error('Error al sumar el pedido');
  }
);
}

setIdEentidad(id:any){
  this.idAccion = id
}



}
