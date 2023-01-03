import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SpinnerOverlayComponent } from './spinner/spinner-overlay/spinner-overlay.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner/spinner-interceptor';

@NgModule({
  
  declarations: [
    AppComponent,
    MapComponent,
    SpinnerOverlayComponent
  ],

  imports: [ 
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
SpinnerInterceptor
