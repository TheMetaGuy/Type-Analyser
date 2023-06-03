import { enhancedTypeOf } from '../src/index.js';

// ----- primitive types -----

test('get enhanced type of integer number', () => {
    expect(enhancedTypeOf(1)).toBe('number');
});

test('get enhanced type of float number', () => {
    expect(enhancedTypeOf(99.99)).toBe('number');
});

test('get enhanced type of bigint', () => {
    expect(enhancedTypeOf(BigInt(123))).toBe('bigint');
});

test('get enhanced type of string', () => {
    expect(enhancedTypeOf('123')).toBe('string');
});

test('get enhanced type of boolean', () => {
    expect(enhancedTypeOf(true)).toBe('boolean');
});

test('get enhanced type of null', () => {
    expect(enhancedTypeOf(null)).toBe('null');
});

test('get enhanced type of undefined', () => {
    expect(enhancedTypeOf(undefined)).toBe('undefined');
});

// ----- non-primitive types -----

test('get enhanced type of symbol', () => {
    expect(enhancedTypeOf(Symbol('hello'))).toBe('symbol');
});

test('get enhanced type of regex', () => {
    expect(enhancedTypeOf(/hello/)).toBe('regexp');
});

test('get enhanced type of date', () => {
    expect(enhancedTypeOf(new Date())).toBe('date');
});

test('get enhanced type of error', () => {
    expect(enhancedTypeOf(new Error())).toBe('error');
});

test('get enhanced type of url', () => {
    expect(enhancedTypeOf(new URL('https://www.google.com'))).toBe('url');
});

test('get enhanced type of urlsearchparams', () => {
    expect(enhancedTypeOf(new URLSearchParams())).toBe('urlsearchparams');
});

test('get enhanced type of set', () => {
    expect(enhancedTypeOf(new Set())).toBe('set');
});

test('get enhanced type of map', () => {
    expect(enhancedTypeOf(new Map())).toBe('map');
});

test('get enhanced type of weakset', () => {
    expect(enhancedTypeOf(new WeakSet())).toBe('weakset');
});

test('get enhanced type of weakmap', () => {
    expect(enhancedTypeOf(new WeakMap())).toBe('weakmap');
});

test('get enhanced type of dataview', () => {
    const buffer = new ArrayBuffer(16);
    expect(enhancedTypeOf(new DataView(buffer))).toBe('dataview');
});

test('get enhanced type of arraybuffer', () => {
    expect(enhancedTypeOf(new ArrayBuffer())).toBe('arraybuffer');
});

test('get enhanced type of sharedarraybuffer', () => {
    expect(enhancedTypeOf(new SharedArrayBuffer(16))).toBe('sharedarraybuffer');
});

// ------ array types -----

test('get enhanced type of array', () => {
    expect(enhancedTypeOf([])).toBe('array');
});

test('get enhanced type of uint8array', () => {
    expect(enhancedTypeOf(new Uint8Array())).toBe('uint8array');
});

test('get enhanced type of int8array', () => {    
    expect(enhancedTypeOf(new Int8Array())).toBe('int8array');
});

test('get enhanced type of int32array', () => {
    expect(enhancedTypeOf(new Int32Array())).toBe('int32array');
});

test('get enhanced type of float32array', () => {
    expect(enhancedTypeOf(new Float32Array())).toBe('float32array');
});
  
test('get enhanced type of float64array', () => {
    expect(enhancedTypeOf(new Float64Array())).toBe('float64array');
});
  
test('get enhanced type of uint8clampedarray', () => {
    expect(enhancedTypeOf(new Uint8ClampedArray())).toBe('uint8clampedarray');
});
  
test('get enhanced type of bigint64array', () => {
    expect(enhancedTypeOf(new BigInt64Array())).toBe('bigint64array');
});
  
test('get enhanced type of biguint64array', () => {
    expect(enhancedTypeOf(new BigUint64Array())).toBe('biguint64array');
});

test('get enhanced type of array iterator', () => {
    expect(enhancedTypeOf([][Symbol.iterator]())).toBe('array iterator');
});

// ----- function types -----

test('get enhanced type of function', () => {
    expect(enhancedTypeOf(function() {})).toBe('function');
});

test('get enhanced type of function', () => {
    let myFunc = function() {};
    expect(enhancedTypeOf(new myFunc())).toBe('myFunc');
});

test('get enhanced type of promise', () => {
    expect(enhancedTypeOf(new Promise(() => {}))).toBe('promise');
});

test('get enhanced type of generatorfunction', () => {
    let theGenerator = function*() {};  
    expect(enhancedTypeOf( theGenerator )).toBe('generatorfunction');
});

test('get enhanced type of asyncfunction', () => {
    let myAsyncFunction = async function() {};
    expect(enhancedTypeOf( myAsyncFunction )).toBe('asyncfunction');
});

test('get enhanced type of function with extra info', () => {
    let myFunc = function() {};
    expect(enhancedTypeOf(myFunc, true)).toBe('function reference to: myFunc');
});

test('get enhanced type of generatorfunction with extra info', () => {
    let theGenerator = function*() {};  
    expect(enhancedTypeOf( theGenerator, true )).toBe('generatorfunction reference to: theGenerator');
});

test('get enhanced type of asyncfunction with extra info', () => {
    let myAsyncFunction = async function() {};
    expect(enhancedTypeOf( myAsyncFunction, true )).toBe('asyncfunction reference to: myAsyncFunction');
});


// ------- objects and user-defined types -------

test('get enhanced type of object', () => {
    expect(enhancedTypeOf({})).toBe('object');
});

test('get enhanced type  of user-defined object instance', () => {
    let myObj = {
        name: 'John',
        age: 30,
    }
    let myObjCopy = { ... myObj };
    expect(enhancedTypeOf(myObjCopy)).toBe('object');
});

test('get enhanced type  of user-defined class instance', () => {
  class MyClass {
    constructor() {
      this.name = 'John';
      this.age = 30;
    }
  }
  let myClassInstance = new MyClass();
  expect(enhancedTypeOf(myClassInstance)).toBe('MyClass');
});

test('get enhanced type  of user-defined class instance with no user constructor', () => {
    class MyOtherClass {}
    let myClassInstance = new MyOtherClass();
    expect(enhancedTypeOf(myClassInstance)).toBe('MyOtherClass');
  });
  




