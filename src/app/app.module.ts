// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  providers: [GastoService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
