import {Component, Input, Output, EventEmitter } from '@angular/core';
import {keyCodes} from "./utils/keyCodes";


@Component({
    selector: 'sp-editable-cell',
    templateUrl: './editable-cell.component.html',
})
export class EditableCellComponent {

    @Input() value : number;
    @Output() onValueUpdated : EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    onFocus() {
        console.log("onFocus !");
    }

    onKeyDown($event) {
        let key = $event.keyCode;
        if(key === keyCodes.ESCAPE) {
            // TODO

        }

    }

    onBlur() {
        console.log("onBlur !");
        this.onValueUpdated.emit(parseInt(this.value + ""));
    }

}