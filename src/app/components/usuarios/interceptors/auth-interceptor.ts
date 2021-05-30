import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          // cuando el token expira y es invalido en el backend
          // se cierra sesion en angular
          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
          this.router.navigate(['/login']);
         
        }
        // 403 cuando no tiene el rol o permiso correspondiente
        if (e.status === 403) {
          swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,'warning');
          this.router.navigate(['/gastos']);
         
        }
        return throwError(e)
        
      })
    );
  }
}
