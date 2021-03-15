import { Component, OnInit ,Input,OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {

  @Input() paginador: any;


  paginas: number[];

  desde: number;
  hasta: number;

  // ngOnInit() se ejecuta solo una vez
// se calculará el rango para la primera pagina solamente 
// en ngOnChanges para las subsiguientes

  constructor() {}

  ngOnInit(): void {
    this.initPaginator();
  }
// a través de los changes podemos obtener el cambio del objeto @input del paginador(variable)
ngOnChanges(changes: SimpleChanges){
    // obtenemos cambios del paginador 
    let paginadorActualizado = changes['paginador'];
    // preguntamos si paginadorActualizado tiene un estado  anterior
    // solamente si tiene un estado anterior, haya cambiado
    if(paginadorActualizado.previousValue){
      // ahi invocamos el:
      this.initPaginator();
    }
}

  private initPaginator(): void {
    // se calcula el desde y hata para calcular el rango a mostrar en el paginador
    // en desde habran dos calculos
    // primer parametro de desde el maximo entre  y nuestra pagina actual menos 4 y segundo parametro totaldepaginas-5
    // min [max (el minimo que podria tener el desde  y la pagina actual-4)]
    // la pagina actual la obtenemos del paginador a traves del atributo number

    this.desde = Math.min( Math.max(1, this.paginador.number-4), this.paginador.totalPages-5);
    // max[el minimo entre el total de paginas y nuestra pagina actual + 4]
    this.hasta = Math.max(Math.min(this.paginador.totalPages,this.paginador.number+4), 6);

    if(this.paginador.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor,indice) => indice + this.desde);
    } else {
    //  en el contructor(Array) el numero de elementos, 
    // totalPages(este atributo contiene el total de paginas 
    // que existe dentro de los atributos del  paginador) 
    // se llena este arreglo con un valor por defecto
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice + 1);
  }
  }
}
