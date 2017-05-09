import { NgModule } from '@angular/core';

import { EditableCellComponent } from "./editable-cell.component";

@NgModule({
    imports: [],
    declarations: [
        EditableCellComponent,
    ],
    exports : [
        EditableCellComponent
    ]
})
export class CoreModule {
}