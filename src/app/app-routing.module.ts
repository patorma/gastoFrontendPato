import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { GastosComponent } from './components/gastos/gastos.component';
import { FormComponent } from './components/gastos/form.component';
import { NotasComponent } from './components/notas/notas.component';
import { FormNotaComponent } from './components/notas/form-nota.component';
import { NoEncotradoComponent } from './components/no-encotrado/no-encotrado.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { LoginComponent } from './components/usuarios/login.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';
import { RoleGuard } from './components/usuarios/guards/role.guard';
import { VerificaTokenGuard } from './components/usuarios/guards/verifica-token.guard';
import { UsuarioComponent } from './components/usuarios/usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/gastos', pathMatch: 'full' },
  { path: 'gastos', component: GastosComponent,canActivate: [VerificaTokenGuard]},
  { path: 'gastos/page/:page', component: GastosComponent,canActivate: [VerificaTokenGuard] },
  { path: 'login', component: LoginComponent,canActivate: [VerificaTokenGuard] },
  {
    path: 'gastos/form',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'gastos/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: 'notas', component: NotasComponent,canActivate: [VerificaTokenGuard] },
  { path: 'notas/page/:page', component: NotasComponent,canActivate: [VerificaTokenGuard] },
  {
    path: 'notas/form',
    component: FormNotaComponent,
    canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'notas/form/:id',
    component: FormNotaComponent,
    canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'gastos/busquedaGasto',
    component: FiltroComponent,
    canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard ],
    data: { role: 'ROLE_USER' }
  },

  {
    path: 'usuarios',
    component: UsuarioComponent,
    canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard ],
    data: { role: 'ROLE_ADMIN' }
  },

  {
    path: 'usuarios/page/:page',
    component: UsuarioComponent,
    canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard ],
    data: { role: 'ROLE_ADMIN' }
  },
 
  
  { path: '**', component: NoEncotradoComponent,canActivate: [VerificaTokenGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
