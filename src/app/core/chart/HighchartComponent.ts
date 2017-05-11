import {Component, Input, ElementRef, OnDestroy, DoCheck, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';

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


        let optionsChange : SimpleChange = changes["options"];
        let seriesChange : SimpleChange = changes["series"];

        console.log("chart : ", optionsChange, seriesChange);

        //console.log("***ngOnChanges ->", optionsChange, seriesChange);
        if(this.series == null || this.options == null) {
            return;
        }

        if(this.chart != null) {
            this.chart.destroy();
        }

        //console.log("*** ->", this.options, this.series);

        let options : Highcharts.Options = this.options;
        if(options.chart == null) {
            options.chart = {};
        }
        options.chart.renderTo = this.hostElement.nativeElement;

        let series : any = this.series;
        options.series = series;

        //console.log("redraw ->", options);


        this.chart = new Highcharts.Chart(options);
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