/**
 * Accurately identifies the type of all Javascript objects not just the primitive types and it's much more
 * useful than the built-in javascript 'typeof' operator. It provides the same core functionality 
 * but returns the correct type for null, all ES6 / ES2020 types and custom types ( E.g. your classes ). 
 * It works correctly with types simulated via Polyfills (E.g. Symbol via Babel ) and also correctly identifies
 * types retieved from Iframes and Worker threads where passing of those types is supported.
 * 
 * SPECIAL CASES - toString( ) Override and [Symbol.toStringTag]
 * There are some special cases where the returned 'type' might not align with your expectations:
 * 
 * Objects with toString() Overridden:       If the built-in `toString()` method is overridden by custom code, 'unknown'
 *                                           will be returned for the type. You can still use `toString()` to retrieve 
 *                                           the value set by the custom code.
 * 
 * Custom Classes with [Symbol.toStringTag]: If custom classes have `[Symbol.toStringTag]` set, the returned value will be
 *                                           the class name rather than the toStringTag value. This design is intentional. 
 *                                           If you want to retrieve the custom tag, [Symbol.toStringTag] will still return 
 *                                           whatever value was set.
 *
 * Object Types with [Symbol.toStringTag]:   Actual Object types with [Symbol.toStringTag] set will have that value 
 *                                           returned for the type of the object.
 *
 * Rationale
 * The goal here is to reveal the intrinsic underlying 'type' of an object. For built-in types and custom objects, using
 * [Symbol.toStringTag] doesn't alter that. However, we consider actual Object types an exception and return the 
 * [Symbol.toStringTag] value. This is because JavaScript's type system returns 'object' for all Objects, making it 
 * impossible to distinguish one type of custom Object from another without using [Symbol.toStringTag].
 * 
 * @param {*} obj - The object to get the type of.
 * 
 * @returns a string representing the type of the object passed in. if a type can't be determined, 
 *          the string 'unknown' will be returned.
 */

function extendedTypeOf(obj) {
    var typeStr = typeof(obj);
    var basicType = typeStr;

    if (obj === null) return 'null';

    if (typeStr !== 'object' && typeStr !== 'function' && typeStr !== 'string') {
        return typeStr;
    }

    // if the object has the toString method overridden, then we can't accurately determine it's type
    if ( obj.hasOwnProperty("toString") ) {
        return "unknown"
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
        var es6ClassName = obj.constructor.name;
        if (es6ClassName !== 'Object') {
            return typeStr = es6ClassName;
        }       
    }    

    return typeStr;
}

/**
 * Performs type introspection and returns detailed type information about the object passed in. This function returns 
 * useful information about all types including ES6 / EES2020 and customs types ( E.g. Your classes ). 
 * 
 * For the returned 'type' field, the same special cases involving the use of `toString( )` override and `[Symbol.toStringTag]`
 * apply as per the **`extendedTypeOf`** function above and the same rationale applies. The goal is for the 'type' field
 * to reveal the intrinsic underlying 'type' of an object. For built-in types  and custom objects, using `[Symbol.toStringTag]`
 * doesn't alter that by design here. However, we consider actual `Object` types an exception and return the 
 * `[Symbol.toStringTag]` value. This is because JavaScript's  type system returns 'object' for all Objects, making it 
 * impossible to distinguish one type of custom Object from another without using `[Symbol.toStringTag]`.
 * 
 * @param {*} obj - the object to get type information about.
 * 
 * @param {*} showFullPrototypeChain - Optional. if true (the default value), the full javascript inheritance prototype chain will be included 
 *                                     in the returned object. 
 *                                     if false, The final 'Object' will be removed from the chain and also only 
 *                                     chains longer than 1 will be included as in this case the chain will be just 
 *                                     have a single value the same as the Type field which is not very useful.
 * 
 * @returns - an object containing the following fields (Default values are shown):
 *      {  Type: "null",                 // A string representation of the exact input type. This is set for all types not just primitives. 
 *                                          The following types will be in lower case as per the built-in javascript typeof operator: 
 *                                         'string', 'number', 'boolean', 'undefined', 'symbol', 'function', 'object', 'bigint'.
 *                                          A Null object will be detected as 'null'.  All other built-in types will be recognised and returned
 *                                          in CamelCase Format as per the Javascirpt standard: E.g. 'Array', 'Date', 'Error', 'RegExp', 'URL' etc
 *                                          if a type can't be determined, then 'unknown' will be returned.
 *          ReferenceVariable: "",       // A string representation of the reference variable, if any, that points to the input object. 
 *          hasCustomConstructor: false, // true if the input object has a it's own custom constructor, false otherwise.
 *          prototypeChainString : "",   // a string representation of the Javascript inheritance prototype chain of the input object. Objects
 *                                          in the chain are separated by ' -> '. E.g. 'Child -> Parent -> Object'.  
 *          prototypeChain : null,       // an array containing the javascript inheritance prototype chain of the input object passed.
 *      };
 */
function getTypeDetails(obj, showFullPrototypeChain) {

    showFullPrototypeChain = showFullPrototypeChain === undefined ? true : showFullPrototypeChain;                

    var resultInfo = {  Type: "null", 
                        ReferenceVariable: "",
                        hasCustomConstructor : false,
                        prototypeChainString : "",
                        prototypeChain : null,
                    };

    if (obj === null) { 
        return resultInfo;
    }           
    if (obj === undefined) {
        resultInfo.Type = 'undefined';
        return resultInfo;
    }    

    var coreTypes = ['String', 'Number', 'Boolean', 'Undefined', 'Null', 'Symbol', 'Function', 'Object', 'BigInt'];

    var typeStr = Object.prototype.toString.call(obj).slice(8, -1);
    if ( coreTypes.includes(typeStr) ) {
        typeStr = typeStr.toLowerCase();
    }
    
    if (!obj.prototype && typeStr === 'function') { 
        typeStr = 'ArrowFunction';
    }

    var es6ClassName;
    if ( typeof obj === 'object' && obj.constructor) {
        es6ClassName = obj.constructor.name;
        if (es6ClassName !== 'Object') {
            typeStr = es6ClassName;
            resultInfo.hasCustomConstructor = true;
        }
    }  

    // if the object has the toString method overridden, then we can't accurately determine it's type
    if ( obj.hasOwnProperty("toString") ) {
         typeStr = "unknownn";
    } 

    var pChain = getPrototypeChain(obj);
    if ( showFullPrototypeChain ) {
        resultInfo.prototypeChain = pChain;
        resultInfo.prototypeChainString = pChain.join(' -> ');
    } else {
        // remove the last element which is always Object and only show chains longer than 1
        pChain.pop();
        if ( pChain.length > 1 ) { 
            resultInfo.prototypeChain = pChain;
            resultInfo.prototypeChainString = pChain.join(' -> ');
        }
    }

    resultInfo.Type = typeStr;
    if (obj.name && !es6ClassName) {
        if (Object.prototype.hasOwnProperty.call(obj, 'name')) {
            resultInfo.ReferenceVariable = obj.name;
        } 
    }

    return resultInfo;
}

/**
 * get the full prototype chain of the object passed in.
 * @param {*} obj 
 * @returns an array containing the names of the objects in the prototype chain of the object passed in.
 */
function getPrototypeChain(obj) {
    var proto = Object.getPrototypeOf(obj);
    var chain = [];

    while (proto != null) {
        chain.push(proto.constructor.name);
        proto = Object.getPrototypeOf(proto);
    }
   
    return chain;
}

export { getTypeDetails };
export { extendedTypeOf };