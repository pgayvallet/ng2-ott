import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { CoreModule } from "../core/core.module";
import { CoreChartModule } from "../core/chart/CoreChartModule";

import { MarketHistoryService } from "./market-history.service";
import { MarketHistoryState } from "./market-history-state.service"
import { MarketHistoryChartComponent } from './market-history-chart.component';
import { MarketHistoryTableComponent } from "./market-history-table.component";

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        CoreModule,
        CoreChartModule
    ],
    providers : [
        MarketHistoryService,
        MarketHistoryState
    ],
    declarations: [
        MarketHistoryChartComponent,
        MarketHistoryTableComponent
    ],
    bootstrap: [],
    exports : [
        MarketHistoryChartComponent,
        MarketHistoryTableComponent
    ]
})
export class MarketModule {     }