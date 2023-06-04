import { enhancedTypeOf } from "./index.js";
/**
 * Checks if an object is JSON serializable. This is a recursive function that will check all properties of an object.
 * @param {*} obj - the object to test
 * @param {*} acceptFormatLoss - if false (the default), only return true for types that can be serializaed without problems.
 *                               if true also return true for types where data may need trivial conversion when de-serializing.
 *                               NOTE - 'date', 'url', 'urlsearchparams' are converted to strings when serializing to JSON 
 *                               so New Date( stringValue ) or new URL( stringValue ) etc can be used to convert back. 
 *                               Typed arrays are converted to regular arrays when serializing to JSON so iterating over the results 
 *                               of the parsed JSON element, adding to an array and then new TypedArray( array ) can be used to convert back. 
 * @param {*} visitedObjects - used internally to detect circular references. Do not pass this parameter.
 * @returns true if the object is JSON serializable WITHOUT a loss of data, false otherwise.
 */
function isJSONSerializable(obj, acceptFormatLoss = false, visitedObjects = new Set()) {
    let validJSONTypes = ['string', 'number', 'boolean', 'undefined', 'null'];
  
    // types where no data is lost but there is a change in data format when serializing
    const lossyValidJSONTypes = [
        'Date', 'URL', 'URLSearchParams', 
        'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 
        'Int16Array', 'Uint16Array', 
        'Int32Array', 'Uint32Array', 'Float32Array',
        'Float64Array', 'BigInt64Array', 'BigUint64Array'
    ];
    if (acceptFormatLoss) {
        validJSONTypes.push(...lossyValidJSONTypes);
    }

    let type = enhancedTypeOf(obj);

    if (validJSONTypes.includes( type )) return true;

    if (type === 'object' || type === 'Array') {
      // check for circular references  
      if (visitedObjects.has(obj)) { 
        return false;
      }
      visitedObjects.add(obj);
  
      // Non integer array properties cannot be JSON serialized as data will be lost when serializing to JSON
      if (type === 'Array') { 
        let totalPropertyCount = 0;
        for (let key in obj) {
          totalPropertyCount++;
        }
        if (totalPropertyCount > obj.length) return false;
      }       

      // recursively check all properties      
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (!isJSONSerializable(obj[key], acceptFormatLoss, visitedObjects)) return false;
        }
      }
      return true;
    }

    // For functions, Symbols and other non-JSON data types NOT in validJSONTypes
    return false;
}

/**
 * Checks if an object has a circular reference. This is a recursive function that will check all properties of an object.
 * This function is useful for debugging. However, note:
 * 1. It checks for circular references in ALL types of objects including custom and ES6 classes. it checks object properties 
 * (i.e., their state) and does not check for circular references in methods or object prototypes  
 * 2. It won't catch circular references in dynmically created properties (i.e., created when methods are called)
 * 3. If a custom or ES6 class overrides the default behavior of for...in or Object.keys, there may be problems 
 * @param {*} obj 
 * @param {*} visitedObjects 
 * @returns true if the object has a circular reference, false otherwise.
 */
function hasCircularReference(obj, visitedObjects = new WeakSet()) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    if (visitedObjects.has(obj)) {
        return true;
    }

    visitedObjects.add(obj);

    for (let key in obj) {
        if (hasCircularReference(obj[key], visitedObjects)) {
            return true;
        }
    }

    return false;
}

export { isJSONSerializable };
export { hasCircularReference };