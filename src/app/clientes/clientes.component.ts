import { Component, OnInit } from '@angular/core';
import { Cliente } from './Cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  // inyeccion de dependencia 
  //(es igual a poner dentro del contructor -> this.cleitneService = clienteServide)
  constructor(private clienteService: ClienteService) { }

  clientes: Cliente[];

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clienteStream => this.clientes = clienteStream
      //con subscribe, obtener el objeto del observable y se lo asignamos a this.cliente
    );
  }

  public delete(cliente:Cliente):void{
    const swalBoton = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalBoton.fire({
      title: 'Estas Seguro?',
      text: "Seguro que desea eliminar al cliente "+cliente.apellido,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
            this.clientes = this.clientes.filter(cli => cli!== cliente)
          }
        )
        swalBoton.fire(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        )
      }
    })
  }
}
