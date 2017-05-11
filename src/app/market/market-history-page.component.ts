import { Component } from '@angular/core';
import {MarketHistoryState} from "./market-history-state.service";

@Component({
    selector: 'mkt-page',
    templateUrl: './market-history-page.component.html'
})
export class MarketHistoryPageComponent {

    constructor(private state : MarketHistoryState) {}

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