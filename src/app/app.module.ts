import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MarketModule } from "./market/market-history.module";
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
export class AppModule {}