import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated()) {
    
     
      // if(this.isTokenExpirado()){

      //   this.authService.logout();
      //   this.router.navigate(['/login']);

      //   return false;
      // }
       
      return true;
    
      
    }

    this.router.navigate(['/login']);

    return false;
  }
  // metodo para ver si ha expirado el token
  // isTokenExpirado(): boolean {
  //   // obtenemos el token
  //   let token = this.authService.token;
  //   let payload = this.authService.obtenerDatosToken(token);
  //   // obtenemos la fecha actual convertida en segundos
  //   let now = new Date().getTime() / 1000;
  //   // preguntamos si el token expiro
  //   // comparando fechas si la fecha de exp es menor a la fecha actual expiro el token
  //   if (payload.exp < now) {
  //     return true;
  //   }
    
  //   return false;
  // }
}
