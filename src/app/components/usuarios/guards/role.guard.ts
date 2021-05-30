import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let token = this.authService.token;
      // console.log(token)
      console.log(this.authService.isAuthenticated()) 
      // preguntamos si no estamos autenticados

      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
    
      let role = next.data['role'] as string;
      console.log(role);
      //validamos el role
      if(this.authService.hasRole(role)){
        // si tiene rol retornamos
        return true;
      }

      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`,'warning');
      this.router.navigate(['/gastos']);
      return false;
  }
  
}
