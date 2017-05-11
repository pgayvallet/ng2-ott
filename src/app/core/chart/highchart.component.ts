import {Component, Input, ElementRef, OnDestroy, DoCheck, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';

import * as _ from "lodash";
import * as Highcharts from "highcharts";

// source : https://github.com/Bigous/ng2-highcharts/blob/master/src/ng2-highcharts.ts

@Component({
    selector: 'sp-highchart',
    template: `<div class="sp-highchart"></div>`,
})
export class HighchartComponent implements OnDestroy, DoCheck, OnChanges {

    @Input() options : Highcharts.Options;
    @Input() series : Highcharts.IndividualSeriesOptions[];

    hostElement: ElementRef;
    chart : Highcharts.ChartObject;

    constructor(el: ElementRef) {
        this.hostElement = el;
    }

    redraw() : void {
    }

    ngOnChanges(changes: SimpleChanges): void {

        let optionsChange = changes["options"] != null;
        let seriesChange = changes["series"] != null;

        //console.log("chart : ", optionsChange, seriesChange);
        //console.log("***ngOnChanges ->", optionsChange, seriesChange);

        if(this.series == null || this.options == null) {
            return;
        }

        if(optionsChange || this.chart == null) {
            this.createChart();
        } else {
            this.updateSeries();
        }
    }


    private createChart() : void {
        if(this.chart != null) {
            this.chart.destroy();
        }

        console.log("createChart", this.series);

        // injecting renderTo
        let options : Highcharts.Options = this.options;
        if(options.chart == null) {
            options.chart = {};
        }
        options.chart.renderTo = this.hostElement.nativeElement;

        // adding series
        options.series = this.series;

        this.chart = new Highcharts.Chart(options);
    }

    private updateSeries() : void {

        // console.log("updateSeries");

        let ids = [];
        let series = this.series;
        let chart = this.chart;

        // update or add existing or new series
        _.each(series, function (s) {
            ids.push(s.id);
            let chartSeries = chart.get(s.id) as Highcharts.SeriesObject;
            if (chartSeries) {
                chartSeries.update(s, false);
            } else {
                chart.addSeries(s, false);
            }
        });

        //Now remove any missing series
        for (var i = chart.series.length - 1; i >= 0; i--) {
            var s = chart.series[i];
            if (ids.indexOf(s.options.id) < 0) {
                s.remove(false);
            }
        }

        chart.redraw(false);
    }

    ngDoCheck(): void {

    }

    ngOnDestroy(): void {
        if(this.chart != null) {
            this.chart.destroy();
        }
    }

}



/*
 var processSeries = function(chart, series) {
 var ids = [];
 if(series) {
 ensureIds(series);

 //Find series to add or update
 _.each(series, function(s) {
 ids.push(s.id);
 var chartSeries = chart.get(s.id);
 if(chartSeries) {
 chartSeries.update(angular.copy(s), false);
 } else {
 chart.addSeries(angular.copy(s), false);
 }
 });
 }

 //Now remove any missing series
 for(var i = chart.series.length - 1; i >= 0; i--) {
 var s = chart.series[i];
 if(s.options.id === defaultChartOptions.navigator.series.id) {
 continue;
 }
 if(ids.indexOf(s.options.id) < 0) {
 s.remove(false);
 }
 }
 };
 */