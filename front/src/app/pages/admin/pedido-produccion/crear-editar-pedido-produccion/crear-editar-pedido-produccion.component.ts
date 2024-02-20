import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DisponibilidadArticulosService } from '../../../../services/disponibilidad-articulos.service';
import { MaestroArticulosService } from '../../../../services/maestro-articulos.service';
import { RecetasService } from '../../../../services/recetas.service';
import { PedidoProduccionService } from '../../../../services/pedido-produccion.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private maestroArticulosService: MaestroArticulosService,
    private pedidoProduccionService: PedidoProduccionService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities();
    this.loadSelectedProducts();
    
    
  }

  addReceta() {
    this.recetaData = {
      insumos: this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad }))
    };
    

    if (this.id !== 0) {
      try {
        this.pedidoProduccionService.update(this.id, this.recetaData).subscribe(() => {
          this.router.navigate(['admin/pedido-produccion']);
          this.toastr.success('Pedido Actualizado');
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log(this.recetaData.insumos);
        this.pedidoProduccionService.create(this.recetaData).subscribe(() => {
          this.router.navigate(['admin/pedido-produccion']);
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
    if(this.id !==0){
      this.maestroArticulosService.getAll().subscribe(
        (maestros: any[]) => {
         this.listMeaesto = maestros
          
          
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
    }else{
      this.maestroArticulosService.getAll().subscribe(

        
        (maestros: any[]) => {
          this.listMeaesto = maestros.filter(maestro => maestro.tipo_articulo.description !== 'Insumos')
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
    }
    
  }
  
  loadSelectedProducts() {
    if (this.id) {
      this.maestroArticulosService.getById(this.id).subscribe(
        (res: any) => {
          if (res.receta && res.receta.length > 0) {
            
            const selectedEntitiesWithDescription = res.receta.map((item: { articuloId: any; cant_necesaria: any; disponibilidad_articulo: { maestro_articulo: { descripcion: any; }; }; })  => {
              return {
                id: item.articuloId,
                cantidad: item.cant_necesaria,
                maestro_articulo: {
                  descripcion: item.disponibilidad_articulo.maestro_articulo.descripcion
                }
              };
            });
  
           
            this.selectedEntities = [...selectedEntitiesWithDescription];
            console.log('SelectedEntites:',this.selectedEntities);
            
            
  
            
            this.listMeaesto = this.listMeaesto.filter(insumo =>
              !this.selectedEntities.some(selected => selected.id === insumo.id)
            );
  
            // Asignar los valores al formulario
            this.form.patchValue({
              maestro: res.id,
              cant_fisica: res.receta[0].cant_fisica,
              n_linea: res.receta[0].n_linea
            });
          } else {
            
          }
        }
      );
    }
  }
}
