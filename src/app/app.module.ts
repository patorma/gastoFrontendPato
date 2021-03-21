// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,LOCALE_ID  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GastosComponent } from './components/gastos/gastos.component';

import { HttpClientModule } from '@angular/common/http';
import { GastoService } from './services/gasto.service';
import { ModalService } from './services/modal.service';
import { DetalleComponent } from './components/gastos/detalle/detalle.component';
import { FormComponent } from './components/gastos/form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NotasComponent } from './components/notas/notas.component';
import { FormsModule } from "@angular/forms";

// maneja fechas
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { FormNotaComponent } from './components/notas/form-nota.component';
import { NoEncotradoComponent } from './components/no-encotrado/no-encotrado.component';
import { Paginador2Component } from './components/paginador2/paginador2.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { MostrarComponent } from './components/mostrar/mostrar.component';

registerLocaleData(localeEs,'es')

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GastosComponent,
    DetalleComponent,
    FormComponent,
    PaginatorComponent,
    NotasComponent,
    FormNotaComponent,
    NoEncotradoComponent,
    Paginador2Component,
    FiltroComponent,
    MostrarComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule , 
  ],
  providers: [GastoService, ModalService,{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
