import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  listaCursos:string[]= ['Typescript', 'Java', 'C++'];
  habilitar:boolean=true;

  setHabilitar():void{
    this.habilitar = !this.habilitar;
  }
}
