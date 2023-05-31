/**
 * Accurately identifies the type of almost all Javascript objects not just the primitive types.
 * @param {*} obj 
 * @returns a string representing the type of the object passed in.
 */

function getType(obj) {
    let typeStr = typeof(obj);

    if (typeStr !== 'object' && typeStr !== 'function') {
        return typeStr;
    }
    // convert an object to a string forrm of it's primitive value.
    typeStr = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();  // slice(8, -1) removes the constant [object ] and the last ]

    // if it's a class
    if ( typeStr === 'object' && obj.constructor && obj.constructor.name) {
        return obj.constructor.name;
    }
    return typeStr;
}

export { getType };