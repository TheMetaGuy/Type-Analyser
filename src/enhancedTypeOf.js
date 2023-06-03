/**
 * Accurately identifies the type of almost all Javascript objects not just the primitive types.
 * @param {*} obj 
 * @returns a string representing the type of the object passed in.
 */

function enhancedTypeOf(obj) {
    let typeStr = typeof(obj);

    if (obj === null) return 'null';

    if (typeStr !== 'object' && typeStr !== 'function' && typeStr !== 'string') {
        return typeStr;
    }

    // special case to handle ES5 Symbol Polyfills which should always have a value of Symbol(something)
    if ( typeStr === 'string' ) {
        if ( obj.valueOf && obj.valueOf().toString().slice(0,6) === 'Symbol') {
            return 'symbol';
        }
        else return typeStr;
    }

    // get a more detailed string representation of the object's type
    // slice(8, -1) removes the constant '[object' and the last ']' parts of the string
    typeStr = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();  
    
    if ( typeStr === 'object' && obj.constructor ) {
        let es6ClassName = obj.constructor.name;
        return ( es6ClassName === 'Object' ) ? typeStr : es6ClassName;
    }    
    
    return typeStr;
}

export { enhancedTypeOf };