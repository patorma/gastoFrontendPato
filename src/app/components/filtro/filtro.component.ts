import { GastoService } from './../../services/gasto.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  @Input() valor: number;
  // @Input() ano:number;
  // valor:any;

  constructor(private gastoService: GastoService) { }

  ngOnInit(): void {

    // this.gastoService.getFiltro(this.mes,this.ano).subscribe(
    //   (result) =>{
    //     this.valor = result
    //     console.log('aca va el valor total')
    //      console.log(this.valor)
    //   }
    // )
  }



}
