import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../components/usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario):Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    // credenciales del cliente angular, hay que encriptarlas
    //en js se hace con btoa()
    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    //params lo que hace es detras de escena es generar los parametros
    //en una URLencoded toma cadaparametro y lo va anexar a la ruta url
    //ejemplo: grant_type=password&username=patricio&password=12345
    //se agrega .toString() para pasarlo a  string
    params.set('grant_type','password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    console.log(params.toString());

     return this.http.post<any>(urlEndPoint,params.toString(),{headers: httpHeaders});
  }
}
