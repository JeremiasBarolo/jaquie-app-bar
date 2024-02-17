import { Component, OnInit } from '@angular/core';
import { ConversionUmService } from '../../../services/conversion-um.service';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';
import { TipoArticulosService } from '../../../services/tipo-articulos.service';
import { DisponibilidadArticulosService } from '../../../services/disponibilidad-articulos.service';
import { reduce } from 'rxjs';
import { RecetasService } from '../../../services/recetas.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrl: './recetas.component.css'
})
export class RecetasComponent {
  breadcrumbItems: string[] = ['Recetas','Inicio', 'Recetas'];
  listMaestro: any[] = [];
  conversionUm: any[] = [];
  RecetaForm!: FormGroup; 
  sumarForm!: FormGroup;
  recetaNueva: any;
  conversionNuevo:any;
  
  DataArticulos: any={
    editar:false
  }
  DataConversion:any ={
    editar:false
  }
  EntidadEliminar:any
  listRecetas:any[] = []
  listDisponibilidad:any[] = []
  dataModal:any={}
  cantidadNueva: any
  


  constructor(
    private maestroArticulosService:MaestroArticulosService,
    private disponibilidadService:DisponibilidadArticulosService,
    private recetasService:RecetasService,
    private fb: FormBuilder,
    private toastr: ToastrService
    
    
    ){}


  ngOnInit(): void {

      this.maestroArticulosService.getAll().subscribe(maestros => {
        maestros.forEach(maestro => {
          if(maestro.tipo_articulo.description === 'Productos Elaborados'){
            this.listMaestro.push(maestro)
          }
        })
        
      })
      this.recetasService.getAll().subscribe(data => {
        this.listRecetas = data;
      })
      this.disponibilidadService.getAll().subscribe(data => {
        this.listDisponibilidad = data;
      })



      this.RecetaForm = this.fb.group({
        cant_fisica: ['',Validators.required],
        cant_necesaria: ['',Validators.required],
        n_linea: ['',Validators.required],
        maestro: ['',Validators.required],
        disponibilidad: ['',Validators.required],
      });

      
  }


  
  showCardDetails(card: any) {
    this.dataModal = card
    console.log(this.dataModal);
  }

  editarTipo(card: any) {  
      this.DataArticulos = {...card, editar:true};  
      console.log(this.DataArticulos);
      
      this.RecetaForm.patchValue({
        cant_fisica: this.DataArticulos.cant_fisica,
        cant_necesaria: this.DataArticulos.cant_necesaria,
        n_linea: this.DataArticulos.n_linea,
        disponibilidad: this.DataArticulos.articuloId,
        maestro: this.DataArticulos.maestroId,
        
      });
  }
  


  DataEntidad(entidad?:any){
    this.EntidadEliminar = entidad
  }


  // <============ Eliminar Tipo ==========>
  RecetaArticulo(){
    this.recetasService.delete(this.EntidadEliminar.id).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Receta Eliminado', 'Exito');
    })
  }

  
}
