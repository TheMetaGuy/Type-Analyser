import { getTypeOf } from '../testIndex.js';
import { isAsyncFunction, isArrowFunction } from '../testUtils.js';

// ----- primitive types -----

it('get getTypeOf  integer number', () => {
    expect(getTypeOf(1)).toBe('number');
});

it('get getTypeOf  float number', () => {
    expect(getTypeOf(99.99)).toBe('number');
});

it('get getTypeOf  bigint', () => {
    if (typeof BigInt !== 'undefined') {
        expect(getTypeOf(BigInt(123))).toBe('bigint');
    } else {
        console.log('BigInt is not supported in this environment');
    }
});

it('get getTypeOf  bigint literal', () => {
    if (typeof BigInt !== 'undefined') {
        expect(getTypeOf( 123n )).toBe('bigint');
    } else {
        console.log('BigInt is not supported in this environment');
    }      
});

it('get getTypeOf  string', () => {
    expect(getTypeOf('123')).toBe('string');
});

it('get getTypeOf  boolean', () => {
    expect(getTypeOf(true)).toBe('boolean');
});

it('get getTypeOf  null', () => {
    expect(getTypeOf(null)).toBe('null');
});

it('get getTypeOf  undefined', () => {
    expect(getTypeOf(undefined)).toBe('undefined');
});

// ----- non-primitive types -----
it('get getTypeOf  symbol', () => {
    expect(getTypeOf(Symbol('hello'))).toBe('symbol');
});

it('get getTypeOf  regex', () => {
    expect(getTypeOf(/hello/)).toBe('RegExp');
});

it('get getTypeOf  date', () => {
    expect(getTypeOf(new Date())).toBe('Date');
});

it('get getTypeOf  error', () => {
    expect(getTypeOf(new Error())).toBe('Error');
});

it('get getTypeOf  RangeEerror', () => {
    expect(getTypeOf(new RangeError())).toBe('RangeError');
});

it('get getTypeOf  AggregateError ', () => {
    if ( typeof AggregateError !== 'undefined' ) {
        const errors = [
            new Error("Error 1"),
            new Error("Error 2"),
        ];
        expect(getTypeOf(new AggregateError(errors, 'multiple errors'))).toBe('AggregateError');
    } else {
        console.log('AggregateError is not supported in this environment');
    }
});

it('get getTypeOf  url', () => {
    expect(getTypeOf(new URL('https://www.google.com'))).toBe('URL');
});

it('get getTypeOf  urlsearchparams', () => {
    expect(getTypeOf(new URLSearchParams())).toBe('URLSearchParams');
});

it('get getTypeOf  set', () => {
    expect(getTypeOf(new Set())).toBe('Set');
});

it('get getTypeOf  map', () => {
    expect(getTypeOf(new Map())).toBe('Map');
});

it('get getTypeOf  weakset', () => {
    expect(getTypeOf(new WeakSet())).toBe('WeakSet');
});

it('get getTypeOf  weakmap', () => {
    expect(getTypeOf(new WeakMap())).toBe('WeakMap');
});

it('get getTypeOf  dataview', () => {
    const buffer = new ArrayBuffer(16);
    expect(getTypeOf(new DataView(buffer))).toBe('DataView');
});

it('get getTypeOf  arraybuffer', () => {
    expect(getTypeOf(new ArrayBuffer())).toBe('ArrayBuffer');
});

it('get getTypeOf  sharedarraybuffer', () => {
    if ( typeof SharedArrayBuffer !== 'undefined' ) {
        expect(getTypeOf(new SharedArrayBuffer(16))).toBe('SharedArrayBuffer');
    } else {
        console.log('SharedArrayBuffer is not supported in this environment');
    }
});

it('get number type of Number Object', () => {
    expect(getTypeOf( new Number(999))).toBe('Number');   // Note case - its a Number object !
}); 

// ------ array types -----

it('get getTypeOf  Array', () => {
    expect(getTypeOf([])).toBe('Array');
});

it('get getTypeOf  uint8Array', () => {
    expect(getTypeOf(new Uint8Array())).toBe('Uint8Array');
});

it('get getTypeOf  int8Array', () => {    
    expect(getTypeOf(new Int8Array())).toBe('Int8Array');
});

it('get getTypeOf  int32Array', () => {
    expect(getTypeOf(new Int32Array())).toBe('Int32Array');
});

it('get getTypeOf  float32Array', () => {
    expect(getTypeOf(new Float32Array())).toBe('Float32Array');
});
  
it('get getTypeOf  float64Array', () => {
    expect(getTypeOf(new Float64Array())).toBe('Float64Array');
});
  
it('get getTypeOf  uint8clampedArray', () => {
    expect(getTypeOf(new Uint8ClampedArray())).toBe('Uint8ClampedArray');
});
  
it('get getTypeOf  bigint64Array', () => {
    if ( typeof BigInt64Array !== 'undefined' ) {
        expect(getTypeOf(new BigInt64Array())).toBe('BigInt64Array');
    } else {
        console.log('BigInt64Array is not supported in this environment');
    }
});
  
it('get getTypeOf  biguint64Array', () => {
    if ( typeof BigUint64Array !== 'undefined' ) {
        expect(getTypeOf(new BigUint64Array())).toBe('BigUint64Array');
    } else {    
        console.log('BigUint64Array is not supported in this environment');
    }
});

it('get getTypeOf  array iterator', () => {
    expect(getTypeOf([][Symbol.iterator]())).toBe('Array Iterator');
});

