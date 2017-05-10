import {Component, OnInit} from '@angular/core';
import * as _ from "lodash";

import { MarketHistoryState } from "./market-history-state.service";
import { MarketHistoryEntry } from "./market-history.model";

@Component({
    selector: 'sp-market-history-table',
    templateUrl: './market-history-table.component.html',
})
export class MarketHistoryTableComponent implements OnInit {

    stockNames : string[] = [];
    history : MarketHistoryEntry[];

    constructor(private state : MarketHistoryState) {}

    parseInt(number) {
        return number.toFixed(2);
    }

    ngOnInit(): void {
        this.state.getHistory().subscribe(history => this.onHistoryChange(history));
    }

    onCellEdition(stockName, index, value) : void {
        console.log("***onCellEdition", stockName, index, value);
    }

    private onHistoryChange(history : MarketHistoryEntry[]) {
        this.stockNames = _.keys(history[0].stocks);
        this.history = history;
    }

}