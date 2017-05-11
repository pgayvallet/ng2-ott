import {Component, OnInit, OnDestroy} from '@angular/core';
import * as _ from "lodash";

import { MarketHistoryState } from "./market-history-state.service";
import { MarketHistoryEntry } from "./market-history.model";
import {Subscription} from "rxjs/Rx";

@Component({
    selector: 'sp-market-history-table',
    templateUrl: './market-history-table.component.html',
})
export class MarketHistoryTableComponent implements OnInit, OnDestroy {

    stockNames : string[] = [];
    history : MarketHistoryEntry[];

    private subscriptions : Subscription = new Subscription();

    constructor(private state : MarketHistoryState) {}
    
    historyTrackByFn(index:number, entry:MarketHistoryEntry) {
        return entry.index;    
    }

    ngOnInit(): void {
        this.subscriptions.add(this.state.getHistory().subscribe(history => this.onHistoryChange(history)));
    }

    ngOnDestroy() : void {
        this.subscriptions.unsubscribe();
    }

    onCellEdition(stockName : string, index : number, value : number) : void {
        this.state.updateStockValue(stockName, index, value);
    }

    private onHistoryChange(history : MarketHistoryEntry[]) {
        this.stockNames = _.keys(history[0].stocks);
        this.history = history;
    }

}