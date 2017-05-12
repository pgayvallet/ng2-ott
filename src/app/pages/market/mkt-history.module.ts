import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { ChartModule } from "../../core/chart/chart.module";

import { MarketHistoryService } from "./mkt-history.service"
import { MarketHistoryChartComponent } from './mkt-history-chart.component';
import { MarketHistoryTableComponent } from "./mkt-history-table.component";
import { MarketHistoryPageComponent } from "./mkt-history-page.component";
import { MarketHistoryTableCellComponent } from "./mkt-history-table-cell.component";


@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,

        ChartModule
    ],
    providers : [
        MarketHistoryService
    ],
    declarations: [
        MarketHistoryPageComponent,
        MarketHistoryChartComponent,
        MarketHistoryTableComponent,
        MarketHistoryTableCellComponent
    ],
    exports : [
        MarketHistoryPageComponent
    ]
})
export class MarketPageModule {     }