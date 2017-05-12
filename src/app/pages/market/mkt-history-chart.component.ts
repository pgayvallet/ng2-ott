import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from "lodash";
import * as Highcharts from "highcharts";

import { MarketHistoryService } from "./mkt-history.service";
import { MarketHistoryEntry } from "./mkt-history.model";
import { Subscription } from "rxjs/Rx";

require('./mkt-history-chart.component.scss');

@Component({
    selector: 'mkt-history-chart',
    template: `
        <div class="market-history-chart">
            <sp-highchart [options]="chartConfig" [series]="chartSeries"></sp-highchart>
        </div>
    `,
})
export class MarketHistoryChartComponent implements OnInit, OnDestroy {

    chartConfig : Highcharts.Options;
    chartSeries : any;

    private subscriptions : Subscription = new Subscription();

    constructor(private state : MarketHistoryService) {
    }

    ngOnInit() : void {
        this.subscriptions.add(this.state.subscribeToHistoryChanges(history => this.onHistoryChange(history)));
        this.chartConfig = this.getChartConfig();
    }

    ngOnDestroy() : void {
        this.subscriptions.unsubscribe();
    }

    private onHistoryChange(history : MarketHistoryEntry[]) {
        let stockNames : string[] = _.keys(history[0].stocks);
        let series = [];
        stockNames.forEach(stockName => {
            series.push({
                id: stockName,
                name: stockName,
                data: history.map(entry => {
                    let values = entry.stocks[stockName];
                    return {
                        x: entry.timestamp,
                        y: values.manual != null ? values.manual : values.original
                    };
                })
            });
        });
        this.chartSeries = series;
    }

    private getChartConfig() : Highcharts.Options {
        return {
            chart: {
                type: "line",
                width: null
            },
            title: null,
            xAxis: {
                type: "datetime",
                crosshair: true
            },
            tooltip: {
                shared: true
            }
        };
    }

}