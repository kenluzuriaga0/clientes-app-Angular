import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './Cliente';
import { ClienteService } from './cliente.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Cliente";

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cliente = new Cliente();
    this.cargarCliente(); //se lo coloca aqui para que se ejecute cuando cargue el componente
  }

  public cargarCliente(): void { //activatedRoute es para obtener el param del link
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getOneClientes(id).subscribe(clie => this.cliente = clie)
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo Cliente', `Cliente ${cliente.nombre} creado con exito`, 'success');
      });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente actualizado', `Cliente ${cliente.nombre} actualizado con exito`, 'success')
    })
  }
  
}

