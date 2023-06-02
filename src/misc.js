import { enhancedTypeOf } from "./index.js";
/**
 * Checks if an object is JSON serializable. This is a recursive function that will check all properties of an object.
 * @param {*} obj - the object to test
 * @param {*} visitedObjects - used internally to detect circular references. Do not pass this parameter.
 * @returns true if the object is JSON serializable, false otherwise.
 */
function isJSONSerializable(obj, visitedObjects = new Set()) {
    const validJSONTypes = ['string', 'number', 'boolean', 'undefined'];
  
    if (obj === null) return true;
    if (validJSONTypes.includes( enhancedTypeOf(obj))) return true;
  
    if (typeof obj === 'object') {
      if (visitedObjects.has(obj)) { // must be a circular reference
        return false;
      }
      visitedObjects.add(obj);
  
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (!isJSONSerializable(obj[key], visitedObjects)) return false;
        }
      }
      return true;
    }
  
    // For functions, Symbols and other non-JSON data types
    return false;
}

export { isJSONSerializable };