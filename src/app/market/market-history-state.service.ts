import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { MarketHistoryEntry } from "./market-history.model";
import { MarketHistoryService } from "./market-history.service";

@Injectable()
export class MarketHistoryState {

    constructor (private historyService : MarketHistoryService) {}

    getHistory() : Observable<MarketHistoryEntry[]> {
        return this.historyService.getHistory();
    }

}