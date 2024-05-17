
import { Component, OnInit, ViewChild } from '@angular/core';

import { ConversionUmService } from '../../../services/conversion-um.service';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';
import { TipoArticulosService } from '../../../services/tipo-articulos.service';
import { DisponibilidadArticulosService } from '../../../services/disponibilidad-articulos.service';
import { Subject, reduce, takeUntil } from 'rxjs';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-disponibilidad-empleados',
  templateUrl: './disponibilidad-empleados.component.html',
  styleUrl: './disponibilidad-empleados.component.css'
})
export class DisponibilidadEmpleadosComponent {
  breadcrumbItems: string[] = ['Disponibilidad de Articulos','Inicio', 'Disponibilidad de Articulos'];
  listMaestro: any[] = [];
  conversionUm: any[] = [];
  disponibilidadForm!: FormGroup; 
  sumarForm!: FormGroup;
  maestroNuevo: any;
  conversionNuevo:any;
  
  DataArticulos: any={
    editar:false
  }
  DataConversion:any ={
    editar:false
  }
  EntidadEliminar:any
  listDisponibilidad:any[] = []
  conversionesUM:any[] = []
  dataModal:any={}
  cantidadNueva: any
  filteredDisp:any[] = []  

  @ViewChild('dt')
  table!: Table; 
  private destroy$ = new Subject<void>();

  constructor(
    private maestroArticulosService:MaestroArticulosService,
    private conversionUmService:ConversionUmService,
    private disponibilidadService:DisponibilidadArticulosService,
    private fb: FormBuilder,
    private toastr: ToastrService
    
    
    ){}


  ngOnInit(): void {

    this.maestroArticulosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(maestros => {
      maestros.forEach(maestro => {
        if(maestro.tipo_articulo.description !== 'Productos Elaborados' && maestro.tipo_articulo.description !== 'Bebidas'){
          this.listMaestro.push(maestro)
        }
      })
        
      })
      this.disponibilidadService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.listDisponibilidad = data;
        this.filteredDisp = this.listDisponibilidad
      })
      this.conversionUmService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.conversionesUM = data;
      })



      this.disponibilidadForm = this.fb.group({
        cant_fisica: ['',Validators.required],
        cant_comprometida: ['',Validators.required],
        cant_disponible: ['',Validators.required],
        maestro: ['',Validators.required],
        conversionUM: ['',Validators.required],
      });

      this.sumarForm = this.fb.group({
        cant_fisica_sumada: ['',Validators.required],
      });



      
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  
  showCardDetails(card: any) {
    this.dataModal = card
    console.log(this.dataModal);
  }

  editarTipo(card: any) {  
      this.DataArticulos = {...card, editar:true};  

      console.log('dat',this.DataArticulos);
      
      this.disponibilidadForm.patchValue({
        cant_fisica: this.DataArticulos.cant_fisica,
        cant_comprometida: this.DataArticulos.cant_comprometida,
        cant_disponible: this.DataArticulos.cant_disponible,
        conversionUM: this.DataArticulos.conversionId,
        maestro: this.DataArticulos.articuloId,
        
      });
  }
  


  DataEntidad(entidad?:any){
    this.EntidadEliminar = entidad
  }

  // <============ Guardar Tipo ==========>
  guardarNuevoMaetro(){
    this.maestroNuevo = {
      cant_fisica: this.disponibilidadForm.value.cant_fisica,
      cant_comprometida: this.disponibilidadForm.value.cant_comprometida,
      cant_disponible: this.disponibilidadForm.value.cant_disponible,
      conversionUM: this.disponibilidadForm.value.conversionUM,
      maestro: this.disponibilidadForm.value.maestro,
    }
   if(this.DataArticulos.editar === true){
    this.disponibilidadService.update(this.DataArticulos.id, this.maestroNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)
      this.toastr.success('Articulo Actualizado', 'Exito');
    });
   } else{
    try {
      this.disponibilidadService.create(this.maestroNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)

        this.toastr.success('Articulo Creado', 'Exito');

      });
      
    } catch (error) {
      console.log(error);
    }
   }
  }


  // <============ Eliminar Tipo ==========>
  EliminarArticulo(){
    this.disponibilidadService.delete(this.EntidadEliminar.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Articulo Eliminado', 'Exito');
    })
  }

  SumarCantidades(){
    const cant_fisica_nueva = this.sumarForm.value.cant_fisica_sumada + this.DataArticulos.cant_fisica;
    const cant_disponible_nueva = this.sumarForm.value.cant_fisica_sumada + this.DataArticulos.cant_disponible;
    this.cantidadNueva = {
      cant_fisica_nueva: cant_fisica_nueva,
      cant_disponible_nueva: cant_disponible_nueva,
      id: this.DataArticulos.id,

      add: true
    }
    try {
      this.disponibilidadService.update(this.cantidadNueva.id, this.cantidadNueva ).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)

        this.toastr.success('Articulo actualizado', 'Exito');

      });
      
    } catch (error) {
      console.log(error);
    }
   }


   set_Numbers(){
    this.listDisponibilidad.map((dispo)=>{
      this.disponibilidadService.update(dispo.id, {...dispo, cant_fisica: 1000, cant_disponible:1000, cant_comprometida:0} ).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)

        this.toastr.success('Articulo actualizado', 'Exito');

      });
    })
   }

   applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredDisp = this.listDisponibilidad.filter(insumo => {
      return insumo.maestro_articulo.descripcion.toLowerCase().includes(value.toLowerCase());
    });
  }

}
