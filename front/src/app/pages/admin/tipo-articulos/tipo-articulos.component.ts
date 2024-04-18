import { Component, OnInit } from '@angular/core';
import { TipoArticulosService } from '../../../services/tipo-articulos.service';
import { ConversionUmService } from '../../../services/conversion-um.service';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tipo-articulos',
  templateUrl: './tipo-articulos.component.html',
  styleUrl: './tipo-articulos.component.css'
})
export class TipoArticulosComponent implements OnInit{
  breadcrumbItems: string[] = ['Padrones','Inicio', 'Padrones'];
  tipoArticulos: any[] = [];
  conversionUm: any[] = [];
  filteredTipo: any[] = [];
  filteredUnidades: any[] = [];
  tipoForm!: FormGroup;
  conversionForm!: FormGroup;
  tipoArtiuculoNuevo: any;
  conversionNuevo:any;
  DataArticulos: any={
    editar:false
  }
  DataConversion:any ={
    editar:false
  }
  EntidadEliminar:any


  constructor(
    private tipoArticulosService:TipoArticulosService,
    private conversionUmService:ConversionUmService,
    private fb: FormBuilder,
    private toastr: ToastrService
    
    
    ){}


  ngOnInit(): void {

      this.conversionUmService.getAll().subscribe(data => {
        this.conversionUm = data;
        this.filteredUnidades = [...this.conversionUm];

      })

      this.tipoArticulosService.getAll().subscribe(data => {
        this.tipoArticulos = data;
        this.filteredTipo = [...this.tipoArticulos];
      })

      this.tipoForm = this.fb.group({
        description: ['',Validators.required]
      });

      this.conversionForm = this.fb.group({
        uni_medida: ['',Validators.required],
        seg_umedida: ['',Validators.required],
        cant_principal: ['',Validators.required],
        cant_secundaria: ['',Validators.required],
      });
  }

  editarTipo(card: any) {  
      this.DataArticulos = {...card, editar:true};  
      console.log(this.DataArticulos);
      
      this.tipoForm.patchValue({
        description: this.DataArticulos.description
      });
  }

  editarConversion(card?: any) {
    this.DataConversion = {...card, editar:true};  
    console.log(this.DataConversion);
    
    this.conversionForm.patchValue({
      uni_medida: this.DataConversion.uni_medida,
      seg_umedida: this.DataConversion.seg_umedida,
      cant_principal: this.DataConversion.cant_principal,
      cant_secundaria: this.DataConversion.cant_secundaria,
      
    });
  }

  DataEntidad(entidad?:any){
    this.EntidadEliminar = entidad
  }

  // <============ Guardar Tipo ==========>
  guardarNuevoTipo(){
    this.tipoArtiuculoNuevo = {
      description: this.tipoForm.value.description
    }
   if(this.DataArticulos.editar === true){
    this.tipoArticulosService.update(this.DataArticulos.id, this.tipoArtiuculoNuevo).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)
      this.toastr.success('Tipo de Articulo Actualizado', 'Exito');
    });
   } else{
    try {
      this.tipoArticulosService.create(this.tipoArtiuculoNuevo).subscribe(() => {
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
    this.tipoArticulosService.delete(this.EntidadEliminar.id).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Tipo de Articulo Eliminado', 'Exito');
    })
  }

 // <============ Guardar Conversion ==========>
  guardarNuevaConversion(){
    this.conversionNuevo = {
      uni_medida: this.conversionForm.value.uni_medida,
      seg_umedida: this.conversionForm.value.seg_umedida,
      cant_principal: this.conversionForm.value.cant_principal, 
      cant_secundaria: this.conversionForm.value.cant_secundaria,
    }
   if(this.DataConversion.editar === true){
    this.conversionUmService.update(this.DataConversion.id, this.conversionNuevo).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Conversion Actualizado', 'Exito');
    });
   } else{
    try {
      this.conversionUmService.create(this.conversionNuevo).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)

        this.toastr.success('Conversion Creado', 'Exito');

      });
      
    } catch (error) {
      console.log(error);
    }
   }
  }


 // <============ Eliminar Conversion ==========>
  EliminarConversion(){
    this.conversionUmService.delete(this.EntidadEliminar.id).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Conversion Eliminada', 'Exito');
    })
  }

  applyFilterUnidades(event: any): void {
    const value = event.target.value;
    
    this.filteredUnidades = this.conversionUm.filter(insumo => {
      return insumo.uni_medida.toLowerCase().includes(value.toLowerCase());
    });
  }

  applyFilterTipo(event: any): void {
    const value = event.target.value;
    
    this.filteredTipo = this.tipoArticulos.filter(insumo => {
      return insumo.description.toLowerCase().includes(value.toLowerCase());
    });
  }
}



