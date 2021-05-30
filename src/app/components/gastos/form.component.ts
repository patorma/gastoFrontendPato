import { Component, OnInit } from '@angular/core';
import { Gasto } from './gasto';
import { GastoService } from '../../services/gasto.service';
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { Tipo } from '../tipos/Tipo';
import { Local } from '../locales/Local';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public gasto: Gasto = new Gasto();
  public titulo: string = "Crear gasto"; 
  public errores: string[];
  tipos: Tipo[];
  locales: Local[];
  //datos:string[];



  constructor(private gastoService: GastoService,private router: Router,
    private activatedRoute: ActivatedRoute) {
      //this.datos =['GASTO_COMUN','OTROS']
     }

  ngOnInit(): void {

    this.cargarGasto();
  }

  cargarGasto(): void {
      /*Recibe como argumento los parametros en subscribe */
      /*en subscribe se ejecuta mostrar gatos de gastos */
      this.activatedRoute.params.subscribe((params) =>{
        let id = params['id'];
        if(id){
          this.gastoService
            .getGasto(id)
            .subscribe((gasto) => (this.gasto = gasto))
        }
      });
      this.gastoService
        .getTipo()
        .subscribe((tipos) => (this.tipos = tipos));

      this.gastoService
       .getLocal()
       .subscribe(locales => this.locales = locales);

  }

  public create(): void{
    if(this.gasto.valor){
    console.log(this.gasto);

    this.gastoService.create(this.gasto).subscribe(
      (gasto) =>{
        this.router.navigate(['/gastos']);
        swal.fire(
          'Nuevo Gasto',
          `El gasto ${gasto.nombre} ha sido creado con éxito!`,
          'success'
        );
      },
      (err) => {
         // error es el atributo del objeto error que contiene el json
        // y pásamos los errores en el parametro errors
        // como errors (ver backend) es any se convierte a un arreglo de string
        // lo anterior es opcional es para que el codigo sea más estricto
        // con as se lo asignamos a un arreglo de string
        this.errores = err.error.errors as string[]
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
        swal.fire(
          'Error',
          'Ya existe ese nombre de gasto en el sistema',
          'error'
        )
      }
    )

    }else  {
      swal.fire(
        'error',
        ` Debe ingresar datos y solo valores númericos en valor`,
        'warning'
      );

    }
      

  }

  update():void {
    console.log(this.gasto);
    this.gastoService.update(this.gasto).subscribe(
      (response) => {
        this.router.navigate(['/gastos']);
        swal.fire(
          'Gasto Actualizado',
          `${response.mensaje}: ${response.gasto.nombre}`,
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
  }

    // el primer objeto corresponde a cada una de los tipos del ng
  // el segundo objeto es el objeto asignado al gasto y ahi hay que comparar
  compararTipo(o1: Tipo, o2: Tipo) : boolean{
     // se compara el objeto 1 y el objeto 2
    // si es undefined se deja marcado el seleccionar con un mensaje
    if (o1  ===  undefined &&  o2  ===  undefined ){
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }

  // el primer objeto corresponde a cada una de los locales del ng
  // el segundo objeto es el objeto asignado al gasto y ahi hay que comparar
  compararLocal(o1: Local, o2: Local): boolean{
      // se compara el objeto 1 y el objeto 2
    // si es undefined se deja marcado el seleccionar con un mensaje
    if (o1  ===  undefined &&  o2  ===  undefined ){
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
