import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { TranslatorComponent } from './components/translator/translator.component';

import { montosPipe } from './components/translator/montos.pipe';
import { Montos } from './components/translator/validaciones.directive';

import { HttpClientModule } from "@angular/common/http";
// Services
import { CotizacionService } from './services/cotizacion.service';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslatorComponent,
    Montos,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [montosPipe, CotizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
