import { NgModule } from '@angular/core';

import { EditableCellComponent } from "./editable-cell.component";
import { CoreChartModule } from "./chart/CoreChartModule";

@NgModule({
    imports: [
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