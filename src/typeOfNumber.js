/**
 * Returns information about the 'type' of number passed in. 
 * No conversion is done on the number passed in. so if you pass in a string, it will return 'nan'.
 * @param {*} obj 
 * @returns a string representing the type of number passed in.
 */
function typeOfNumber (obj) {
    
    // slice(8, -1) removes the constant '[object' and the last ']' parts of the string
    let typeStr = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();  
    
    // this should also work with ES5 Symbol Polyfills ?
    if ( typeStr == 'string' || typeStr == 'symbol') {
        return 'nan';
    }    
    if ( typeStr === 'bigint' ) {
        return 'bigint';
    }
    if ( isNaN(obj) || typeStr !== 'number' ) {
        return 'nan';
    }
    if ( !Number.isFinite(obj) ) {
        return 'infinity';
    }
    if ( Number.isInteger(obj) ) {
        if ( Number.isSafeInteger(obj) ) {
            return 'safeinteger';
        }
        return 'unsafeinteger';
    }
    else {
        return 'float';
    }
}

export { typeOfNumber };