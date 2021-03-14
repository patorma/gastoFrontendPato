import { Component, OnInit } from '@angular/core';
import { Nota } from './nota.model';
import { NotaService } from '../../services/nota.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-nota',
  templateUrl: './form-nota.component.html',
  styleUrls: ['./form-nota.component.css']
})
export class FormNotaComponent implements OnInit {

  public nota: Nota = new Nota();
  public tituloNota: string = "Crear nota";
  public errores: string[]; 

   // ActivatedRoute muestra la informacion que contiene la ruta hasta con los datos
  constructor(private notaServicio: NotaService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.cargarNota()
  }

  cargarNota(): void {
     /*Recibe como argumento los parametros en subscribe */
      /*en subscribe se ejecuta mostrar notas de notas */
      this.activatedRoute.params.subscribe((params) =>{
        let id = params['id'];
        if(id){
          this.notaServicio
          .getNota(id)
          .subscribe((nota) => (this.nota = nota))
        }
      }) 
  }

  public create(): void {
    console.log(this.nota)
    this.notaServicio.create(this.nota).subscribe(
      (nota) =>{
        
        this.router.navigate(['/notas']);
        swal.fire(
          'Nueva Nota',
          `La nota ${nota.titulo} ha sido creada con éxito!`,
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
    console.log(this.nota)
    this.notaServicio.update(this.nota).subscribe(
      (response) =>{
        this.router.navigate(['/notas']);
        swal.fire(
          'Nota Actualizada',
          `${response.mensaje}: ${response.nota.titulo}`,
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
