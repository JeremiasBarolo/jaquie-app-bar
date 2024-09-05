import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MesasService } from '../../../services/mesas.service';
import { LoginComponent } from '../../../auth/login/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadisticaService } from '../../../services/estadistica.service';
import { PedidoProduccionService } from '../../../services/pedido-produccion.service';
import { Subject, takeUntil } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { TipoFormaPagoService } from '../../../services/tipo-forma-pago.service';

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
  private destroy$ = new Subject<void>();
  mesa: any;
  total: number | undefined;
  formasPago: any
  @ViewChild('pdfContent', { static: false })
  pdfContent!: ElementRef;


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private viewport: ViewportScroller,
    private mesasService: MesasService,
    private fb: FormBuilder,
    private estadisticaService: EstadisticaService,
    private pedidoProduccionService: PedidoProduccionService,
    private tipoFormaPagoService: TipoFormaPagoService



    ){
      this.form = this.fb.group({
        mesa: ['',Validators.required],
        pago: ['',Validators.required],
      });
     }

  ngOnInit(): void {
   
    this.mesasService.getAll().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
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

    this.tipoFormaPagoService.getAll().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      this.formasPago = data;
    })

    

    
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
}

cambiarEstado(id?: number, pedido?: any, estado?: string, devolverInsumos?: any, selectedId?:number) {
  if (id){
    pedido.estado = estado;
    
    
    if(estado === 'COMIENDO'){
      if(pedido.maestro_articulos.length === 0){
        
        this.toastr.error(`Debe asiganrle un pedido a la mesa de ${pedido.mesa}`)
      }else{

        pedido.subtotal = this.calcularSubtotal(pedido);
        
        
        this.mesasService.update(id, pedido).pipe(takeUntil(this.destroy$)).subscribe(() => {
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

        this.mesasService.update(id, {...pedido, estado:"FINALIZADO"}).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.toastr.success(`Mesa ${pedido.name} ${estado} exitosamente`)
        setTimeout(() => {
          window.location.reload();
        }, 600)
      })
    }
      
    
    


    }else if (estado === 'DEVOLVER'){

      this.mesasService.update(id, {...pedido}).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.toastr.success(`Mesa ${pedido.name} ${estado} exitosamente`)
      setTimeout(() => {
        window.location.reload();
      }, 600);
      })


    }else{
      this.mesasService.update(id, {...pedido, devolverInsumos:devolverInsumos}).pipe(takeUntil(this.destroy$)).subscribe(() => {
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

 

  this.mesasService.create({...this.recetaData, forma_pago: this.form.value.pago}).pipe(takeUntil(this.destroy$)).subscribe(() => {
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
  this.estadisticaService.create({cerrarCaja: true}).pipe(takeUntil(this.destroy$)).subscribe(
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
    this.pedidoProduccionService.traerPedidos(mesa.id).pipe(takeUntil(this.destroy$)).subscribe(
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
    this.pedidoProduccionService.traerPedidos(mesa.id).pipe(takeUntil(this.destroy$)).subscribe(
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
 this.mesasService.devolverPedido(this.idAccion).pipe(takeUntil(this.destroy$)).subscribe(
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
this.mesasService.sumarPedido(this.idAccion).pipe(takeUntil(this.destroy$)).subscribe(
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

setIdEentidad(id:any, accion?:any){
  this.idAccion = id
  if(accion){
    this.sumarPedido()
  }
}

abrirModal(mesaData: any): void {
  console.log(mesaData);
  
  this.mesa = mesaData;
  this.total = this.calcularTotal(mesaData.pedidoFinalizado);
}

calcularTotal(consumo: any[]): number {
  return consumo.reduce((acc, item) => acc + (item.cant_requerida * item.costo_unitario), 0);
}


generatePDF(): void {
  const data = this.pdfContent.nativeElement;

  html2canvas(data, {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight - pageHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, Math.min(imgHeight, pageHeight));

    if (heightLeft > 0) {
      let position = -pageHeight;

      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        position -= pageHeight;
        heightLeft -= pageHeight;
      }
    }

    pdf.save(`ticket-${this.mesa.mesa}-${this.mesa.createdAt}.pdf`);
  });
}

}
