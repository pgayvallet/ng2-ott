import { NgModule } from '@angular/core';

import { EditableCellComponent } from "./editable-cell.component";
import { CoreChartModule } from "./chart/core-chart.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        FormsModule,
        CoreChartModule
    ],
    declarations: [
        EditableCellComponent,
    ],
    exports : [
        EditableCellComponent
    ]
})
export class CoreModule {
}