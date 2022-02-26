import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;

// const config = {
//     apiKey: "AIzaSyCxmWLa1xI9QeEgZMJ_96ZcnwkZEsC06S4",
//     authDomain: "eventwatcher-ad307.firebaseapp.com",
//     projectId: "eventwatcher-ad307",
//     storageBucket: "eventwatcher-ad307.appspot.com",
//     messagingSenderId: "1083834014096",
//     appId: "1:1083834014096:web:e2b2374f612073e0ae7b15",
//     measurementId: "G-S5E8BWJCT7"
// }

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
