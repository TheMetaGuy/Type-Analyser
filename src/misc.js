import { enhancedTypeOf } from "./index.js";
/**
 * Checks if an object is JSON serializable. This is a recursive function that will check all properties of an object.
 * @param {*} obj - the object to test
 * @param {*} acceptFormatLoss - if false (the default), only return true for types that can be serializaed without problems.
 *                               if true also return true for types where data may need trivial conversion when de-serializing.
 *                               NOTE - 'date', 'url', 'urlsearchparams' are converted to strings when serializing to JSON and
 *                               'set', 'map' and all typed arrays are converted to regular arrays when serializing to JSON.
 *                               E.g. New Date(obj.date) or new URL(obj.url) or new Set(obj.set) etc can be used to convert 
 *                               back to the original type. 
 * @param {*} visitedObjects - used internally to detect circular references. Do not pass this parameter.
 * @returns true if the object is JSON serializable WITHOUT a loss of data, false otherwise.
 */
function isJSONSerializable(obj, acceptFormatLoss = false, visitedObjects = new Set()) {
    const validJSONTypes = ['string', 'number', 'boolean', 'undefined', 'null'];
  
    // types where no data is lost but there is a change in data format when serializing
    const lossyValidJSONTypes = [
        'date', 'url', 'urlsearchparams', 
        'set', 'map', 
        'int8array', 'uint8array', 'uint8clampedarray', 
        'int16array', 'uint16array', 
        'int32array', 'uint32array', 'float32array',
        'float64array', 'bigint64array', 'biguint64array'
    ];
    if (acceptFormatLoss) {
        validJSONTypes.push(...lossyValidJSONTypes);
    }

    let type = enhancedTypeOf(obj);
    if (validJSONTypes.includes( type )) return true;

    if (type === 'object' || type === 'array') {
      // check for circular references  
      if (visitedObjects.has(obj)) { 
        return false;
      }
      visitedObjects.add(obj);
  
      // Non integer array properties cannot be JSON serialized as data will be lost when serializing to JSON
      if (type === 'array') { 
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

export { isJSONSerializable };
