import {Component, Input, Output, EventEmitter } from '@angular/core';
import {keyCodes} from "./utils/keyCodes";


@Component({
    selector: 'sp-editable-cell',
    templateUrl: './editable-cell.component.html',
})
export class EditableCellComponent {

    @Input() set value(value : number) {
        this.originalValue = value.toString();
        if(!this.editing) {
            this.inputValue = this.originalValue;
        }
    };

    @Output() onValueUpdated : EventEmitter<number> = new EventEmitter<number>();

    private originalValue : string;

    editing : boolean = false;
    inputValue : string = "";

    constructor() {
    }

    onFocus() {
        this.editing = true;
    }

    onBlur() {
        this.editing = false;
        this.emitValueChange();
    }

    onKeyDown($event : KeyboardEvent) {
        switch($event.keyCode) {
            case keyCodes.ESCAPE:
                this.restoreValue();
                break;
            case keyCodes.ENTER:
                this.emitValueChange();
                break;
            default:
                break;
        }
    }

    private restoreValue() {
        this.inputValue = this.originalValue;

    }

    private emitValueChange() {
        this.onValueUpdated.emit(parseFloat(this.inputValue + ""));
    }

}