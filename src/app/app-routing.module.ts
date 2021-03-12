import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastosComponent } from './components/gastos/gastos.component';
import { FormComponent } from './components/gastos/form.component';
import { NotasComponent } from './components/notas/notas.component';
import { FormNotaComponent } from './components/notas/form-nota.component';
import { NoEncotradoComponent } from './components/no-encotrado/no-encotrado.component';

const routes: Routes = [
  { path: '', redirectTo: '/gastos', pathMatch: 'full' },
  { path: 'gastos', component: GastosComponent },
  { path: 'gastos/page/:page', component: GastosComponent },
  {path: 'gastos/form',component: FormComponent},
  {path: 'gastos/form/:id', component: FormComponent},
  {path: 'notas', component:NotasComponent},
  {path: 'notas/page/:page', component: NotasComponent},
  {path:'notas/form', component: FormNotaComponent},
  {path: 'notas/form/:id', component: FormNotaComponent},
  {path: '**', component: NoEncotradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
