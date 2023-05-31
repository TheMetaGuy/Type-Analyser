import { enhancedTypeOf } from '../src/index.js';

// ----- primitive types -----

test('getType of integer number', () => {
    expect(enhancedTypeOf(1)).toBe('number');
});

test('getType of float number', () => {
    expect(enhancedTypeOf(99.99)).toBe('number');
});

test('getType of bigint', () => {
    expect(enhancedTypeOf(BigInt(123))).toBe('bigint');
});

test('getType of string', () => {
    expect(enhancedTypeOf('123')).toBe('string');
});

test('getType of boolean', () => {
    expect(enhancedTypeOf(true)).toBe('boolean');
});

test('getType of null', () => {
    expect(enhancedTypeOf(null)).toBe('null');
});

// ----- non-primitive types -----

test('getType of object', () => {
    expect(enhancedTypeOf({})).toBe('object');
});

test('getType of array', () => {
    expect(enhancedTypeOf([])).toBe('array');
});

test('getType of date', () => {
    expect(enhancedTypeOf(new Date())).toBe('date');
});

test('getType of function', () => {
    expect(enhancedTypeOf(function() {})).toBe('function');
});

test('getType of regex', () => {
    expect(enhancedTypeOf(/hello/)).toBe('regexp');
});

test('getType of error', () => {
    expect(enhancedTypeOf(new Error())).toBe('error');
});

test('getType of symbol', () => {
    expect(enhancedTypeOf(Symbol('hello'))).toBe('symbol');
});

test('getType of set', () => {
    expect(enhancedTypeOf(new Set())).toBe('set');
});

test('getType of map', () => {
    expect(enhancedTypeOf(new Map())).toBe('map');
});

test('getType of weakset', () => {
    expect(enhancedTypeOf(new WeakSet())).toBe('weakset');
});

test('getType of weakmap', () => {
    expect(enhancedTypeOf(new WeakMap())).toBe('weakmap');
});

test('getType of arraybuffer', () => {
    expect(enhancedTypeOf(new ArrayBuffer())).toBe('arraybuffer');
});

test('getType of dataview', () => {
    const buffer = new ArrayBuffer(16);
    expect(enhancedTypeOf(new DataView(buffer))).toBe('dataview');
});

// ----- function types -----

test('getType of promise', () => {
    expect(enhancedTypeOf(new Promise(() => {}))).toBe('promise');
});

test('getType of generatorfunction', () => {
    let theGenerator = function*() {};  
    expect(enhancedTypeOf( theGenerator )).toBe('generatorfunction');
});

test('getType of asyncfunction', () => {
    let myAsyncFunction = async function() {};
    expect(enhancedTypeOf( myAsyncFunction )).toBe('asyncfunction');
});

// ------ array types -----

test('getType of uint8array', () => {
    expect(enhancedTypeOf(new Uint8Array())).toBe('uint8array');
});

test('getType of int8array', () => {    
    expect(enhancedTypeOf(new Int8Array())).toBe('int8array');
});

test('getType of int32array', () => {
    expect(enhancedTypeOf(new Int32Array())).toBe('int32array');
});

test('getType of float32array', () => {
    expect(enhancedTypeOf(new Float32Array())).toBe('float32array');
});
  
test('getType of float64array', () => {
    expect(enhancedTypeOf(new Float64Array())).toBe('float64array');
});
  
test('getType of uint8clampedarray', () => {
    expect(enhancedTypeOf(new Uint8ClampedArray())).toBe('uint8clampedarray');
});
  
test('getType of bigint64array', () => {
    expect(enhancedTypeOf(new BigInt64Array())).toBe('bigint64array');
});
  
test('getType of biguint64array', () => {
    expect(enhancedTypeOf(new BigUint64Array())).toBe('biguint64array');
});
  
test('getType of sharedarraybuffer', () => {
    expect(enhancedTypeOf(new SharedArrayBuffer(16))).toBe('sharedarraybuffer');
});

// ------- user-defined types -------

test('getType of user-defined object instance', () => {
    let myObj = {
        name: 'John',
        age: 30,
    }
    let myObjCopy = { ... myObj };
    expect(enhancedTypeOf(myObjCopy)).toBe('object');
});

test('getType of user-defined class instance', () => {
  class MyClass {
    constructor() {
      this.name = 'John';
      this.age = 30;
    }
  }
  let myClassInstance = new MyClass();
  expect(enhancedTypeOf(myClassInstance)).toBe('MyClass');
});

test('getType of user-defined class instance with no user constructor', () => {
    class MyOtherClass {}
    let myClassInstance = new MyOtherClass();
    expect(enhancedTypeOf(myClassInstance)).toBe('MyOtherClass');
  });
  




