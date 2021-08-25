import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Usuario } from '../components/usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlEndPoint: string ='http://localhost:8080/api/usuarios';


  constructor(private http: HttpClient,
    private router: Router) { }

  getUsuarios(page: number): Observable<any>{
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      map((response: any) =>{
        (response.content as Usuario[]).map((usuario) =>{
          usuario.nombre = usuario.nombre.toUpperCase();
          usuario.apellido = usuario.apellido.toUpperCase();
          return usuario;
        });
        return response;
      })
    );
  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http
      .post(this.urlEndPoint, usuario)
      .pipe(
        map((response:any) => response.usuario as Usuario),
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
      )
  }
  getUsuario(id): Observable<Usuario>{
    return this.http
      .get<Usuario>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
          if(e.status != 401 && e.error.mensaje){
        /*capturamos el error y redirigimos a gastos*/
        this.router.navigate(['/gastos']);
        console.error(e.error.mensaje);
      }
       
        // swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
      )
  }

  update(usuario: Usuario): Observable<any> {
    return this.http
     .put<any>(`${this.urlEndPoint}/${usuario.id}`, usuario)
     .pipe(
      catchError((e) => {
       

        if (e.status === 400) {
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
          }
        return throwError(e);
      })
     )
  }

  delete(id: number): Observable<Usuario>{
    return this.http
      .delete<Usuario>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e) => {
         
          if(e.error.mensaje){
            console.error(e.error.mensaje);
            }
          return throwError(e);
        })
      )
  }
}
