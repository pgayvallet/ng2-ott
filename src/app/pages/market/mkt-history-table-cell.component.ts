import { Component, Input, Output, EventEmitter } from '@angular/core';
import { keyCodes } from "../../core/utils/keyCodes";
import { MarketStockValues } from "./mkt-history.model";

require('./mkt-history-table-cell.component.scss');

@Component({
    selector: 'mkt-history-table-cell',
    templateUrl: './mkt-history-table-cell.component.html',
})
export class MarketHistoryTableCellComponent {

    @Input() 
    set value(value : MarketStockValues) {
        this._value = value;
        if(!this.editing) {
            this.inputValue = (value.manual !=null ? value.manual : value.original).toString();
        }
    };

    @Output() 
    onValueUpdated : EventEmitter<number> = new EventEmitter<number>();

    _value : MarketStockValues;

    editing : boolean = false;
    inputValue : string = "";

    constructor() {
    }

    onFocus() {
        this.editing = true;
    }

    onBlur() {
        this.editing = false;
        if(this.parseInputValue() != this._value.original) {
            this.emitValueChange();
        }
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

    private parseInputValue() : number {
        return parseFloat(this.inputValue);
    }

    private restoreValue() {
        this.inputValue = this._value.original + "";
    }

    private emitValueChange() {
        this.onValueUpdated.emit(this.parseInputValue());
    }

}