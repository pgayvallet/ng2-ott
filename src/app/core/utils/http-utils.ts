import {URLSearchParams} from "@angular/http";

/**
 * Converts a map to URLSearchParams used for http requests.
 *
 * @param paramMap The map of parameters to convert.
 * @returns {URLSearchParams}
 */
export function searchParams(paramMap : {[key : string]:any}) : URLSearchParams {
    let params : URLSearchParams = new URLSearchParams();
    for(let key in paramMap) {
        params.set(key, paramMap[key]);
    }
    return params;
}
