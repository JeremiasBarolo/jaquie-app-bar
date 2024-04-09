import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DisponibilidadArticulosService } from '../../../../services/disponibilidad-articulos.service';
import { MaestroArticulosService } from '../../../../services/maestro-articulos.service';
import { RecetasService } from '../../../../services/recetas.service';
import { BebidasService } from '../../../../services/bebidas.service';


@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrl: './crear-editar.component.css'
})
export class CrearEditarComponent {
  breadcrumbItems: string[] = ['Crear/Editar Recetas','Inicio', 'Recetas'];
  form: FormGroup;
  id: number;
  selectedEntities: any[] = [];
  ProductEntityData: any;
  listMaestro: any;
  listDisponibilidad: any[] = []
  recetaData: any = {}
  accion: string;
 

  constructor(
    private disponibilidadService: DisponibilidadArticulosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private maestroArticulosService: MaestroArticulosService,
    private recetasService: RecetasService,
    private toastr: ToastrService,
    private bebidasService: BebidasService
  ) {
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
    this.accion = String(aRoute.snapshot.paramMap.get('accion'));
    

    if(this.accion === 'bebida'){
      this.form = this.fb.group({
        maestro: ['', Validators.required],
        recipiente: ['', Validators.required],
      });
    }else{
      this.form = this.fb.group({
        maestro: ['', Validators.required],
        cant_fisica: ['', Validators.required],
        n_linea: ['', Validators.required]
      });
    }
    
    
  }

  ngOnInit(): void {
    this.loadAllEntities();

    if(this.accion == 'bebida' && this.id !== null){
      this.loadBebidaData(this.id); 
    } else if (this.accion === 'receta' && this.id !== null ) {
      this.loadSelectedProducts(); 
    }
    
    
    
  }

