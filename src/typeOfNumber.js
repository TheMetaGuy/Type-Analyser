/**
 * Returns information about the 'sub-type' of number passed in. Unlike the built-in javascript isNaN( ) function,
 * this returns useful information about the 'type' of number passed in. E.g. it will return 'infinity' for Infinity
 * or it will return 'unsafeNumber' for a number that is too large to be a safe integer. It will return 'NaN'
 * for BigInt and Symbol types unlike the built-in isNaN( ) function which throws a type error for these types.
 * 
 * Also note 
 * 1. NaN returns 'NaN' as that is the 'number' sub-type that it actually is.
 * 2. Booleans also returns 'NaN' because even though javascript coerces them into 0 or 1, relying on this
 *   behaviour is not good practice and can lead to bugs.
 * 3. Number Objects (created via new Number(xxx)) return 'numberObject'.  Some JavaScript methods
 *    and functions behave differently when they receive an object instead of a primitive value. 
 *    E.g. when comparing with ===, new Number(10) !== 10.
 *  
 * @param {*} obj the object to get number type information about.
 * 
 * @param {*} acceptStringNumbers - Optional. if true (the default value), then if a string is passed in, it
 *                                  will be converted to a number and the that will tested. Strings
 *                                  are not coerceced to numbers if they do not represent a valid number. E.g '34.345abchs'
 *                                  will not be converted to a number and will return 'NaN'. But '34.345' will be converted
 *                                  to a number and will return 'safeFloat'. Strings representing Hex numbers also work - E.g. 0xFF. 
 *                                  (Note - the built in javascript parseFloat() function can be used before calling this 
 *                                  function to force coercing. E.g. it will convert '34.345abchs' to 34.345).  
 *                                  if acceptStringNumbers is false then when a string is passed in, it will never be 
 *                                  converted to a number and 'NaN' will be returned.
 * 
 * @returns - a string representing the sub-type of the number passed in. The possible values are:
 *            'bigint', 'NaN' , 'infinity', '-infinity', 'safeInteger', 'unsafeNumber' 'safeFloat' and 'numberObject'
 */
function typeOfNumber (obj, acceptStringNumbers) {

    acceptStringNumbers = acceptStringNumbers === undefined ? true : acceptStringNumbers;

    var typeStr = typeof(obj);
    if ( typeStr === 'string' &&  acceptStringNumbers ) {
        obj = Number(obj);
        typeStr = typeof(obj);
    } 
    if ( typeStr === 'bigint' ) {
        return 'bigint';
    }
    if ( typeStr !== 'number' ) {
        if ( obj && (Object.getPrototypeOf(obj) === Number.prototype)) {
            return 'numberObject';        
        }
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
    if ( Number.isSafeInteger(obj) ) {
        return 'safeInteger';
    } else {
        if (Number.isSafeInteger( Number(obj.toFixed()) ) ) {
            return "safeFloat"
        }         
        return 'unsafeNumber';
    }
}
/**
 * Tests to see if the number passed in is safe to use in a calculation. This is useful because Javascript
 * has a number of different types of numbers and some of them are not safe to use in calculations. E.g.
 * BigInts are not safe to use in calculations with regular numbers. Also, numbers that are too large to be
 * safe integers are not safe to use in calculations. 
 * 
 * Note also 
 * 1. NaN returns false as it is not a safe number to use in calculations. 
 * 2. Booleans also returns false because even though javascript coerces them into 0 or 1, relying on this
 *    behaviour is not good practice and can lead to bugs.
 * 3. Number Objects (created via new Number(xxx)) return false.  Some JavaScript methods
 *    and functions behave differently when they receive an object instead of a primitive value.
 *    E.g. when comparing with ===, new Number(10) !== 10.
 * 
 * @param {*} obj - The object to check if it is a safe number.
 * 
 * @param {*} acceptStringNumbers - Optional. if true (the default value), then if a string is passed in, it
 *                                  will be converted to a number and it's type will tested for safe use. Strings
 *                                  are not coerceced to numbers if they do not represent a valid number. E.g '34.345abchs'
 *                                  will not be converted to a number and will return false. But '34.345' will be converted
 *                                  to a number and will return true. String representing Hex numbers also work - E.g. 0xFF. 
 *                                  (Note - the built in javascript parseFloat() function can be used before calling this 
 *                                  function to force coercing. E.g. it will convert '34.345abchs' to 34.345).
 *                                  if acceptStringNumbers is false then when a string is passed in, it will never be 
 *                                  converted to a number and false will be returned
 * 
 * @returns - true if the number passed in is safe to use in a calculation, false otherwise.
 */
function isSafeNumber (obj, acceptStringNumbers) {

    acceptStringNumbers = acceptStringNumbers === undefined ? true : acceptStringNumbers;
    
    var typeStr = typeOfNumber(obj, acceptStringNumbers);
    if ( typeStr === 'safeInteger' || typeStr === 'safeFloat' ) {
        return true;
    } else {
        return false;
    }
}


export { typeOfNumber };
export { isSafeNumber };