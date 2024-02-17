import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { DisponibilidadArticulosService } from '../../../../services/disponibilidad-articulos.service';
import { MaestroArticulosService } from '../../../../services/maestro-articulos.service';
import { RecetasService } from '../../../../services/recetas.service';


@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styleUrl: './crear-editar.component.css'
})
export class CrearEditarComponent {
  form: FormGroup;
  id: number;
  selectedEntities: any[] = [];
  ProductEntityData: any;
  listMaestro: any;
  listDisponibilidad: any[] = []
  recetaData: any = {}

  constructor(
    private disponibilidadService: DisponibilidadArticulosService,
    private fb: FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private maestroArticulosService: MaestroArticulosService,
    private recetasService: RecetasService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      maestro: ['', Validators.required],
      cant_fisica: ['', Validators.required],
      n_linea: ['', Validators.required]
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadAllEntities();
    // this.loadSelectedProducts();
  }

  addReceta() {
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
 

  selectedEntity(entity: any) {
    this.selectedEntities.push({ ...entity, cantidad: 1 });
    this.listDisponibilidad = this.listDisponibilidad.filter(item => item.id !== entity.id);
  }

  returnEntities(entity: any) {
    this.listDisponibilidad.push(entity);
    this.selectedEntities = this.selectedEntities.filter(item => item.id !== entity.id);
  }

  loadAllEntities() {
    // Cargar lista de maestros de artículos
    this.maestroArticulosService.getAll().subscribe(
      (maestros: any[]) => {
        this.listMaestro = maestros.filter(maestro => maestro.tipo_articulo.description === 'Productos Elaborados');
      },
      error => {
        console.error('Error al cargar los maestros de artículos:', error);
      }
    );

    // Cargar lista de disponibilidad de artículos
    this.disponibilidadService.getAll().subscribe(
      (data: any[]) => {
        this.listDisponibilidad = data;
      },
      error => {
        console.error('Error al cargar la disponibilidad de artículos:', error);
      }
    );
  }
  
  // loadSelectedProducts() {
  //   if (this.id) {
  //     this.maestroArticulosService.getById(this.id).subscribe(
  //       (res: any) => {
  //         if (res.InsumosEntities && res.InsumosEntities.length > 0) {
            
            
  //           this.selectedEntities = [...res.InsumosEntities];
  //           this.Insumos = this.Insumos.filter(insumo => !this.selectedEntities.some(selected => selected.id === insumo.id));
  //         }
  //       }
  //     )
  //   }
  // }

  getProductEntity(id: number) {
    this.maestroArticulosService.getById(id).subscribe((data: any)=> {
      this.form.setValue({
        maestro: data.descripcion,
        n_linea: data.description,
        cant_fisica: data.uni_medida,
        

      });
    });
}
}
