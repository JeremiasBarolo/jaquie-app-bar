import {  Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
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

