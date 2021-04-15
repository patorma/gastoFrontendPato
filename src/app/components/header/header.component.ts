import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'App Angular';
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    let username = this.authService.usuario.username
    this.authService.logout();
    swal.fire('Logout',`Hola ${username}, has cerrado sesión con éxito!`,'success');
    this.router.navigate(['/login']);
    
  }

  ngOnInit(): void {}
}
