import { Component, OnInit } from '@angular/core';
import { Gasto } from './gasto';
import { GastoService } from '../../services/gasto.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
})
export class GastosComponent implements OnInit {
  gastos: Gasto[];
  paginador: any;
  gastoSeleccionado: Gasto;

  constructor(
    private gastoService: GastoService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    // paramMap se encarga de observar entonces se subscribe
    // esto se encarga de subscribirse a un observador
    this.activatedRoute.paramMap.subscribe((params) => {
      // el operador suma convierte el string en number
      let page: number = +params.get('page');

      if (!page) {
        page = 0;
      }
      // gastos es un observador va hacer observado por observadores, aca se subscribe ,
      // y en el metodo subscribe el observador seria asignar el atributo gastos el valor
      // que se recibe del gastoservice, que seria el listado de gastos con los cambios
      this.gastoService
        .getGastos(page)
        .pipe(
          tap((response) => {
            console.log('GastosComponent: tap 3');
            (response.content as Gasto[]).forEach((gasto) => {
              console.log(gasto.nombre);
            });
          }) //response.content lista de objeto gastos y se asigna al atributo gasto
        )
        .subscribe((response) => {
          this.gastos = response.content as Gasto[];
          this.paginador = response;
        });
    });
  }

  public delete(gasto: Gasto): void {
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
        text: `¿Seguro que desea eliminar el gasto ${gasto.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.gastoService.delete(gasto.id).subscribe((response) => {
            this.gastos = this.gastos.filter((ga) => ga !== gasto);
            swalWithBootstrapButtons.fire(
              'Gasto eliminado!',
              `Gasto ${gasto.nombre} eliminado con éxito.`,
              'success'
            );
          });
        }
      });
  }
  // aca toma el gasto al cual hicimos click y se lo vamos asignar al atributo gastoSeleccionado
  abrirModal(gasto: Gasto) {
    this.gastoSeleccionado = gasto;
    this.modalService.abrirModal();
  }
}
