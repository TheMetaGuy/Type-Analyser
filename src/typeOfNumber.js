/**
 * Returns information about the 'type' of number passed in. Unlike the built-in javascript isNaN( ) function,
 * this returns useful information about the type of number passed in. E.g. it will return 'infinity' for Infinity
 * or it will return unsafeInteger for a number that is too large to be a safe integer. Also it will return 'NaN'
 * for BigInt and Symbol types unlike the built-in isNaN( ) function which throws a type error for these types.
 * Note that NaN returns 'NaN' as that is that of 'number' type that it is
 * @param {*} obj the object to get number type information about.
 * @param {*} acceptStringNumbers - Optional. if true (the default value), then if a string is passed in, it
 *                                  will be converted to a number and the it's type will tested for safe use. Strings
 *                                  are not coerceced to numbers if they do not represent a valid number. E.g '34.345abchs'
 *                                  will not be converted to a number and will return false. But '34.345' will be converted
 *                                  to a number and will return true. String representing Hex numbers also work - E.g. 0xFF. 
 *                                  (Note - the built in javascript parseFloat() function can be used before calling this 
 *                                  function to force coercing. E.g. it will convert '34.345abchs' to 34.345).  
 *                                  if acceptStringNumbers is false then when a string is passed in, it will never be 
 *                                  converted to a number and 'NaN' will be returned.
 *                                  if a string is passed in, it will not be converted to a number and 'NaN' will be returned.
 * @returns - a string representing the type of number passed in. The possible values are:
 *                                 'bigint', 'NaN' , 'infinity', '-infinity', 'safeInteger', 'unsafeInteger', 'float'
 */
function typeOfNumber (obj, acceptStringNumbers = true) {
    let typeStr = typeof(obj);
    if ( typeStr === 'string' &&  acceptStringNumbers ) {
        obj = Number(obj);
        typeStr = typeof(obj);
    } 
    if ( typeStr === 'bigint' ) {
        return 'bigint';
    }
    if ( typeStr !== 'number' ) {
        return 'NaN';
    }
    if ( isNaN(obj)  ) {
        return 'NaN';
    } 
    if ( !Number.isFinite(obj) ) {
        if ( obj < 0 ) { 
            return '-infinity';
        }
        return 'infinity';
    }
    if ( Number.isInteger(obj) ) {
        if ( Number.isSafeInteger(obj) ) {
            return 'safeInteger';
        }
        return 'unsafeInteger';
    }
    else {
        return 'float';
    }
}
/**
 * Tests to see if the number passed in is safe to use in a calculation. This is useful because Javascript
 * has a number of different types of numbers and some of them are not safe to use in calculations. E.g.
 * BigInts are not safe to use in calculations with regular numbers. Also, numbers that are too large to be
 * safe integers are not safe to use in calculations. 
 * Note that NaN returns false as it is not a safe number to use in calculations. 
 * @param {*} obj - The object to check if it is a safe number.
 * @param {*} acceptStringNumbers - Optional. if true (the default value), then if a string is passed in, it
 *                                  will be converted to a number and it's type will tested for safe use. Strings
 *                                  are not coerceced to numbers if they do not represent a valid number. E.g '34.345abchs'
 *                                  will not be converted to a number and will return false. But '34.345' will be converted
 *                                  to a number and will return true. String representing Hex numbers also work - E.g. 0xFF. 
 *                                  (Note - the built in javascript parseFloat() function can be used before calling this 
 *                                  function to force coercing. E.g. it will convert '34.345abchs' to 34.345).
 *                                  if acceptStringNumbers is false then when a string is passed in, it will never be 
 *                                  converted to a number and 'NaN' will be returned
 * @returns - true if the number passed in is safe to use in a calculation, false otherwise.
 */
function isSafeNumber (obj, acceptStringNumbers = true) {
    let typeStr = typeOfNumber(obj, acceptStringNumbers);
    if ( typeStr === 'safeInteger' || typeStr === 'float' ) {
        return true;
    } else {
        return false;
    }
}


export { typeOfNumber };
export { isSafeNumber };