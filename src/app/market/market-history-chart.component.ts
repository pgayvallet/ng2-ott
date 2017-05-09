import { Component } from '@angular/core';

import { MarketHistoryState } from "./market-history-state.service";
import { MarketHistoryEntry } from "./market-history.model";


@Component({
    selector: 'sp-market-history-chart',
    templateUrl: './market-history-chart.component.html',
})
export class MarketHistoryChartComponent {

    public history : MarketHistoryEntry[];

    constructor(private state : MarketHistoryState) {
        state.getHistory().subscribe(history => this.history = history);
    }

}