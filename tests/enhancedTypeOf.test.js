import { enhancedTypeOf } from '../src/index.js';
import { isAsyncFunction, isArrowFunction } from './testUtils.js';

// ----- primitive types -----

it('get enhanced type of integer number', () => {
    expect(enhancedTypeOf(1)).toBe('number');
});

it('get enhanced type of float number', () => {
    expect(enhancedTypeOf(99.99)).toBe('number');
});

it('get enhanced type of bigint', () => {
    expect(enhancedTypeOf(BigInt(123))).toBe('bigint');
});

it('get enhanced type of bigint literal', () => {
    expect(enhancedTypeOf( 123n )).toBe('bigint');
});

it('get enhanced type of string', () => {
    expect(enhancedTypeOf('123')).toBe('string');
});

it('get enhanced type of boolean', () => {
    expect(enhancedTypeOf(true)).toBe('boolean');
});

it('get enhanced type of null', () => {
    expect(enhancedTypeOf(null)).toBe('null');
});

it('get enhanced type of undefined', () => {
    expect(enhancedTypeOf(undefined)).toBe('undefined');
});

// ----- non-primitive types -----
it('get enhanced type of symbol', () => {
    expect(enhancedTypeOf(Symbol('hello'))).toBe('symbol');
});

it('get enhanced type of regex', () => {
    expect(enhancedTypeOf(/hello/)).toBe('RegExp');
});

it('get enhanced type of date', () => {
    expect(enhancedTypeOf(new Date())).toBe('Date');
});

it('get enhanced type of error', () => {
    expect(enhancedTypeOf(new Error())).toBe('Error');
});

it('get enhanced type of RangeEerror', () => {
    expect(enhancedTypeOf(new RangeError())).toBe('RangeError');
});

it('get enhanced type of AggregateError ', () => {
    const errors = [
        new Error("Error 1"),
        new Error("Error 2"),
      ];
    expect(enhancedTypeOf(new AggregateError(errors, 'multiple errors'))).toBe('AggregateError');
});

it('get enhanced type of url', () => {
    expect(enhancedTypeOf(new URL('https://www.google.com'))).toBe('URL');
});

it('get enhanced type of urlsearchparams', () => {
    expect(enhancedTypeOf(new URLSearchParams())).toBe('URLSearchParams');
});

it('get enhanced type of set', () => {
    expect(enhancedTypeOf(new Set())).toBe('Set');
});

it('get enhanced type of map', () => {
    expect(enhancedTypeOf(new Map())).toBe('Map');
});

it('get enhanced type of weakset', () => {
    expect(enhancedTypeOf(new WeakSet())).toBe('WeakSet');
});

it('get enhanced type of weakmap', () => {
    expect(enhancedTypeOf(new WeakMap())).toBe('WeakMap');
});

it('get enhanced type of dataview', () => {
    const buffer = new ArrayBuffer(16);
    expect(enhancedTypeOf(new DataView(buffer))).toBe('DataView');
});

it('get enhanced type of arraybuffer', () => {
    expect(enhancedTypeOf(new ArrayBuffer())).toBe('ArrayBuffer');
});

it('get enhanced type of sharedarraybuffer', () => {
    if ( typeof SharedArrayBuffer !== 'undefined' ) {
        expect(enhancedTypeOf(new SharedArrayBuffer(16))).toBe('SharedArrayBuffer');
    }
});

// ------ array types -----

it('get enhanced type of Array', () => {
    expect(enhancedTypeOf([])).toBe('Array');
});

it('get enhanced type of uint8Array', () => {
    expect(enhancedTypeOf(new Uint8Array())).toBe('Uint8Array');
});

it('get enhanced type of int8Array', () => {    
    expect(enhancedTypeOf(new Int8Array())).toBe('Int8Array');
});

it('get enhanced type of int32Array', () => {
    expect(enhancedTypeOf(new Int32Array())).toBe('Int32Array');
});

it('get enhanced type of float32Array', () => {
    expect(enhancedTypeOf(new Float32Array())).toBe('Float32Array');
});
  
it('get enhanced type of float64Array', () => {
    expect(enhancedTypeOf(new Float64Array())).toBe('Float64Array');
});
  
it('get enhanced type of uint8clampedArray', () => {
    expect(enhancedTypeOf(new Uint8ClampedArray())).toBe('Uint8ClampedArray');
});
  
