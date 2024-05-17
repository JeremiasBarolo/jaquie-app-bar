import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PedidoProduccionService {
  

  constructor(private http: HttpClient, private toastr: ToastrService ) { }
  // appSettings: any = AppSettings.readAppSettings().ValeCaffarato;
  // private apiUrl = `${this.appSettings.url_api}/bancos`;

  private apiUrl = 'http://localhost:8081/pedido_produccion';
  
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
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
      
  }
  

  // update
  update(id: number, Entity: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, Entity)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );

  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = Array.isArray(error.error) ? error.error.join(' ') : error.error;
          this.handleHttpError(errorMessage);
          return throwError(error);
        })
      );
  }

  agregarPedido(id: number, Entity: FormData): Observable<any> {
    
    
    return this.http.put<any>(`http://localhost:8081/agregarPedido/${id}`, Entity)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );

  }

  traerPedidos(id: number): Observable<any> {
    console.log('esoty aca');
    
    return this.http.get<any>(`http://localhost:8081/traerPedidos/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );

  }

  







  private handleHttpError(error: HttpErrorResponse): void {
    if (error.error instanceof ErrorEvent) {
     
      this.toastr.error('Error del lado del cliente: ' + error.error.message);
    } else {
      
      const errorMessages = this.extractErrorMessage(error);
  
      
      errorMessages.forEach((message: string | undefined) => {
        this.toastr.error(message, 'Error', { timeOut: 5000 });
      });
    }
  }

  private extractErrorMessage(error: HttpErrorResponse): string[] {
    if (error.error && error.error.error && error.error.error.length > 0) {
      const firstError = error.error.error[0];
      if (firstError.msg) {
        
        return firstError.msg.split(' , ').filter((message: string) => message.trim() !== '');
      }
    }
    return ['Error desconocido'];
  }
}


