import { Component, OnInit } from '@angular/core';
import { Nota } from './nota.model';
import { NotaService } from '../../services/nota.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  notas: Nota[];
  paginador: any;

  constructor(
    private notaServicio: NotaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // paramMap se encarga de observar entonces se subscribe
    // esto se encarga de subscribirse a un observador
    this.activatedRoute.paramMap.subscribe((params) =>{
      // el operador suma convierte el string en number
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
       // notas es un observador va hacer observado por observadores, aca se subscribe ,
      // y en el metodo subscribe el observador seria asignar el atributo notas el valor
      // que se recibe del notaservicio, que seria el listado de notas con los cambios
      this.notaServicio
      .getNotas(page)
      .pipe(
        tap((response) =>{
          console.log('NotasComponent: tap 3');
          (response.content as Nota[]).map(nota  =>{
            console.log(nota.titulo)
          })
        })//response.content lista de objeto notas y se asigna al atributo notas
      )
      .subscribe(response =>{
        this.notas =  response.content as Nota[]
        this.paginador = response;
      })
    })
  }

  public delete(nota: Nota): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
    .fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la nota de titulo: ${nota.titulo}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    })
    .then((result) =>{
      if (result.value){
        this.notaServicio.delete(nota.id).subscribe((response) =>{
          this.notas = this.notas.filter(not => not !== nota);
          swalWithBootstrapButtons.fire(
            'Nota eliminada!',
            `Nota ${nota.titulo} eliminada con éxito.`,
            'success'
          )
        });
      }
    });

  }

}
