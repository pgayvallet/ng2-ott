

export interface MarketStockValue {         // TODO : use, and adapt the history service to convert
    original  : number,
    manual?   : number
}

export interface MarketHistoryEntry {
    timestamp   : number
    index       : number
    stocks      : {[key : string]:number}
}