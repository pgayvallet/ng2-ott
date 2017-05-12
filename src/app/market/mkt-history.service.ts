import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import * as _ from "lodash";

import { MarketHistoryEntry } from "./mkt-history.model";
import { searchParams } from "../core/utils/http-utils";

@Injectable()
export class MarketHistoryService {

    private serviceUrl : string = "/api"; //"/assets/sample.json";

    constructor (private http: Http) {}

    fetchHistory(count : number) : Observable<MarketHistoryEntry[]> {
        return this.http.get(this.serviceUrl, { search : searchParams({ count : count }) })
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

}