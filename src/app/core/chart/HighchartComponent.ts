import {Component, Input, ElementRef, OnDestroy, DoCheck, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';

import * as Highchart from "highcharts";

// source : https://github.com/Bigous/ng2-highcharts/blob/master/src/ng2-highcharts.ts

@Component({
    selector: 'sp-highchart',
    template: `<div class="sp-highchart"></div>`,
})
export class HighchartComponent implements OnDestroy, DoCheck, OnChanges {

    @Input() options : Highchart.Options;
    @Input() series : Highchart.IndividualSeriesOptions[];

    hostElement: ElementRef;
    chart : Highchart.ChartObject;

    constructor(el: ElementRef) {
        this.hostElement = el;
    }

    redraw() : void {
    }

    ngOnChanges(changes: SimpleChanges): void {


        let optionsChange : SimpleChange = changes["options"];
        let seriesChange : SimpleChange = changes["series"];

        console.log("***ngOnChanges ->", optionsChange, seriesChange);
        if(this.series == null || this.options == null) {
            return;
        }

        if(this.chart != null) {
            this.chart.destroy();
        }

        console.log("*** ->", this.options, this.series);

        let options : Highchart.Options = this.options;
        if(options.chart == null) {
            options.chart = {};
        }
        options.chart.renderTo = this.hostElement.nativeElement;

        let series : any = this.series;
        options.series = series;

        console.log("redraw ->", options);


        this.chart = new Highchart.Chart(options);
    }

    ngDoCheck(): void {

    }

    ngOnDestroy(): void {
        if(this.chart != null) {
            this.chart.destroy();
        }
    }

}