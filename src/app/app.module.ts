import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GastosComponent } from './components/gastos/gastos.component';
import { TiposComponent } from './components/tipos/tipos.component';
import { HttpClientModule } from '@angular/common/http';
import { GastoService } from './services/gasto.service';
import { ModalService } from './services/modal.service';
import { DetalleComponent } from './components/gastos/detalle/detalle.component';
import { FormComponent } from './components/gastos/form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GastosComponent,
    TiposComponent,
    DetalleComponent,
    FormComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [GastoService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
