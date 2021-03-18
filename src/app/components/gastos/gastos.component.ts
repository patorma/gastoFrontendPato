import { Component, OnInit,SimpleChanges } from '@angular/core';
import { Gasto } from './gasto';
import { GastoService } from '../../services/gasto.service';
import { ActivatedRoute,Router } from '@angular/router';
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
  valor: Gasto;
  valor2: any;
  cantidad: any;
  mes: number;
  ano: number;
  public errores: string[];

  constructor(
    private gastoService: GastoService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private router: Router
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
            let valorTotal: number = 0;
            console.log('GastosComponent: tap 3');
            (response.content as Gasto[]).forEach((gasto) => {
              console.log('aca inicia la prueba')
              console.log(gasto.nombre);
              console.log(gasto.valor);
              console.log('hola aca probando')

            });
          }) //response.content lista de objeto gastos y se asigna al atributo gasto
        )
        .subscribe((response) => {
          this.gastos = response.content as Gasto[];
          this.paginador = response;
          
         
        }
      
        )

    }),
    this.gastoService.getTotal().subscribe((result) =>
    {
      this.valor = result
      console.log('aca va el valor total')
      console.log(this.valor)
    }),

    this.gastoService.getCantidad().subscribe((result) =>{
      this.cantidad = result
    })
    
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
  getGastoTotal(){
    let valorTotal: number = 0;
   
    
    if(this.gastos){

      this.gastos.map(gast =>{
        valorTotal += gast.valor
      })
    }
    console.log(valorTotal)
    return valorTotal
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
