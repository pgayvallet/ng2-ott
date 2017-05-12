import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import * as _ from "lodash";

import { MarketHistoryEntry } from "./mkt-history.model";
import { MarketHistoryService } from "./mkt-history.service";

const FETCH_INTERVAL = 1000;
const HISTORY_LENGTH = 20;

export interface HistoryChangeHandler {
    (history : MarketHistoryEntry[]) : void
}

/**
 * State/Manager for the market history page.
 */
@Injectable()
export class MarketHistoryState {

    private realTimeEnabled : boolean = false;

    private bus : EventEmitter<MarketHistoryEntry[]> = new EventEmitter<MarketHistoryEntry[]>();

    private history : MarketHistoryEntry[];

    private _timeoutId : number;

    constructor (private historyService : MarketHistoryService) {
    }

    /**
     * Load the current history from server if not already loaded.
     */
    loadInitialIfRequired() : void {
        if(this.history == null) {
            this.performFetch();
        }
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
     * Register an handler to be notified when the current history changes.
     * 
     * @param handler The handler to execute on history change
     * @return {Subscription} the associated emitter subscription to unsubscribe.
     */
    subscribeToHistoryChanges(handler : HistoryChangeHandler) : Subscription {
        return this.bus.subscribe(handler);
    }

    /**
     * Enabled real-time data refresh if currently disabled.
      */
    enableRealTime() : void {
        if(!this.realTimeEnabled) {
            this.startFetchTimeout();
            this.realTimeEnabled = true;
        }
    }

    /**
     * Disable real-time data refresh is currently enabled.
     */
    disableRealTime() : void {
        if(this.realTimeEnabled) {
            clearTimeout(this._timeoutId);
            this.realTimeEnabled = false;
        }
    }

    /**
     * @return {boolean} true if realTime is enabled, false otherwise.
     */
    isRealTimeEnabled() : boolean {
        return this.realTimeEnabled;
    }
    
    private startFetchTimeout() : void {
        this._timeoutId = setTimeout(() => {
            this.performFetch();
            if(this.realTimeEnabled) {
                this.startFetchTimeout();
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