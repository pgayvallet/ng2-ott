import { Component, ElementRef } from '@angular/core';

import * as Highchart from "highcharts";

// source : https://github.com/Bigous/ng2-highcharts/blob/master/src/ng2-highcharts.ts

@Component({
    selector: 'sp-highchart',
    templateUrl: './editable-cell.component.html',
})
export class HighchartComponent {

    hostElement: ElementRef;
    chart : Highchart.ChartObject;

    constructor(ele: ElementRef) {
        this.hostElement = ele;
    }

}