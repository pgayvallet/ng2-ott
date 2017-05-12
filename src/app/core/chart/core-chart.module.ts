import { NgModule } from '@angular/core';

import { HighchartComponent } from "./highchart.component";

@NgModule({
    imports: [],
    declarations: [
        HighchartComponent,
    ],
    exports : [
        HighchartComponent
    ]
})
export class CoreChartModule {
}