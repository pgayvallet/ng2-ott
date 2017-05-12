import {Component, Input, ElementRef, OnDestroy, DoCheck, OnChanges, SimpleChanges} from '@angular/core';

import * as _ from "lodash";
import * as Highcharts from "highcharts";

/**
 *  Very basic and naive wrapper around the Highcharts library.
 *  Separates the configuration and the series inputs to allow "hot" reload of series 
 *  without recreating the chart every time.
 */
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
    
    ngOnChanges(changes: SimpleChanges): void {

        let optionsChange = changes["options"] != null;
        
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
        // TODO : should check for resize here. out of scope of demo imho.
    }

    ngOnDestroy(): void {
        if(this.chart != null) {
            this.chart.destroy();
        }
    }

}
