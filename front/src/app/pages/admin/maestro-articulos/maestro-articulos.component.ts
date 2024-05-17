import { Component, OnInit } from '@angular/core';

import { ConversionUmService } from '../../../services/conversion-um.service';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';
import { TipoArticulosService } from '../../../services/tipo-articulos.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-maestro-articulos',
  templateUrl: './maestro-articulos.component.html',
  styleUrl: './maestro-articulos.component.css'
})
export class MaestroArticulosComponent implements OnInit {
  breadcrumbItems: string[] = ['Maestro de Articulos','Inicio', 'Maestro de Articulos'];
  listMaestro: any[] = [];
  conversionUm: any[] = [];
  maestroForm!: FormGroup;

  maestroNuevo: any;
  conversionNuevo:any;
  
  DataArticulos: any={
    editar:false
  }
  DataConversion:any ={
    editar:false
  }
  EntidadEliminar:any
  tiposArticulos:any[] = []
  conversionesUM:any[] = []
  dataModal:any={
    descripcion: '',

  }

  filteredMaestro: any[] =[]
  private destroy$ = new Subject<void>();
  


  constructor(
    private maestroArticulosService:MaestroArticulosService,
    private conversionUmService:ConversionUmService,
    private tipoArticulosService:TipoArticulosService,
    private fb: FormBuilder,
    private toastr: ToastrService
    
    
    ){}


  ngOnInit(): void {

      this.maestroArticulosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.listMaestro = data;
        this.filteredMaestro = [...this.listMaestro];

      })
      this.tipoArticulosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.tiposArticulos = data;
      })
      this.conversionUmService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.conversionesUM = data;
      })



      this.maestroForm = this.fb.group({
        description: ['',Validators.required],
        costo_unit: ['',Validators.required],
        tipoArticulo: ['',Validators.required],
        conversionUM: ['',Validators.required],
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
      console.log(this.DataArticulos);
      
      this.maestroForm.patchValue({
        description: this.DataArticulos.descripcion,
        costo_unit: this.DataArticulos.costo_unitario,
        tipoArticulo: this.DataArticulos.tipoId,
        conversionUM: this.DataArticulos.conversionId,
      });
  }
  


  DataEntidad(entidad?:any){
    this.EntidadEliminar = entidad
  }

  // <============ Guardar Tipo ==========>
  guardarNuevoMaetro(){
    this.maestroNuevo = {
      descripcion: this.maestroForm.value.description,
      costo_unitario: this.maestroForm.value.costo_unit,
      tipoArticulo: this.maestroForm.value.tipoArticulo,
      conversionUM: this.maestroForm.value.conversionUM,
    }
   if(this.DataArticulos.editar === true){
    this.maestroArticulosService.update(this.DataArticulos.id, this.maestroNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)
      this.toastr.success('Tipo de Articulo Actualizado', 'Exito');
    });
   } else{
    try {
      this.maestroArticulosService.create(this.maestroNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)

        this.toastr.success('Tipo de Articulo Creado', 'Exito');

      });
      
    } catch (error) {
      console.log(error);
    }
   }
  }


  // <============ Eliminar Tipo ==========>
  EliminarArticulo(){
    this.maestroArticulosService.delete(this.EntidadEliminar.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Tipo de Articulo Eliminado', 'Exito');
    })
  }

  applyFilter(event: any): void {
    const value = event.target.value;
    
    this.filteredMaestro = this.listMaestro.filter(insumo => {
      return insumo.descripcion.toLowerCase().includes(value.toLowerCase());
    });
  }


}
