import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaestroArticulosService } from '../../../../services/maestro-articulos.service';
import { PedidoProduccionService } from '../../../../services/pedido-produccion.service';
import { MesasService } from '../../../../services/mesas.service';
import { Subject, takeUntil } from 'rxjs';
import { EstadisticaService } from '../../../../services/estadistica.service';

@Component({
  selector: 'app-crear-editar-pedido-produccion',
  templateUrl: './crear-editar-pedido-produccion.component.html',
  styleUrl: './crear-editar-pedido-produccion.component.css'
})
export class CrearEditarPedidoProduccionComponent {
  breadcrumbItems: string[] = ['Crear/Editar Pedido Produccion','Inicio', 'Pedido Produccion'];
  form: FormGroup;
  id: number;
  selectedEntities: any[] = [];
  ProductEntityData: any;
  listMeaesto: any[] = []
  recetaData: any = {}
  listMesas: any[] = []
  entidad:any
  agregarPedido:any
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private maestroArticulosService: MaestroArticulosService,
    private estadisticasService: EstadisticaService,
    private pedidoProduccionService: PedidoProduccionService,
    private mesasService: MesasService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      mesa: ['', Validators.required],
    });
    this.agregarPedido = String(aRoute.snapshot.paramMap.get('agregarPedido')) || 'falle'
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
    
  }

  ngOnInit(): void {
    this.loadAllEntities();
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addReceta() {
    this.recetaData = {
      insumos: this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad })),
      mesa: this.form.value.mesa,
    };


    
    

    if (this.id !== 0) {
      try {
        console.log('aaa',this.agregarPedido);
        
        if(this.agregarPedido == 'agregarPedido'){
          console.log('pase a agregar al pedido');
          
          this.pedidoProduccionService.agregarPedido(this.id,{...this.recetaData, estado: this.entidad.estado}).pipe(takeUntil(this.destroy$)).subscribe(() => {
            console.log('entre para enviar a nashe');
            
            this.router.navigate(['admin/mesas']);
            this.toastr.success('Pedido Actualizado');
          });
        }else{
          this.pedidoProduccionService.update(this.id, {...this.recetaData, estado: this.entidad.estado}).pipe(takeUntil(this.destroy$)).subscribe(() => {
            console.log('Baje');
            
            this.router.navigate(['admin/mesas']);
            this.toastr.success('Pedido Actualizado');
          });
        }
        
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.pedidoProduccionService.create({...this.recetaData, estado: 'PENDIENTE'}).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.router.navigate(['admin/mesas']);
          this.toastr.success('Pedido Creado Exitosamente');
        });

        
      } catch (error) {
        console.log(error);
      }
    }
  }

  validateCantidad(entity: any) {
    if (entity.cantidad > entity.cantidadMaxima) {
      entity.cantidad = entity.cantidadMaxima; 
    }
  }
 

  selectedEntity(entity: any) {
    this.selectedEntities.push({...entity});
    this.listMeaesto = this.listMeaesto.filter(item => item.id !== entity.id);
  }

  returnEntities(entity: any) {
    this.listMeaesto.push(entity);
    this.selectedEntities = this.selectedEntities.filter(item => item.id !== entity.id);
  }

  loadAllEntities() {
    if(this.id !== 0){
      this.estadisticasService.getDisponibilidadStock().pipe(takeUntil(this.destroy$)).subscribe(
        (maestros: any[]) => {
         
          
          this.listMeaesto = maestros
          
          this.loadSelectedProducts();
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
  
      this.mesasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
        (mesas: any[]) => {
          this.listMesas = mesas;
        },
        error => {
          console.error('Error al cargar las mesas:', error);
        }
      );
    } else {
      this.estadisticasService.getDisponibilidadStock().pipe(takeUntil(this.destroy$)).subscribe(
        (maestros: any[]) => {
          this.listMeaesto = maestros
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
  
      this.mesasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(
        (mesas: any[]) => {
          this.listMesas = mesas.filter(mesa => mesa.maestro_articulos.length === 0);
        },
        error => {
          console.error('Error al cargar las mesas:', error);
        }
      );
    }
  }
  
  
  loadSelectedProducts() {

    if (this.id != 0) {
      
      if(this.agregarPedido == null){
        this.mesasService.getById(this.id).pipe(takeUntil(this.destroy$)).subscribe(
          (res: any) => {
            console.log(res);
            this.entidad = res;
            console.log(res.maestro_articulos);
            
            if (res.maestro_articulos && res.maestro_articulos.length > 0) {

             
              res.maestro_articulos.forEach((item: { id: any; pedido_produccion: { cant_requerida: any; }; descripcion: any; }) => {
                
                const matchingInsumo = this.listMeaesto.find((insumo: { id: any }) => insumo.id === item.id);
                
                if (matchingInsumo) {
                  this.selectedEntity({
                    ...matchingInsumo,
                    cantidad: item.pedido_produccion.cant_requerida,
                  })
                }
              });
        
            }
            this.form.patchValue({
              mesa: res.id,
            });
          }
        );
  
        
      }else{
        console.log('baje a nashe');
        
        this.mesasService.getById(this.id).pipe(takeUntil(this.destroy$)).subscribe(
          (res: any) => {
            this.entidad = res;
            if (res.maestro_articulos && res.maestro_articulos.length > 0) {

             
              res.maestro_articulos.forEach((item: { id: any; pedido_produccion: { cant_requerida: any; }; descripcion: any; }) => {
                
                const matchingInsumo = this.listMeaesto.find((insumo: { id: any }) => insumo.id === item.id);
                
                if (matchingInsumo) {
                  this.selectedEntity({
                    ...matchingInsumo,
                    cantidad: item.pedido_produccion.cant_requerida,
                  })
                }
              });
        
            }
            
            this.listMesas = this.listMesas.filter(insumo => insumo.id === res.id);
        
            
            this.form.patchValue({
              mesa: res.id,
            });
          },
          (error: any) => {
            console.error('Error al obtener los datos:', error);
          }
        );
      }
    }
      
  }
}
