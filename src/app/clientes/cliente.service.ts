import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './Cliente';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = "http://localhost:8080/api/clientes";
  private httpCabecera = new HttpHeaders({'Content-Type': 'application/json'});



  constructor(private http:HttpClient) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint); //dentro del get va el objeto que se castea (devuelve json al principio)
  }
  getOneClientes(id):Observable<Cliente>{
     return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`); //se le añade el parametro id
   }
  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente,{headers:this.httpCabecera}) //la url, body, cabeceras
  }

  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente,{headers:this.httpCabecera});
  }
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers:this.httpCabecera});
  }
}
