import { Component, OnInit,Input  } from '@angular/core';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {

  @Input() dato: any;

  constructor() { }

  ngOnInit(): void {
  }

}
