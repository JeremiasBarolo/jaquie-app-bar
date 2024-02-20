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
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities();
    this.loadSelectedProducts();
    
    
  }

  addReceta() {
    this.recetaData = {
      insumos: this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad })),
      mesa: this.form.value.mesa
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
    if(this.id !== 0){
      this.maestroArticulosService.getAll().subscribe(
        (maestros: any[]) => {
         this.listMeaesto = maestros
          
          
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );

      this.mesasService.getAll().subscribe(
        (mesas: any[]) => {
          this.listMesas = mesas
        

        }
      )
    }else{
      this.maestroArticulosService.getAll().subscribe(

        // todos los que no sean insumos si es crear
        (maestros: any[]) => {
          this.listMeaesto = maestros.filter(maestro => maestro.tipo_articulo.description !== 'Insumos')
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );

        // todos los no tengan pedido
      this.mesasService.getAll().subscribe(
        (mesas: any[]) => {
          this.listMesas = mesas.filter(mesa => mesa.maestro_articulos.length === 0)

        }
      )
    }

    
    
  }
  
  loadSelectedProducts() {
    if (this.id) {
      this.mesasService.getById(this.id).subscribe(
        (res: any) => {
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

      
    }
  }
}
