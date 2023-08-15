import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { ScaleToFractionDirective } from './scale-to-fraction.directive';
import { ScaleBackgroundToFitDirective } from './scale-background-to-fit.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScaleToFractionDirective,
    ScaleBackgroundToFitDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
