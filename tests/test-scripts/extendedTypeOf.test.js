import { extendedTypeOf } from '../testIndex.js';
import { isAsyncFunction, isArrowFunction } from '../testUtils.js';

// ----- primitive types -----

it('get extendedTypeOf  integer number', () => {
    expect(extendedTypeOf(1)).toBe('number');
});

it('get extendedTypeOf  float number', () => {
    expect(extendedTypeOf(99.99)).toBe('number');
});

it('get extendedTypeOf  bigint', () => {
    expect(extendedTypeOf(BigInt(123))).toBe('bigint');
});

it('get extendedTypeOf  bigint literal', () => {
    expect(extendedTypeOf( 123n )).toBe('bigint');
});

it('get extendedTypeOf  string', () => {
    expect(extendedTypeOf('123')).toBe('string');
});

it('get extendedTypeOf  boolean', () => {
    expect(extendedTypeOf(true)).toBe('boolean');
});

it('get extendedTypeOf  null', () => {
    expect(extendedTypeOf(null)).toBe('null');
});

it('get extendedTypeOf  undefined', () => {
    expect(extendedTypeOf(undefined)).toBe('undefined');
});

// ----- non-primitive types -----
it('get extendedTypeOf  symbol', () => {
    expect(extendedTypeOf(Symbol('hello'))).toBe('symbol');
});

it('get extendedTypeOf  regex', () => {
    expect(extendedTypeOf(/hello/)).toBe('RegExp');
});

it('get extendedTypeOf  date', () => {
    expect(extendedTypeOf(new Date())).toBe('Date');
});

it('get extendedTypeOf  error', () => {
    expect(extendedTypeOf(new Error())).toBe('Error');
});

it('get extendedTypeOf  RangeEerror', () => {
    expect(extendedTypeOf(new RangeError())).toBe('RangeError');
});

it('get extendedTypeOf  AggregateError ', () => {
    const errors = [
        new Error("Error 1"),
        new Error("Error 2"),
      ];
    expect(extendedTypeOf(new AggregateError(errors, 'multiple errors'))).toBe('AggregateError');
});

it('get extendedTypeOf  url', () => {
    expect(extendedTypeOf(new URL('https://www.google.com'))).toBe('URL');
});

it('get extendedTypeOf  urlsearchparams', () => {
    expect(extendedTypeOf(new URLSearchParams())).toBe('URLSearchParams');
});

it('get extendedTypeOf  set', () => {
    expect(extendedTypeOf(new Set())).toBe('Set');
});

it('get extendedTypeOf  map', () => {
    expect(extendedTypeOf(new Map())).toBe('Map');
});

it('get extendedTypeOf  weakset', () => {
    expect(extendedTypeOf(new WeakSet())).toBe('WeakSet');
});

it('get extendedTypeOf  weakmap', () => {
    expect(extendedTypeOf(new WeakMap())).toBe('WeakMap');
});

it('get extendedTypeOf  dataview', () => {
    const buffer = new ArrayBuffer(16);
    expect(extendedTypeOf(new DataView(buffer))).toBe('DataView');
});

it('get extendedTypeOf  arraybuffer', () => {
    expect(extendedTypeOf(new ArrayBuffer())).toBe('ArrayBuffer');
});

it('get extendedTypeOf  sharedarraybuffer', () => {
    if ( typeof SharedArrayBuffer !== 'undefined' ) {
        expect(extendedTypeOf(new SharedArrayBuffer(16))).toBe('SharedArrayBuffer');
    }
});

// ------ array types -----

it('get extendedTypeOf  Array', () => {
    expect(extendedTypeOf([])).toBe('Array');
});

it('get extendedTypeOf  uint8Array', () => {
    expect(extendedTypeOf(new Uint8Array())).toBe('Uint8Array');
});

it('get extendedTypeOf  int8Array', () => {    
    expect(extendedTypeOf(new Int8Array())).toBe('Int8Array');
});

it('get extendedTypeOf  int32Array', () => {
    expect(extendedTypeOf(new Int32Array())).toBe('Int32Array');
});

it('get extendedTypeOf  float32Array', () => {
    expect(extendedTypeOf(new Float32Array())).toBe('Float32Array');
});
  
it('get extendedTypeOf  float64Array', () => {
    expect(extendedTypeOf(new Float64Array())).toBe('Float64Array');
});
  
it('get extendedTypeOf  uint8clampedArray', () => {
    expect(extendedTypeOf(new Uint8ClampedArray())).toBe('Uint8ClampedArray');
});
  
