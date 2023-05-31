/**
 * Returns information about the 'type' of number passed in. 
 * No conversion is done on the number passed in. so if you pass in a string, it will return 'nan'.
 * @param {*} obj 
 * @returns a string representing the type of number passed in.
 */
function getNumberType (obj) {
    typeStr = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();  // slice(8, -1) removes the constane [object ] and the last ]
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
        return 'unsafeNumber';
    }
    else {
        return 'float';
    }
}

export { getNumberType };