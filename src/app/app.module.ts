import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from '../services/app.service';
import { HomeComponent } from '../home/home.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    HttpClientModule  ,
     FormsModule //ngmodel comes from here
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