it('get extendedTypeOf  bigint64Array', () => {
    expect(extendedTypeOf(new BigInt64Array())).toBe('BigInt64Array');
});
  
it('get extendedTypeOf  biguint64Array', () => {
    expect(extendedTypeOf(new BigUint64Array())).toBe('BigUint64Array');
});

it('get extendedTypeOf  array iterator', () => {
    expect(extendedTypeOf([][Symbol.iterator]())).toBe('Array Iterator');
});

// ----- function types -----

it('get extendedTypeOf  anonymous function', () => {
    expect(extendedTypeOf(function() {})).toBe('function');
});

it('get extendedTypeOf  declared function', () => {
    function mydeclaredFunction() {}
    expect(extendedTypeOf(mydeclaredFunction)).toBe('function');
});

it('get extendedTypeOf  function reference', () => {
    let myFuncExpression = function() {};
    expect(extendedTypeOf(myFuncExpression)).toBe('function');
});

it('get extendedTypeOf  declared function instance', () => {
    function mydeclaredFunction() {}
    expect(extendedTypeOf(new mydeclaredFunction())).toBe('mydeclaredFunction');
});

it('get extendedTypeOf  function instance', () => {
    let myFuncExpression = function() {};
    expect(extendedTypeOf(new myFuncExpression())).toBe('myFuncExpression');
});

it('get extendedTypeOf  promise', () => {
    expect(extendedTypeOf(new Promise(() => {}))).toBe('Promise');
});

it('get extendedTypeOf  generatorfunction', () => {
    let theGenerator = function*() {};  
    expect(extendedTypeOf( theGenerator )).toBe('GeneratorFunction');
});

it('get extendedTypeOf  asyncfunction', () => {
    let myAsyncFunction = async function() {};
    if (  isAsyncFunction(myAsyncFunction)  ) {
        expect(extendedTypeOf( myAsyncFunction )).toBe('AsyncFunction');
    } else {
        expect(extendedTypeOf( myAsyncFunction )).toBe('function');  // if called from ES5 code
    }
});

it('get extendedTypeOf  function reference', () => {
    let myFuncReference = function() {};
    expect(extendedTypeOf(myFuncReference)).toBe('function');
});

it('get extendedTypeOf  arrow Function ', () => {
    let myArrowFunction = () => {}; 
    if ( isArrowFunction(myArrowFunction) ) {
        expect(extendedTypeOf( myArrowFunction )).toBe('ArrowFunction');
    } else {
        expect(extendedTypeOf( myArrowFunction )).toBe('function');  // if called from ES5 code
    }
});


// ------- objects and user-defined types -------

it('get extendedTypeOf  object', () => {
    expect(extendedTypeOf({})).toBe('object');
});

it('get extendedTypeOf  object instance', () => {
    expect(extendedTypeOf(new Object())).toBe('object');
});

it('get extendedTypeOf  user-defined object instance via the Spread operator', () => {
    let myObj = {
        name: 'John',
        age: 30,
    }
    let myObjCopy = { ... myObj };
    expect(extendedTypeOf(myObjCopy)).toBe('object');
});

it('get extendedTypeOf  user-defined object instance via Object.assign', () => {
    let myObj = {
        name: 'John',
        age: 30,    
    }   
    let myObjCopy = Object.assign({}, myObj);
    expect(extendedTypeOf(myObjCopy)).toBe('object');
});

it('get extendedTypeOf  user-defined object instance via Object.create', () => {
    let myObj = {};
    let myObjCopy = Object.create(myObj);
    expect(extendedTypeOf(myObjCopy)).toBe('object');
});

it('get extendedTypeOf  object with custom tag', () => {
    let myObj = {
        name: 'John',
        age: 30,
        [Symbol.toStringTag]: 'MyCustomTag'
    }
    expect(extendedTypeOf(myObj)).toBe('MyCustomTag');
});

it('get extendedTypeOf  user-defined class instance', () => {
  class MyClass {
    constructor() {
      this.name = 'John';
      this.age = 30;
    }
  }
  let myClassInstance = new MyClass();
  expect(extendedTypeOf(myClassInstance)).toBe('MyClass');
});

it('get extendedTypeOf  user-defined class instance with no user constructor', () => {
    class MyOtherClass {}
    let myClassInstance = new MyOtherClass();
    expect(extendedTypeOf(myClassInstance)).toBe('MyOtherClass'); 
});  



