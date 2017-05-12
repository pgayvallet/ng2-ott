import { Component, OnInit, OnDestroy } from '@angular/core';

import { MarketHistoryState } from "./market-history-state.service";

/**
 * Root component for the market history page.
 */
@Component({
    selector: 'mkt-page',
    templateUrl: './market-history-page.component.html'
})
export class MarketHistoryPageComponent implements OnInit, OnDestroy {

    constructor(private state : MarketHistoryState) {}
    
    ngOnInit() : void {
        this.state.loadInitialIfRequired();
        this.state.enableRealTime();
    }
    
    ngOnDestroy() : void {
        this.state.disableRealTime();
    }
    
    toggleRealTime() : void {
        if(this.state.isRealTimeEnabled()) {
            this.state.disableRealTime();
        } else {
            this.state.enableRealTime();
        }
    }

    get realTimeEnabled() : boolean {
        return this.state.isRealTimeEnabled();
    }

}