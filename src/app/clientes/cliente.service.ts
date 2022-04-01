import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of , throwError} from 'rxjs';
import { Cliente } from './Cliente';
import { CLIENTES } from './clientes.json';
  import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = "http://localhost:8080/api/clientes";
  private httpCabecera = new HttpHeaders({'Content-Type': 'application/json'});



  constructor(private http:HttpClient, private router:Router) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint); //dentro del get va el objeto que se castea (devuelve json al principio)
  }
  getOneClientes(id):Observable<Cliente>{
     return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(catchError(e=>{
       this.router.navigate(['/clientes']);
       Swal.fire("Error al editar", e.error.mensaje,'error');
        return throwError(e)
     })); //se le añade el parametro id
   }
  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post(this.urlEndPoint,cliente,{headers:this.httpCabecera}).pipe( 
      map((response:any) => response.cliente as Cliente), //mapeo manual (se reemplaza por el http.post<Cliente>() )
      catchError(e=>{
        if(e.status==400){ //errores de validaciones
          return throwError(e);
        }
      this.router.navigate(['/clientes']);
      Swal.fire("Error al Crear Cliente", e.error.mensaje,'error');
      return throwError(e);
    })); //la url, body, cabeceras
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente,{headers:this.httpCabecera}).pipe(
      map((response:any)=> response.cliente as Cliente),
      catchError(e=>{
      this.router.navigate(['/clientes']);
      Swal.fire("Error al actualizar Cliente", e.error.mensaje,'error');
      return throwError(e);
    })); //la url, body, cabeceras
  }
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpCabecera});
  }
}
