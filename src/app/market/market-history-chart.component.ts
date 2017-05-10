import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { MarketHistoryState } from "./market-history-state.service";
import { MarketHistoryEntry } from "./market-history.model";


@Component({
    selector: 'sp-market-history-chart',
    template: `
        <div class="market-history-chart">
            <sp-highchart [options]="chartConfig" [series]="chartSeries"></sp-highchart>
        </div>
    `,
})
export class MarketHistoryChartComponent implements OnInit {

    public chartConfig : Highcharts.Options;
    public chartSeries : any = [];

    constructor(private state : MarketHistoryState) {
        state.getHistory().subscribe(history => this.onHistoryChange(history));
    }

    private onHistoryChange(history : MarketHistoryEntry[]) {
        let stockNames : string[] = _.keys(history[0].stocks);
        let series = [];
        stockNames.forEach(stockName => {
           series.push({
               name : stockName,
               data : history.map(entry => {
                   return {
                        x : entry.timestamp,
                        y : entry.stocks[stockName]
                   };
               })
            });
        });
        this.chartSeries = series;
    }

    ngOnInit(): void {
        this.chartConfig = {
            chart : {
                type : "line",
                width : null
            },
            title : null,
            xAxis : {
                type : "datetime",
                crosshair : true
            },
            tooltip : {
                shared : true
            }
        };
    }

}