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

const routes: Routes = [
 
  { path: 'gastos', component: GastosComponent},
  { path: 'gastos/page/:page', component: GastosComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'gastos/form',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'gastos/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  { path: 'notas', component: NotasComponent },
  { path: 'notas/page/:page', component: NotasComponent },
  {
    path: 'notas/form',
    component: FormNotaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'notas/form/:id',
    component: FormNotaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'gastos/busquedaGasto',
    component: FiltroComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'ROLE_USER' }
  },
 
  { path: '', redirectTo: '/gastos', pathMatch: 'full' },
  { path: '**', component: NoEncotradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
