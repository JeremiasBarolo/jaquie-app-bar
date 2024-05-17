import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoArticulosService } from '../../../services/tipo-articulos.service';
import { ConversionUmService } from '../../../services/conversion-um.service';
import {NgIf} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Table } from 'primeng/table';
import { PersonasService } from '../../../services/personas.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  breadcrumbItems: string[] = ['Personas y Usuarios','Inicio', 'Personas y Usuarios'];
  personas: any[] = [];
  filteredPersonas: any[] = [];
  usuarios: any[] = [];
  filteredUsuarios: any[] = [];
  personaForm!: FormGroup;
  usuarioForm!: FormGroup;
  tipoArtiuculoNuevo: any;
  usuarioNuevo:any;
  DataArticulos: any={
    editar:false
  }
  DataConversion:any ={
    editar:false
  }
  EntidadEliminar:any
  @ViewChild('dt')
  table!: Table; 
  private destroy$ = new Subject<void>();


  constructor(
    private personasService:PersonasService,
    private usuariosService:UsuariosService,
    private fb: FormBuilder,
    private toastr: ToastrService
    
    
    ){}


  ngOnInit(): void {

      this.usuariosService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.usuarios = data;
        this.filteredUsuarios = [...this.usuarios];
      })

      this.personasService.getAll().pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.personas = data;
        this.filteredPersonas = [...this.personas];
      })

      this.personaForm = this.fb.group({
        name: ['',Validators.required],
        lastname: ['',Validators.required],
        dni: ['',Validators.required],
        phone: ['',Validators.required],
      });

      this.usuarioForm = this.fb.group({
        username: ['',Validators.required],
        password: ['',Validators.required],
        personaId: ['',Validators.required],
        rol: ['',Validators.required],
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
  editarPersona(card: any) {  
      this.DataArticulos = {...card, editar:true};  
      console.log(this.DataArticulos);
      
      this.personaForm.patchValue({
        name: this.DataArticulos.name,
        lastname: this.DataArticulos.lastname,
        dni: this.DataArticulos.dni,
        phone: this.DataArticulos.phone
      });
  }

  editarUsuario(card?: any) {
    this.DataConversion = {...card, editar:true};  
    console.log(this.DataConversion);
    
    this.usuarioForm.patchValue({
      username: this.DataConversion.username,
      password: this.DataConversion.password,
      personaId: this.DataConversion.personaId,
      rol: this.DataConversion.rol,
      
    });
  }

  DataEntidad(entidad?:any){
    this.EntidadEliminar = entidad
  }

  // <============ Guardar persona ==========>
  guardarNuevaPersona(){
    this.tipoArtiuculoNuevo = this.personaForm.value
   if(this.DataArticulos.editar === true){
    this.personasService.update(this.DataArticulos.id, this.tipoArtiuculoNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)
      this.toastr.success('Tipo de Articulo Actualizado', 'Exito');
    });
   } else{
    try {
      this.personasService.create(this.tipoArtiuculoNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
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


  // <============ Eliminar persona ==========>
  EliminarPersona(){
    this.personasService.delete(this.EntidadEliminar.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Tipo de Articulo Eliminado', 'Exito');
    })
  }

 // <============ Guardar Usuario ==========>
  guardarNuevaConversion(){
    this.usuarioNuevo = this.usuarioForm.value

   if(this.DataConversion.editar === true){
    this.usuariosService.update(this.DataConversion.id, this.usuarioNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Conversion Actualizado', 'Exito');
    });
   } else{
    try {
      this.usuariosService.create(this.usuarioNuevo).pipe(takeUntil(this.destroy$)).subscribe(() => {
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


 // <============ Eliminar Usuario ==========>
  EliminarUsuario(){
    this.usuariosService.delete(this.EntidadEliminar.id).pipe(takeUntil(this.destroy$)).subscribe(() => {
      setTimeout(() => {
        window.location.reload();
      }, 600)

      this.toastr.success('Conversion Eliminada', 'Exito');
    })
  }


  applyFilterPersonas(event: any): void {
    const value = event.target.value;
    
    this.filteredPersonas = this.personas.filter(persona => {
      return persona.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  applyFilterUsuarios(event: any): void {
    const value = event.target.value;
    
    this.filteredUsuarios = this.usuarios.filter(usuarios => {
      return usuarios.username.toLowerCase().includes(value.toLowerCase());
    });
  }
}
