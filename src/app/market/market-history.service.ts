import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as _ from "lodash";

import { MarketHistoryEntry } from "./market-history.model";

@Injectable()
export class MarketHistoryService {

    private serviceUrl : string = "/assets/sample.json";

    constructor (private http: Http) {}

    getHistory() : Observable<MarketHistoryEntry[]> {
        return this.http.get(this.serviceUrl)
            .map((res:Response) => _.takeRight(res.json(), 20))
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}