import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Gasto } from '../components/gastos/gasto';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  private urlEndPoint: string = 'http://localhost:8080/api/gastos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  private isNoAutorizado(e): boolean {
      if (e.status == 401 || e.status == 403){
          this.router.navigate(['/login']);
          return true;
      } 
      return false;
    
  }

  // getTipo(): Observable<Tipo[]> {
  //   return this.http.get<Tipo[]>(this.urlEndPoint);
  // }

  // getGastosTotal():  Observable<any>{
  //   return this.http.get(`${this.urlEndPoint}`).pipe(
  //     tap((response: any) => {
  //       // tomamos las respuesta y se la asignamos a la variable gastos
  //       console.log('GastoService: tap 1');
  //       (response as Gasto[]).forEach((gasto) => {
  //         // se mostrara los datos de cada gasto
  //         console.log(gasto.nombre);
  //         console.log(gasto.valor);
  //         console.log(gasto.tipo);
  //       });
  //     }),
  //     map((response: any) => {
  //       // se usa el metodo map del arreglo gastos
  //       // se modifica los valores internos o cada item del array
  //       (response as Gasto[]).map((gasto) => {
  //         //pasa a mayuscula el nombre del gasto
  //         gasto.nombre = gasto.nombre.toUpperCase();
  //         // se retorna el gasto modificado
  //         return gasto;
  //       });
  //       return response;
  //     })

  //   )

  // }

  getTotal(): Observable<any>{
    return this.http.get<any>(this.urlEndPoint + "/valor").pipe(
      (result) => result
      
     
    )
    
  }

  getCantidad():  Observable<any>{
    return this.http.get<any>(this.urlEndPoint +"/cantidad" ).pipe(
      (result) => result
     
    )
  }

  getFiltro(mes: number,ano: number):  Observable<any>{
    if(isNaN(mes) || isNaN(ano)){
      swal.fire(
        'Error',
        `Ingresar datos`,
        'warning'
      );
    }
    return this.http.get<any>(`${this.urlEndPoint}/filtrarValor/${mes}/${ano}`).pipe(
      (result) => result,
      catchError((e) => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        // el estado 400 viene de la validacion, un bad request
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )

  }

  getGastos(page: number): Observable<any> {
    /*se hace un cast porque devuelve un observable de gasto*/
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      tap((response: any) => {
        // tomamos las respuesta y se la asignamos a la variable gastos
        console.log('GastoService: tap 1');
        (response.content as Gasto[]).forEach((gasto) => {
          // se mostrara los datos de cada gasto
          console.log(gasto.nombre);
          console.log(gasto.valor);
          console.log(gasto.tipo);
        });
      }),
      // se transforma a gastos
      map((response: any) => {
        // se usa el metodo map del arreglo gastos
        // se modifica los valores internos o cada item del array
        (response.content as Gasto[]).map((gasto) => {
          //pasa a mayuscula el nombre del gasto
          gasto.nombre = gasto.nombre.toUpperCase();
          // se retorna el gasto modificado
          return gasto;
        });
        return response;
      }),
      tap((response) => {
        console.log('GastoService: tap 2');
        (response.content as Gasto[]).forEach((gasto) => {
          // se mostrara los datos de cada gasto
          console.log(gasto.nombre);
        });
      })
    );
  }

  create(gasto: Gasto): Observable<Gasto> {
    return this.http
      .post(this.urlEndPoint, gasto, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.gasto as Gasto),
        catchError(e => {
          if(this.isNoAutorizado(e)){
            return throwError(e);
          }
          // el estado 400 viene de la validacion, un bad request
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
  getGasto(id): Observable<Gasto> {
    return this.http.get<Gasto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {

        if (this.isNoAutorizado(e)){
          return throwError(e);
        }
        /*capturamos el error y redirigimos a gastos*/
        this.router.navigate(['/gastos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(gasto: Gasto): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${gasto.id}`, gasto, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)){
            return throwError(e);
          }

          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Gasto> {
    return this.http
      .delete<Gasto>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {

          if (this.isNoAutorizado(e)){
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
