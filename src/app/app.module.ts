import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';


import { MarketPageModule } from "./pages/market/mkt-history-page.module";
import { AppComponent } from './app.component';
import { AppRoutes } from "./app.routes";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        MarketPageModule
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule {}