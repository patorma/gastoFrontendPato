import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Nota } from '../components/notas/nota.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  // url a la que nos conectaremos
  private urlEndPoint: string = 'http://localhost:8080/api/notas';

  //cabeceras de la peticion
  // private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  // private agregarAuthorizationHeader() {
  //   let token = this.authService.token;
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  //   }

  //   return this.httpHeaders;
  // }

  // private isNoAutorizado(e): boolean {
  //   if (e.status === 401 ) {
  //     this.router.navigate(['/login']);
  //     return true;
  //   }

  //   if ( e.status === 403) {
  //     swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,'warning');
  //     this.router.navigate(['/notas']);
  //     return true;
  //   }
  //   return false;
  // }

  getNotas(page: number): Observable<any> {
    /*se hace un cast porque devuelve un observable de notas*/
    /** con pipe se recupera cada uno de los elementos de la coleccion
    para iterar cada uno de los elementos */
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      tap((response: any) => {
        // tomamos las respuesta y se la asignamos a la variable notas
        console.log('NotaService: tap 1');
        (response.content as Nota[]).forEach((nota) => {
          // se mostrara los datos de cada nota
          console.log(nota.titulo);
          console.log(nota.descripcion);
          console.log(nota.estado);
          console.log(nota.fechaCreacion);
        });
      }),
      // se transforma a notas
      map((response: any) => {
        // se usa el metodo map del arreglo notas
        // se modifica los valores internos o cada item del array
        (response.content as Nota[]).map((nota) => {
          //pasa a mayuscula el titulo de la nota
          nota.titulo = nota.titulo.toUpperCase();
          // se retorna la nota modificado
          return nota;
        });
        return response;
      }),
      tap((response) => {
        console.log('NotaService: tap 2');
        (response.content as Nota[]).forEach((nota) => {
          // se mostrara los datos de cada nota
          console.log(nota.titulo);
        });
      })
    );
  }

  create(nota: Nota): Observable<Nota> {
    return this.http
      .post(this.urlEndPoint, nota)
      .pipe(
        map((response: any) => response.nota as Nota),
        catchError((e) => {
          
          // el estado 400 viene de la validacion, un bad request
          if (e.status === 400) {
            return throwError(e);
          }
          if(e.error.mensaje){
            console.error(e.error.mensaje);
            }
          return throwError(e);
        })
      );
  }

  getNota(id): Observable<Nota> {
    return this.http
      .get<Nota>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
         
          /*capturamos el error y redirigimos a notas*/
          if(e.status != 401 && e.error.mensaje){
            this.router.navigate(['/notas']);
            console.error(e.error.mensaje);
          }
         
          return throwError(e);
        })
      );
  }

  update(nota: Nota): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${nota.id}`, nota)
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          if(e.error.mensaje){
            console.error(e.error.mensaje);
            }
      
          return throwError(e);
        })
      );
  }
  delete(id: number): Observable<Nota> {
    return this.http
      .delete<Nota>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
         
          if(e.error.mensaje){
            console.error(e.error.mensaje);
            }
          return throwError(e);
        })
      );
  }
}
