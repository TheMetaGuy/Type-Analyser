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

test('should handle Symbol polyfill', () => {
    // Assuming your Symbol polyfill adds a valueOf method to an object that returns 'Symbol()'
    let fakeSymbol = { key : Math.random()*Number.MAX_SAFE_INTEGER };
    fakeSymbol.valueOf = function() { return 'Symbol(' + this.key.toString() + ')' };
    console.log(fakeSymbol.valueOf());
    expect(isJSONSerializable(fakeSymbol)).toBe(false);
});
