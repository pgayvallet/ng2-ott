import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MarketModule } from "./market/market.module";
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        MarketModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {     }