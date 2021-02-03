import { Component, OnInit } from '@angular/core';
import { Gasto } from './gasto';
import { GastoService } from '../../services/gasto.service';
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public gasto: Gasto = new Gasto();
  public titulo: string = "Crear gasto"; 
  public errores: string[];

  constructor(private gastoService: GastoService,private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarGasto();
  }

  cargarGasto(): void {
      /*Recibe como argumento los parametros en subscribe */
      /*en subscribe se ejecyta mostrar gatos de gastos */
      this.activatedRoute.params.subscribe((params) =>{
        let id = params['id'];
        if(id){
          this.gastoService
            .getGasto(id)
            .subscribe((gasto) => (this.gasto = gasto))
        }
      })
  }

  public create(): void{
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
      }
    )

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

}
