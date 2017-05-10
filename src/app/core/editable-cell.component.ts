import {Component, Input, Output, EventEmitter } from '@angular/core';

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

    onBlur() {
        console.log("onBlur !");
        this.onValueUpdated.emit(this.value);
    }

}