it('get enhanced type of bigint64Array', () => {
    expect(enhancedTypeOf(new BigInt64Array())).toBe('BigInt64Array');
});
  
it('get enhanced type of biguint64Array', () => {
    expect(enhancedTypeOf(new BigUint64Array())).toBe('BigUint64Array');
});

it('get enhanced type of array iterator', () => {
    expect(enhancedTypeOf([][Symbol.iterator]())).toBe('Array Iterator');
});

// ----- function types -----

it('get enhanced type of anonymous function', () => {
    expect(enhancedTypeOf(function() {})).toBe('function');
});

it('get enhanced type of declared function', () => {
    function mydeclaredFunction() {}
    expect(enhancedTypeOf(mydeclaredFunction)).toBe('function');
});

it('get enhanced type of function reference', () => {
    let myFuncExpression = function() {};
    expect(enhancedTypeOf(myFuncExpression)).toBe('function');
});

it('get enhanced type of declared function instance', () => {
    function mydeclaredFunction() {}
    expect(enhancedTypeOf(new mydeclaredFunction())).toBe('mydeclaredFunction');
});

it('get enhanced type of function instance', () => {
    let myFuncExpression = function() {};
    expect(enhancedTypeOf(new myFuncExpression())).toBe('myFuncExpression');
});

it('get enhanced type of promise', () => {
    expect(enhancedTypeOf(new Promise(() => {}))).toBe('Promise');
});

it('get enhanced type of generatorfunction', () => {
    let theGenerator = function*() {};  
    expect(enhancedTypeOf( theGenerator )).toBe('GeneratorFunction');
});

it('get enhanced type of asyncfunction', () => {
    let myAsyncFunction = async function() {};
    if (  isAsyncFunction(myAsyncFunction)  ) {
        expect(enhancedTypeOf( myAsyncFunction )).toBe('AsyncFunction');
    } else {
        expect(enhancedTypeOf( myAsyncFunction )).toBe('function');  // if called from ES5 code
    }
});

it('get enhanced type of function reference', () => {
    let myFuncReference = function() {};
    expect(enhancedTypeOf(myFuncReference)).toBe('function');
});

it('get enhanced type of arrow Function ', () => {
    let myArrowFunction = () => {}; 
    if ( isArrowFunction(myArrowFunction) ) {
        expect(enhancedTypeOf( myArrowFunction )).toBe('ArrowFunction');
    } else {
        expect(enhancedTypeOf( myArrowFunction )).toBe('function');  // if called from ES5 code
    }
});


// ------- objects and user-defined types -------

it('get enhanced type of object', () => {
    expect(enhancedTypeOf({})).toBe('object');
});

it('get enhanced type of object instance', () => {
    expect(enhancedTypeOf(new Object())).toBe('object');
});

it('get enhanced type  of user-defined object instance via the Spread operator', () => {
    let myObj = {
        name: 'John',
        age: 30,
    }
    let myObjCopy = { ... myObj };
    expect(enhancedTypeOf(myObjCopy)).toBe('object');
});

it('get enhanced type  of user-defined object instance via Object.assign', () => {
    let myObj = {
        name: 'John',
        age: 30,    
    }   
    let myObjCopy = Object.assign({}, myObj);
    expect(enhancedTypeOf(myObjCopy)).toBe('object');
});

it('get enhanced type  of user-defined object instance via Object.create', () => {
    let myObj = {};
    let myObjCopy = Object.create(myObj);
    expect(enhancedTypeOf(myObjCopy)).toBe('object');
});

it('get enhanced type of object with custom tag', () => {
    let myObj = {
        name: 'John',
        age: 30,
        [Symbol.toStringTag]: 'MyCustomTag'
    }
    expect(enhancedTypeOf(myObj)).toBe('MyCustomTag');
});

it('get enhanced type  of user-defined class instance', () => {
  class MyClass {
    constructor() {
      this.name = 'John';
      this.age = 30;
    }
  }
  let myClassInstance = new MyClass();
  expect(enhancedTypeOf(myClassInstance)).toBe('MyClass');
});

it('get enhanced type  of user-defined class instance with no user constructor', () => {
    class MyOtherClass {}
    let myClassInstance = new MyOtherClass();
    expect(enhancedTypeOf(myClassInstance)).toBe('MyOtherClass'); 
});  



