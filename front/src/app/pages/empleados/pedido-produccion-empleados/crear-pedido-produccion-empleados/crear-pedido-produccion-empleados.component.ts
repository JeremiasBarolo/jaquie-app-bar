import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DisponibilidadArticulosService } from '../../../../services/disponibilidad-articulos.service';
import { MaestroArticulosService } from '../../../../services/maestro-articulos.service';
import { RecetasService } from '../../../../services/recetas.service';
import { PedidoProduccionService } from '../../../../services/pedido-produccion.service';
import { MesasService } from '../../../../services/mesas.service';

@Component({
  selector: 'app-crear-pedido-produccion-empleados',
  templateUrl: './crear-pedido-produccion-empleados.component.html',
  styleUrl: './crear-pedido-produccion-empleados.component.css'
})
export class CrearPedidoProduccionEmpleadosComponent {
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private maestroArticulosService: MaestroArticulosService,
    private pedidoProduccionService: PedidoProduccionService,
    private mesasService: MesasService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      mesa: ['', Validators.required],
    });
    this.agregarPedido = String(aRoute.snapshot.paramMap.get('agregarPedido'));
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
    
  }

  ngOnInit(): void {
    if(this.id !== 0){
      for (let i = 0; i < 2; i++){
        setTimeout(() => {
          this.loadAllEntities();
          this.loadSelectedProducts();
        }, 50)
      }
    }
    
    
    this.loadAllEntities();
        this.loadSelectedProducts();
    
    
  }

  addReceta() {
    this.recetaData = {
      insumos: this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad })),
      mesa: this.form.value.mesa,
    };
    
    

    if (this.id !== 0) {
      try {
        if(this.agregarPedido){
          this.pedidoProduccionService.agregarPedido(this.id,{...this.recetaData, estado: this.entidad.estado}).subscribe(() => {
            this.router.navigate(['admin/mesas']);
            this.toastr.success('Pedido Actualizado');
          });
        }else{
          this.pedidoProduccionService.update(this.id, {...this.recetaData, estado: this.entidad.estado}).subscribe(() => {
            this.router.navigate(['admin/mesas']);
            this.toastr.success('Pedido Actualizado');
          });
        }
        
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.pedidoProduccionService.create({...this.recetaData, estado: 'PENDIENTE'}).subscribe(() => {
          this.router.navigate(['admin/mesas']);
          this.toastr.success('Pedido Creado Exitosamente');
        });

        
      } catch (error) {
        console.log(error);
      }
    }
  }
 

  selectedEntity(entity: any) {
    this.selectedEntities.push({ 
      ...entity, 
      cantidad: 1,
      maestro_articulo: {
        descripcion: entity.descripcion 
      }
      });
    this.listMeaesto = this.listMeaesto.filter(item => item.id !== entity.id);
  }

  returnEntities(entity: any) {
    this.listMeaesto.push(entity);
    this.selectedEntities = this.selectedEntities.filter(item => item.id !== entity.id);
  }

  loadAllEntities() {
    if(this.id !== 0){
      this.maestroArticulosService.getAll().subscribe(
        (maestros: any[]) => {
          this.listMeaesto = maestros.filter(maestro => maestro.tipo_articulo.description !== 'Insumos');
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
  
      this.mesasService.getAll().subscribe(
        (mesas: any[]) => {
          this.listMesas = mesas;
        },
        error => {
          console.error('Error al cargar las mesas:', error);
        }
      );
    } else {
      this.maestroArticulosService.getAll().subscribe(
        (maestros: any[]) => {
          this.listMeaesto = maestros.filter(maestro => maestro.tipo_articulo.description !== 'Insumos');
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
  
      this.mesasService.getAll().subscribe(
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
    if (this.id) {
      if(!this.agregarPedido){
        this.mesasService.getById(this.id).subscribe(
          (res: any) => {
            this.entidad = res
            if (res.maestro_articulos && res.maestro_articulos.length > 0) {
              
              const selectedEntitiesWithDescription = res.maestro_articulos.map((item: { id: any; pedido_produccion: { cant_requerida: any; }; descripcion: any; })  => {
                return {
                  id: item.id,
                  cantidad: item.pedido_produccion.cant_requerida,
                  maestro_articulo: {
                    descripcion: item.descripcion
                  }
                };
              });
    
             
              this.selectedEntities = [...selectedEntitiesWithDescription];
              console.log('SelectedEntites:',this.selectedEntities);
              
              
    
              
              this.listMeaesto = this.listMeaesto.filter(insumo =>
                !this.selectedEntities.some(selected => selected.id === insumo.id)
              );
    
              
            }
            this.form.patchValue({
              mesa: res.id,
            }) 
          }
        );
  
        
      }else{
        this.mesasService.getById(this.id).subscribe(
          (res: any) => {
            this.entidad = res;
        
            
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