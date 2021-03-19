import { GastoService } from './../../services/gasto.service';
import { Component, OnInit,Input } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  mes: number;
  ano: number;
  public errores: string[];
  valor2: any;

  // @Input() valor: number;
  // @Input() ano:number;
  // valor:any;

  constructor(private gastoService: GastoService, private router: Router) { }

  ngOnInit(): void {

    // this.gastoService.getFiltro(this.mes,this.ano).subscribe(
    //   (result) =>{
    //     this.valor = result
    //     console.log('aca va el valor total')
    //      console.log(this.valor)
    //   }
    // )
  }
 
   public filtro(): void {

    if(this.mes && this.ano){
    
    //  if(isNaN(this.mes) || isNaN(this.ano)){
    //   //  this.router.navigate(['/gastos']);
    //   swal.fire(
    //     'error',
    //     ` ingrese valores`,
    //     'warning'
    //   );
    //   this.mes = 0
    //   this.ano = 0
      
    //   this.router.navigate(['/gastos']);
    //  } 
   
    this.gastoService.getFiltro(this.mes,this.ano).subscribe(
      (result) =>{
        this.router.navigate(['/gastos']);

        
        this.valor2 = result
        console.log('aca va el valor total')
         console.log(this.valor2)
         swal.fire(
          'Busqueda exitosa',
          ` El total del mes ${this.mes} y del año ${this.ano} es:  ${this.valor2}`,
          'success'
        );
      },
      (err) =>{
        // error es el atributo del objeto error que contiene el json
       // y pásamos los errores en el parametro errors
       // como errors (ver backend) es any  se convierte a un arreglo de string
       // lo anterior es opcional es para que el codigo sea más estricto
       this.errores = err.error.errors as string[];
       console.error("Codigo del error desde el backend: " + err.status);
       console.error(err.error.errors);
     }
    )
    
  }else  {
    swal.fire(
      'error',
      ` ingrese solo valores númericos`,
      'warning'
    );
    console.log('error')
  }
  }


}
