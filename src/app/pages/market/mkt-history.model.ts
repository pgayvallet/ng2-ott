

export interface MarketStockValues {
    original  : number,
    manual?   : number
}

export interface MarketHistoryEntry {
    timestamp   : number
    index       : number
    stocks      : {[key : string] : MarketStockValues}
}