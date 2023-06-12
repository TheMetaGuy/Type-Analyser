function isAsyncFunction(obj) {
    if (obj.constructor === undefined) {
        return false;
    }
    if (obj.constructor.name !== "AsyncFunction") {
        return false;
    }
    if (obj.prototype && obj.prototype.then === undefined) {
        return false;
    }
    return true;
}

function isArrowFunction(obj) {
    if ( typeof obj === "function" && !obj.prototype) {
        return true;
    } else {
        return false;
    }
}

export { isAsyncFunction, isArrowFunction };