  addReceta() {

    

    if (this.accion === 'bebida') {

      const sumaCantidades = this.selectedEntities.reduce((total, entity) => total + entity.cantidad, 0);

          
          if (sumaCantidades !== 100) {
            this.toastr.error('La suma de las cantidades debe ser igual a 100%');
          } else {
            // Si la suma es igual a 100, puedes proceder a enviar los datos
            this.recetaData = {
              ...this.form.value,
              insumos: this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad }))
            };
          }
      
  
      if (this.id !== 0) {
        

        try {
          this.bebidasService.update(this.id, this.recetaData).subscribe(() => {
            this.router.navigate(['admin/recetas']);
            this.toastr.success('Receta Actualizada');
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          console.log(this.recetaData.insumos);
          this.bebidasService.create(this.recetaData).subscribe(() => {
            this.router.navigate(['admin/recetas']);
            this.toastr.success('Receta Creada Exitosamente');
          });
        } catch (error) {
          console.log(error);
        }
      }
    }else{
      this.recetaData = {
        ...this.form.value,
        insumos: this.selectedEntities.map(entity => ({ id: entity.id, cantidad: entity.cantidad }))
  
      };

      if (this.id !== 0) {
        try {
          this.recetasService.update(this.id, this.recetaData).subscribe(() => {
            this.router.navigate(['admin/recetas']);
            this.toastr.success('Receta Actualizada');
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          console.log(this.recetaData.insumos);
          this.recetasService.create(this.recetaData).subscribe(() => {
            this.router.navigate(['admin/recetas']);
            this.toastr.success('Receta Creada Exitosamente');
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

   
    

   
  }
 

  selectedEntity(entity: any) {
    this.selectedEntities.push({ 
      ...entity,
      id: entity.maestro_articulo.id,  
      cantidad: 1,
      maestro_articulo: {
        descripcion: entity.maestro_articulo.descripcion 
      }
      });
    this.listDisponibilidad = this.listDisponibilidad.filter(item => item.id !== entity.id);
    
    
  }

  selectedEntityBebida(entity: any) {
    this.selectedEntities.push({ 
      ...entity,
      id: entity.maestro_articulo.id,  
      cantidad: 1,
      maestro_articulo: {
        descripcion: entity.maestro_articulo.descripcion 
      }
      });
    this.listDisponibilidad = this.listDisponibilidad.filter(item => item.id !== entity.id);
    
    
  }

  returnEntities(entity: any) {
    this.listDisponibilidad.push(entity);
    this.selectedEntities = this.selectedEntities.filter(item => item.id !== entity.id);
  }

  loadAllEntities() {
    if(this.id !== 0 && this.accion === 'receta'){
      this.maestroArticulosService.getAll().subscribe(
        (maestros: any[]) => {
          this.listMaestro = maestros
          console.log(this.listMaestro);
          
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
    }else{
      this.maestroArticulosService.getAll().subscribe(

        
        (maestros: any[]) => {
          this.listMaestro = maestros.filter(maestro => maestro.tipo_articulo.description === 'Bebidas');
        },
        error => {
          console.error('Error al cargar los maestros de artículos:', error);
        }
      );
    }
    

    
    this.disponibilidadService.getAll().subscribe(
      (data: any[]) => {
         this.listDisponibilidad = data
      },
      error => {
        console.error('Error al cargar la disponibilidad de artículos:', error);
      }
    );
  }

  loadBebidaData(id: number) {
    this.bebidasService.getById(id).subscribe((data) => {
      this.form.patchValue({
        maestro: data.NombreArticulo.id,
        recipiente: data.cantidadTotalRecipiente
      });
  
      let componentes: { componente: any; cantidad: any; }[] = [];
      for (const key of ['primerComponente', 'segundoComponente', 'tercerComponente', 'cuartoComponente', 'quintoComponente']) {
        if (data[key] !== null && data[`${key}Cantidad`] !== null) {
          componentes.push({
            componente: data[key],
            cantidad: data[`${key}Cantidad`]
          });
        }
      }

      for(const insumo of componentes){
        this.listDisponibilidad = this.listDisponibilidad.filter(disp => disp.maestro_articulo.id !== insumo.componente);
        this.maestroArticulosService.getById(insumo.componente).subscribe((maestro)=>{
          this.selectedEntities.push({
            id: maestro.articuloId,
            cantidad: insumo.cantidad,
            maestro_articulo: {
              descripcion: maestro.descripcion
            }
          })
        })
      }

      
      
      
  
     
    });
  }
  
  loadSelectedProducts() {
    if ( this.accion ==='receta' && this.id !== null) {
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
            console.log('listDisponibilidad:',this.listDisponibilidad);
            
            
  
            
            this.listDisponibilidad = this.listDisponibilidad.filter(insumo =>
              !this.selectedEntities.some(selected => selected.id === insumo.id)
            );
  
            
            this.form.patchValue({
              maestro: res.id,
              cant_fisica: res.receta[0].cant_fisica,
              n_linea: res.receta[0].n_linea
            });
          } else {
            
            this.listDisponibilidad = res; 
          }
        }
      );
    }else{

    }
  }

  getBebida(id:number){
    this.bebidasService.getById(id).subscribe((data)=>{
        this.form.patchValue({
            maestro: data.NombreArticulo.id,
        });

        let componentes: { componente: any; cantidad: any; }[] = [];
        for (const key of ['primerComponente', 'segundoComponente', 'tercerComponente', 'cuartoComponente', 'quintoComponente']) {
            if (data[key] !== null && data[`${key}Cantidad`] !== null) {
                componentes.push({
                    componente: data[key],
                    cantidad: data[`${key}Cantidad`]
                });
            }
        }

        console.log('Dta:', data);
        console.log('componentes', componentes);

        if (this.accion === 'bebida' && this.id) {
            this.selectedEntities = this.selectedEntities.filter(entity => {
                return componentes.some(comp => comp.componente.id === entity.id);
            });
        }
    });
}

  
  
  

  
}
