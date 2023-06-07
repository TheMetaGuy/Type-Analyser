/**
 * Accurately identifies the type of all Javascript objects not just the primitive types. This provides
 * the same functionality as the built in typeof operator but returns the correct type for null, all ES6 types
 * and custom types
 * @param {*} obj - The object to get the type of.
 * @returns a string representing the type of the object passed in.
 */

function enhancedTypeOf(obj, extraInfo = false) {
    let typeStr = typeof(obj);
    let basicType = typeStr;

    if (obj === null) return 'null';

    if (typeStr !== 'object' && typeStr !== 'function' && typeStr !== 'string') {
        return typeStr;
    }

    // special case to handle old ES5 Symbol Polyfills which should always have a value of Symbol(something)
    if ( typeStr === 'string' ) {
        if ( obj.valueOf && obj.valueOf().toString().slice(0,6) === 'Symbol') {
            return 'symbol';
        }
        else return typeStr;
    }

    // get a more detailed string representation of the object's type
    // slice(8, -1) removes the constant '[object' and the last ']' parts of the string
    typeStr = Object.prototype.toString.call(obj).slice(8, -1);
    
    if ( typeStr === 'Object' || typeStr === 'Function' ) {
        typeStr = typeStr.toLowerCase();
    }

    if (!obj.prototype && typeStr === 'function') { 
        return 'ArrowFunction';
    }

    if ( basicType === 'object' && obj.constructor ) {
        let es6ClassName = obj.constructor.name;
        if (es6ClassName !== 'Object') {
            return typeStr = es6ClassName;
        }        
    }    

    return typeStr;
}

export { enhancedTypeOf };