import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
 
  constructor(private authService: AuthService,
    private router: Router) { }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    if (this.authService.isAuthenticated() && this.isRefreshTokenExpirado()) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
 
    if (this.isTokenExpirado()) {
 
      console.log('isTokenExpirado: TRUE');
      console.log('refreshToken: ' + this.authService.refreshToken);
 
      return new Promise((resolve, reject) => {
        this.authService.actualizarToken(this.authService.refreshToken).subscribe(response => {
          console.log('response con refreshToken: ' + response);
          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);
          this.authService.guardarRefreshToken(response.refresh_token);
          console.log('actualizarToken2: ');
          resolve(true);
          console.log('despues de invocar a actualizarToken: true');
        }, () => {
          this.router.navigate(['/login']);
          reject(false);
          console.log('despues de invocar a actualizarToken: false');
        });
      });
 
    }
 
    return true;
  }
 
  isTokenExpirado(): boolean {
    let token = this.authService.token;
    if(token == null){
      return false;
    }
    let payload = this.authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
 
  isRefreshTokenExpirado(): boolean {
    let refreshToken = this.authService.refreshToken;
    if (refreshToken == null) {
      return false;
    }
    let payload = this.authService.obtenerDatosToken(refreshToken);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}