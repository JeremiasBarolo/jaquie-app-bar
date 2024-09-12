import { Component, OnInit } from '@angular/core';
import { ConversionUmService } from '../../../services/conversion-um.service';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaestroArticulosService } from '../../../services/maestro-articulos.service';
import { TipoArticulosService } from '../../../services/tipo-articulos.service';
import { DisponibilidadArticulosService } from '../../../services/disponibilidad-articulos.service';
import { Subject, reduce, takeUntil } from 'rxjs';
import { RecetasService } from '../../../services/recetas.service';
import { BebidasService } from '../../../services/bebidas.service';
import { Router } from '@angular/router';
import { CrearEditarComponent } from './crear-editar/crear-editar.component';

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
  accionBebida:string = 'bebida'
  accionReceta:string = 'receta'
  
  DataArticulos: any={
    editar:false
  }
  DataConversion:any ={
    editar:false
  }
  EntidadEliminar:any
  listRecetas:any[] = []
  listDisponibilidad:any[] = []
  listBebidas:any[] = []
  dataModal:any={}
  cantidadNueva: any
  tipoRecetaSeleccionada: string | undefined;
  private destroy$ = new Subject<void>(); 
  recetaList: any[] =[]


  constructor(
    private maestroArticulosService:MaestroArticulosService,
    private disponibilidadService:DisponibilidadArticulosService,
    private bebidasService:BebidasService, 
    private recetasService:RecetasService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
    
    
    ){}


  ngOnInit(): void {

      this.maestroArticulosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(maestros => {
        maestros.forEach(maestro => {
          if(maestro.tipo_articulo.description === 'Productos Elaborados' && maestro.receta.length !== 0){
            this.listMaestro.push(maestro)
          }
        })
        
      })
      this.recetasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.listRecetas = data
      })

      this.bebidasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.listBebidas = data
      })

      this.disponibilidadService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.listDisponibilidad = data;
      })

      console.log(this.listBebidas);
      

      this.RecetaForm = this.fb.group({
        cant_fisica: ['',Validators.required],
        cant_necesaria: ['',Validators.required],
        n_linea: ['',Validators.required],
        maestro: ['',Validators.required],
        disponibilidad: ['',Validators.required],
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
    this.recetasService.delete(this.EntidadEliminar.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Receta Eliminado', 'Exito');
    })
  }

  // <============ Eliminar Tipo ==========>
    eliminarBebida(){
      this.bebidasService.delete(this.EntidadEliminar.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
        setTimeout(() => {
          window.location.reload();
        }, 600)
  
        this.toastr.success('Receta Eliminado', 'Exito');
      })
    }


    Reenviar(){
      console.log(this.tipoRecetaSeleccionada);
      
      if(this.tipoRecetaSeleccionada === this.accionReceta){
        this.router.navigate(['admin/recetas/crear-editar', this.accionReceta]);
      }else{
        this.router.navigate(['admin/recetas/crear-editar', this.accionBebida]);
      }
    }

    redirectCrearElaborado(receta:any){
      if (receta && receta.receta && receta.receta.length === 0) {
        this.router.navigate(['admin/recetas/crear-editar', this.accionReceta]);
      }else{
        this.router.navigate(['admin/recetas/crear-editar', this.accionReceta, receta.id]);
      }
    
    }

    prepareRecetaData(tipo:any) {
      const receta = [];
      
      if (tipo.PrimerComponenteArticulo) {
        receta.push({
          descripcion: tipo.PrimerComponenteArticulo.descripcion,
          cantidadNecesaria: tipo.primerComponenteCantidad
        });
      }
      
      if (tipo.SegundoComponenteArticulo) {
        receta.push({
          descripcion: tipo.SegundoComponenteArticulo.descripcion,
          cantidadNecesaria: tipo.segundoComponenteCantidad
        });
      }
      
      if (tipo.TercerComponenteArticulo) {
        receta.push({
          descripcion: tipo.TercerComponenteArticulo.descripcion,
          cantidadNecesaria: tipo.tercerComponenteCantidad
        });
      }
      
      if (tipo.CuartoComponenteArticulo) {
        receta.push({
          descripcion: tipo.CuartoComponenteArticulo.descripcion,
          cantidadNecesaria: tipo.cuartoComponenteCantidad
        });
      }
      
      if (tipo.QuintoComponenteArticulo) {
        receta.push({
          descripcion: tipo.QuintoComponenteArticulo.descripcion,
          cantidadNecesaria: tipo.quintoComponenteCantidad
        });
      }
      
    
      
      this.recetaList = receta;

      console.log(this.dataModal.receta);
      
    }
  
    
    onModalShow(tipo:any) {
      
      
      this.prepareRecetaData(tipo);
      this.dataModal = tipo
    }
}
  

