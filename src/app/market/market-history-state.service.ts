import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as _ from "lodash";

import { MarketHistoryEntry } from "./market-history.model";
import { MarketHistoryService } from "./market-history.service";

const FETCH_INTERVAL = 1000;
const HISTORY_LENGTH = 20;

/**
 * State for the market history page
 */
@Injectable()
export class MarketHistoryState {

    private realTimeEnabled : boolean = false;

    private bus : EventEmitter<MarketHistoryEntry[]> = new EventEmitter<MarketHistoryEntry[]>();

    private history : MarketHistoryEntry[];
    
    constructor (private historyService : MarketHistoryService) {
        this.performFetch();
        this.enableRealTime();
    }

    /**
     * Updates given stock for given index at given value.
     * 
     * @param stockName The name of the stock to update value of.
     * @param index The index of the entry to update value of.
     * @param value The value to set the stock to.
     * @return {boolean} true if entry was found for given stock and index, false otherwise.
     */
    updateStockValue(stockName : string, index : number, value : number) : boolean {
        let entry = _.find(this.history, { index : index });
        if(entry != null && _.has(entry.stocks, stockName)) {
            entry.stocks[stockName] = value;
            this.bus.emit(this.history);
        } else {
            return false;
        }
    }

    /**
     * Returns the observable to use to be notified of change on the current history.
     * 
     * @return {EventEmitter<MarketHistoryEntry[]>}
     */
    getHistory() : Observable<MarketHistoryEntry[]> {
        return this.bus;
    }

    enableRealTime() : void {
        if(!this.realTimeEnabled) {
            this.startRealTimeFetch();
            this.realTimeEnabled = true;
        }
    }

    disableRealTime() : void {
        this.realTimeEnabled = false;
    }

    isRealTimeEnabled() : boolean {
        return this.realTimeEnabled;
    }

    private startRealTimeFetch() : void {
        setTimeout(() => {
            this.performFetch();
            if(this.realTimeEnabled) {
                this.startRealTimeFetch();
            }
        }, FETCH_INTERVAL);
    }

    private performFetch() : void {
        this.historyService.fetchHistory(HISTORY_LENGTH).subscribe(history => this.processHistory(history));
    }
    
    private processHistory(history : MarketHistoryEntry[]) {
        if(this.history == null) {
            this.history = history;
        } else {
            this.history = this.mergeHistories(this.history, history);
        }
        this.bus.emit(this.history);
    }

    private mergeHistories(oldHistory : MarketHistoryEntry[], newHistory : MarketHistoryEntry[]) : MarketHistoryEntry[] {
        let offset = _.first(newHistory).index - _.first(oldHistory).index;
        if(offset >= HISTORY_LENGTH) {
            return newHistory;
        }
        let oldPart = _.takeRight(oldHistory, HISTORY_LENGTH - offset);
        let newPart = _.takeRight(newHistory, offset);
        return oldPart.concat(newPart);
    }

}