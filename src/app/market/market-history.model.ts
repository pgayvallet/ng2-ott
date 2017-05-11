
export interface MarketHistoryEntry {
    timestamp   : number
    index       : number
    stocks      : {[key : string]:number}
}