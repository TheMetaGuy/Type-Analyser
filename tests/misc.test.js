import { isJSONSerializable } from '../src/index.js';

test('should return true for null', () => {
    expect(isJSONSerializable(null)).toBe(true);
});

test('should return true for primitive types', () => {
    expect(isJSONSerializable('a string')).toBe(true);
    expect(isJSONSerializable(123)).toBe(true);
    expect(isJSONSerializable(true)).toBe(true);
    expect(isJSONSerializable(undefined)).toBe(true);
});

test('should return false for function type', () => {
    expect(isJSONSerializable(() => {})).toBe(false);
});

test('should return true for plain objects', () => {
    expect(isJSONSerializable({})).toBe(true);
    expect(isJSONSerializable({ a: 1, b: 'test', c: true })).toBe(true);
});

test('should return false for objects with non-serializable properties', () => {
    expect(isJSONSerializable({ a: 1, b: 'test', c: () => {} })).toBe(false);
});

test('should return true for arrays', () => {
    expect(isJSONSerializable([])).toBe(true);
    expect(isJSONSerializable([1, 'test', true])).toBe(true);
});

test('should return false for arrays with non-serializable elements', () => {
    expect(isJSONSerializable([1, 'test', () => {}])).toBe(false);
});

test('should handle nested objects', () => {
    expect(isJSONSerializable({ a: { b: { c: 1 }}})).toBe(true);
    expect(isJSONSerializable({ a: [1, { b: 'test' }] })).toBe(true);
});

test('should detect circular references', () => {
    let obj = { a: 1 };
    obj.b = obj;
    expect(isJSONSerializable(obj)).toBe(false);
});

test('should handle ES5 type Symbol polyfill', () => {
    // Assumie an Symbol polyfill adds a valueOf method to an object that returns 'Symbol()'
    let fakeSymbol = { key : Math.random()*Number.MAX_SAFE_INTEGER };
    fakeSymbol.valueOf = function() { return 'Symbol(' + this.key.toString() + ')' };
    expect(isJSONSerializable(fakeSymbol)).toBe(false);
});

// -----check for nested invalid types -----

test('should handle deeply nested function', () => {
    const obj = {
        level1: {
            level2: { func: function() {}, },
        },
    };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});
  
test('should handle deeply nested Date', () => {
    const obj = {
        level1: {
            level2: { date: new Date(), },
        },
    };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});
  
test('should handle deeply nested RegExp', () => {
    const obj = {
        level1: {
            level2: { regex: new RegExp('^abc'), },
        },
    };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});

// ----- non-serializable types where data is lost -----


test('should return false for Error', () => {
    let obj = { key: new Error('This is an error message') };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});

test('should return false for URL', () => {
    let obj = { key: new URL('http://example.com') };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for URLSearchParams', () => {
    let obj = { key: new URLSearchParams('name=Jonathan') };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Set', () => {
    let obj = { key: new Set([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Map', () => {
    let obj = { key: new Map([[{ a: 1 }, 2]]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for WeakSet', () => {
    let obj = { key: new WeakSet([{ a: 1, b: 2 }]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});

test('should return false for WeakMap', () => {
    let obj = { key: new WeakMap([[{ a: 1 }, 2]]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});

test('should return false for Int8Array', () => {
    let obj = { key: new Int8Array([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Uint8Array', () => {
    let obj = { key: new Uint8Array([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Uint8ClampedArray', () => {
    let obj = { key: new Uint8ClampedArray([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Int16Array', () => {
    let obj = { key: new Int16Array([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Uint16Array', () => {
    let obj = { key: new Uint16Array([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Int32Array', () => {
    let obj = { key: new Int32Array([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Uint32Array', () => {
    let obj = { key: new Uint32Array([1, 2, 3, 4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for Float32Array', () => {
    let obj = { key: new Float32Array([1.1, 2.2, 3.3, 4.4]) };
    expect(isJSONSerializable(obj)).toBe(false);
});

test('should return false for Float64Array', () => {
    let obj = { key: new Float64Array([1.1, 2.2, 3.3, 4.4]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for BigInt64Array', () => {
    let obj = { key: new BigInt64Array([BigInt(1), BigInt(2), BigInt(3), BigInt(4)]) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(true);
});

test('should return false for ArrayBuffer', () => {
    let obj = { key: new ArrayBuffer(8) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});

test ('should return false for DataView', () => {
    let obj = { key: new DataView(new ArrayBuffer(8)) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});

test ('should return false for SharedArryBuffer', () => {    
    let obj = { key: new SharedArrayBuffer(8) };
    expect(isJSONSerializable(obj)).toBe(false);
    expect(isJSONSerializable(obj,true)).toBe(false);
});

