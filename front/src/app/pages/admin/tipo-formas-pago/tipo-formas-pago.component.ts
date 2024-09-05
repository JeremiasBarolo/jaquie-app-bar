import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { PedidoStockService } from '../../../services/pedido-stock.service';
import { TipoFormaPagoService } from '../../../services/tipo-forma-pago.service';

@Component({
  selector: 'app-tipo-formas-pago',
  templateUrl: './tipo-formas-pago.component.html',
  styleUrl: './tipo-formas-pago.component.css'
})
export class TipoFormasPagoComponent {
  breadcrumbItems: string[] = ['Formas de Pago','Inicio', 'Formas de Pago'];
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
  
  formaPago: any
  listForma: any[] = []
  private destroy$ = new Subject<void>();
  filteredFormas: any;





  constructor(
    private tipoFormaService: TipoFormaPagoService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    


  ) {
      this.form = this.fb.group({
        descripcion: ['',Validators.required],
      });
  }


  ngOnInit(): void {
    this.tipoFormaService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data =>{

      this.listForma = data
      this.filteredFormas = [...this.listForma];
    });

  }

  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editarPedido(card: any) {  
    this.DataArticulos = {...card, editar:true};  
    
    
    this.form.patchValue({
      descripcion: this.DataArticulos.descripcion,
      
      
    });
}

addFroma() {
    this.formaPago = {
      descripcion: this.form.value.descripcion,
    }

    if(this.DataArticulos.editar === true){
      this.tipoFormaService.update(this.DataArticulos.id, this.formaPago).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)
        this.toastr.success('Forma de Pago Actualizada', 'Exito');
      });
     } else{
      try {
        this.tipoFormaService.create(this.formaPago).pipe(takeUntil(this.destroy$)).subscribe(() => {
          setTimeout(() => {
            window.location.reload();
          }, 600)

          
  
          this.toastr.success('Forma de Pago Creada', 'Exito');
  
        });
        
      } catch (error) {
        console.log(error);
      }
     }
      
  }




eliminarPedido(id?: number){
  this.tipoFormaService.delete(id!).pipe(takeUntil(this.destroy$)).subscribe(() => {
    this.toastr.success('Forma de Pago eliminada exitosamente')
    setTimeout(() => {
      window.location.reload();
    }, 600)
    

  })
}

applyFilter(event: any): void {
  const value = event.target.value;
  
  this.filteredFormas = this.listForma.filter(pedido => {
    return pedido.descripcion.toLowerCase().includes(value.toLowerCase());
  });
}

resetForm() {
  this.form.setValue({
    descripcion: '',
  });

   
}
}