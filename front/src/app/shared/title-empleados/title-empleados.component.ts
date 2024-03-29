import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-empleados',
  templateUrl: './title-empleados.component.html',
  styleUrl: './title-empleados.component.css'
})
export class TitleEmpleadosComponent {
  @Input() titulo: string[] = [];

  title: string = ''
  bc1: string = ''
  bc2: string = ''

  constructor() {
    
  }

  ngOnInit(): void {
    this.title = this.titulo[0]
    this.bc1 = this.titulo[1]
    this.bc2 = this.titulo[2]
  }
}