// ----- function types -----

it('get getTypeOf  anonymous function', () => {
    expect(getTypeOf(function() {})).toBe('function');
});

it('get getTypeOf  declared function', () => {
    function mydeclaredFunction() {}
    expect(getTypeOf(mydeclaredFunction)).toBe('function');
});

it('get getTypeOf  function reference', () => {
    let myFuncExpression = function() {};
    expect(getTypeOf(myFuncExpression)).toBe('function');
});

it('get getTypeOf  declared function instance', () => {
    function mydeclaredFunction() {}
    expect(getTypeOf(new mydeclaredFunction())).toBe('mydeclaredFunction');
});

it('get getTypeOf  function instance', () => {
    let myFuncExpression = function() {};
    expect(getTypeOf(new myFuncExpression())).toBe('myFuncExpression');
});

it('get getTypeOf  promise', () => {
    expect(getTypeOf(new Promise(() => {}))).toBe('Promise');
});

it('get getTypeOf  generatorfunction', () => {
    let theGenerator = function*() {};  
    expect(getTypeOf( theGenerator )).toBe('GeneratorFunction');
});

it('get getTypeOf  asyncfunction', () => {
    let myAsyncFunction = async function() {};
    if (  isAsyncFunction(myAsyncFunction)  ) {
        expect(getTypeOf( myAsyncFunction )).toBe('AsyncFunction');
    } else {
        expect(getTypeOf( myAsyncFunction )).toBe('function');  // if called from ES5 code
        console.log('Async functions are not supported in this environment');
    }
});

it('get getTypeOf  function reference', () => {
    let myFuncReference = function() {};
    expect(getTypeOf(myFuncReference)).toBe('function');
});

it('get getTypeOf  arrow Function ', () => {
    let myArrowFunction = () => {}; 
    if ( isArrowFunction(myArrowFunction) ) {
        expect(getTypeOf( myArrowFunction )).toBe('ArrowFunction');
    } else {
        expect(getTypeOf( myArrowFunction )).toBe('function');  // if called from ES5 code
        console.log('Arrow functions are not supported in this environment');
    }
});


// ------- objects and user-defined types -------

it('get getTypeOf  object', () => {
    expect(getTypeOf({})).toBe('object');
});

it('get getTypeOf  object instance', () => {
    expect(getTypeOf(new Object())).toBe('object');
});

it('get getTypeOf  user-defined object instance via the Spread operator', () => {
    let myObj = {
        name: 'John',
        age: 30,
    }
    let myObjCopy = { ... myObj };
    expect(getTypeOf(myObjCopy)).toBe('object');
});

it('get getTypeOf  user-defined object instance via Object.assign', () => {
    let myObj = {
        name: 'John',
        age: 30,    
    }   
    let myObjCopy = Object.assign({}, myObj);
    expect(getTypeOf(myObjCopy)).toBe('object');
});

it('get getTypeOf  user-defined object instance via Object.create', () => {
    let myObj = {};
    let myObjCopy = Object.create(myObj);
    expect(getTypeOf(myObjCopy)).toBe('object');
});

it('get getTypeOf  object with custom tag', () => {
    let myObj = {
        name: 'John',
        age: 30,
        [Symbol.toStringTag]: 'MyCustomTag'
    }
    expect(getTypeOf(myObj)).toBe('MyCustomTag');
});

it ('get getTypeOf  object with overridden toString method', () => {
    let myObj = {
        name: 'John',
        age: 30,
        toString: function() {
            return 'MagicObj';
        }
    }
    expect(getTypeOf(myObj)).toBe('unknown');
});

it('get getTypeOf  user-defined class instance', () => {
  class MyClass {
    constructor() {
      this.name = 'John';
      this.age = 30;
    }
    get [Symbol.toStringTag]() {
        return 'Not MyClass';
    }   
  }
  let myClassInstance = new MyClass();
  expect(myClassInstance[Symbol.toStringTag]).toBe('Not MyClass');      // functions as it should. This is default javascript behavior
  expect(getTypeOf(myClassInstance)).toBe('MyClass');              // instances should have the same 'type' as the class they are instantiated from
                                                                        // and by design are not affected by the toStringTag property
});

it('get getTypeOf of extended user class', () => {
    class MyClass {
        constructor() {
          this.name = 'John';
          this.age = 30;
        }
        get [Symbol.toStringTag]() {
            return 'Not MyClass';
        }   
    }    
    class OtherClass extends MyClass {
        constructor() {
            super();
        }
        get [Symbol.toStringTag]() {
            return 'Not OtherClass';
        }   
    }
    let myClassInstance = new OtherClass();
    expect(getTypeOf(myClassInstance)).toBe('OtherClass');
    
    let instanceProto = Object.getPrototypeOf(myClassInstance);  
    expect(getTypeOf(instanceProto)).toBe('OtherClass');      

                                                                // It may not be not obvious that we have to get the 
    let rootProto = Object.getPrototypeOf( instanceProto );     // prototype of the prototype to get the root (class) type
                                                                // note that Object.getPrototypeOf(OtherClass) will return 'function'!
    expect(getTypeOf(rootProto)).toBe('MyClass');
});


it('get getTypeOf  user-defined class instance with no user constructor', () => {
    class MyOtherClass {}
    let myClassInstance = new MyOtherClass();
    expect(getTypeOf(myClassInstance)).toBe('MyOtherClass'); 
});  



