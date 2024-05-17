import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private http: HttpClient ) { }
  // appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  // private apiUrl = `${this.appSettings.url_api}/bancos`;

  private apiUrl = 'http://localhost:8081/venta';
  
  //get all
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`); 
  }

  // get by id
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
    
  }

  // create
  create(Entity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, Entity)
      
  }

  // update
  update(id: number, Entity: FormData, devolver?:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, {...Entity, devolver:devolver})

  }

  // delete
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

  sumarPedido(id: number): Observable<any> {
    console.log('ase');
    
    return this.http.delete<any>(`http://localhost:8081/pedidosVenta/sumar/${id}`)
  }

  devolverPedido(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8081/pedidosVenta/eliminar/${id}`)
  }
}
