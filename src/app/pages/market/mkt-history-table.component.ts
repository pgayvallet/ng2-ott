import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Rx";
import * as _ from "lodash";

import { MarketHistoryState } from "./mkt-history-state.service";
import { MarketHistoryEntry } from "./mkt-history.model";

@Component({
    selector: 'mkt-history-table',
    templateUrl: './mkt-history-table.component.html',
})
export class MarketHistoryTableComponent implements OnInit, OnDestroy {

    stockNames : string[] = [];
    history : MarketHistoryEntry[];

    private subscriptions : Subscription = new Subscription();

    constructor(private state : MarketHistoryState) {}
    
    ngOnInit(): void {
        this.subscriptions.add(this.state.subscribeToHistoryChanges(history => this.onHistoryChange(history)));
    }

    ngOnDestroy() : void {
        this.subscriptions.unsubscribe();
    }

    historyTrackByFn(index:number, entry:MarketHistoryEntry) {
        return entry.index;
    }
    
    onCellEdition(stockName : string, index : number, value : number) : void {
        this.state.updateStockValue(stockName, index, value);
    }

    private onHistoryChange(history : MarketHistoryEntry[]) {
        this.stockNames = _.keys(history[0].stocks);
        this.history = history;
    }

}