import { getTypeOf } from '../testIndex.js';
import { isAsyncFunction, isArrowFunction } from '../testUtils.js';

import { enhancedTypeOf } from '../testIndex.js';

// Mock console.warn to avoid noisy warning spam during tests
// use built-in typeof operator here to avoid ReferenceError when window has not been declared (i.e. in nodejs)
var realGlobal = ( typeof window !== 'undefined') ? window : global;
realGlobal.console = {
    warn: function() {},
    log: console.log,
    error: console.error,
    info: console.info,
    debug: console.debug,
};

//  basic check of deprecated version of getTypeOf
it('get enhancedTypeOf string', () => {
    expect(enhancedTypeOf('123')).toBe('string');
});
it('get enhancedTypeOf boolean', () => {
    expect(enhancedTypeOf(true)).toBe('boolean');
});
it('get enhancedTypeOf null', () => {
    expect(enhancedTypeOf(null)).toBe('null');
});
it('get enhancedTypeOf undefined', () => {
    expect(enhancedTypeOf(undefined)).toBe('undefined');
})
// ----------- end of deprecated tests -----------


// ----- primitive types -----

it('getTypeOf integer number', () => {
    expect(getTypeOf(1)).toBe('number');
});

it('getTypeOf float number', () => {
    expect(getTypeOf(99.99)).toBe('number');
});

it('getTypeOf bigint', () => {
    if (typeof BigInt !== 'undefined') {
        expect(getTypeOf(BigInt(123))).toBe('bigint');
    } else {
        console.log('BigInt is not supported in this environment');
    }
});

it('getTypeOf bigint literal', () => {
    if (typeof BigInt !== 'undefined') {
        expect(getTypeOf( 123n )).toBe('bigint');
    } else {
        console.log('BigInt is not supported in this environment');
    }      
});

it('getTypeOf string', () => {
    expect(getTypeOf('123')).toBe('string');
});

it('getTypeOf boolean', () => {
    expect(getTypeOf(true)).toBe('boolean');
});

it('getTypeOf null', () => {
    expect(getTypeOf(null)).toBe('null');
});

it('getTypeOf undefined', () => {
    expect(getTypeOf(undefined)).toBe('undefined');
});

// ----- non-primitive types -----
it('getTypeOf symbol', () => {
    expect(getTypeOf(Symbol('hello'))).toBe('symbol');
});

it('getTypeOf regex', () => {
    expect(getTypeOf(/hello/)).toBe('RegExp');
});

it('getTypeOf date', () => {
    expect(getTypeOf(new Date())).toBe('Date');
});

it('getTypeOf error', () => {
    expect(getTypeOf(new Error())).toBe('Error');
});

it('getTypeOf RangeEerror', () => {
    expect(getTypeOf(new RangeError())).toBe('RangeError');
});

it('getTypeOf AggregateError ', () => {
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

it('getTypeOf url', () => {
    expect(getTypeOf(new URL('https://www.google.com'))).toBe('URL');
});

it('getTypeOf urlsearchparams', () => {
    expect(getTypeOf(new URLSearchParams())).toBe('URLSearchParams');
});

it('getTypeOf set', () => {
    expect(getTypeOf(new Set())).toBe('Set');
});

it('getTypeOf map', () => {
    expect(getTypeOf(new Map())).toBe('Map');
});

it('getTypeOf weakset', () => {
    expect(getTypeOf(new WeakSet())).toBe('WeakSet');
});

it('getTypeOf weakmap', () => {
    expect(getTypeOf(new WeakMap())).toBe('WeakMap');
});

it('getTypeOf dataview', () => {
    const buffer = new ArrayBuffer(16);
    expect(getTypeOf(new DataView(buffer))).toBe('DataView');
});

it('getTypeOf arraybuffer', () => {
    expect(getTypeOf(new ArrayBuffer())).toBe('ArrayBuffer');
});

it('getTypeOf sharedarraybuffer', () => {
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

it('getTypeOf Array', () => {
    expect(getTypeOf([])).toBe('Array');
});

it('getTypeOf uint8Array', () => {
    expect(getTypeOf(new Uint8Array())).toBe('Uint8Array');
});

it('getTypeOf int8Array', () => {    
    expect(getTypeOf(new Int8Array())).toBe('Int8Array');
});

it('getTypeOf int32Array', () => {
    expect(getTypeOf(new Int32Array())).toBe('Int32Array');
});

it('getTypeOf float32Array', () => {
    expect(getTypeOf(new Float32Array())).toBe('Float32Array');
});
  
it('getTypeOf float64Array', () => {
    expect(getTypeOf(new Float64Array())).toBe('Float64Array');
});
  
it('getTypeOf uint8clampedArray', () => {
    expect(getTypeOf(new Uint8ClampedArray())).toBe('Uint8ClampedArray');
});
  
it('getTypeOf bigint64Array', () => {
    if ( typeof BigInt64Array !== 'undefined' ) {
        expect(getTypeOf(new BigInt64Array())).toBe('BigInt64Array');
    } else {
        console.log('BigInt64Array is not supported in this environment');
    }
});
  
it('getTypeOf biguint64Array', () => {
    if ( typeof BigUint64Array !== 'undefined' ) {
        expect(getTypeOf(new BigUint64Array())).toBe('BigUint64Array');
    } else {    
        console.log('BigUint64Array is not supported in this environment');
    }
});

it('getTypeOf array iterator', () => {
    expect(getTypeOf([][Symbol.iterator]())).toBe('Array Iterator');
});

// ----- function types -----

it('getTypeOf anonymous function', () => {
    expect(getTypeOf(function() {})).toBe('function');
});

it('getTypeOf declared function', () => {
    function mydeclaredFunction() {}
    expect(getTypeOf(mydeclaredFunction)).toBe('function');
});

it('getTypeOf function reference', () => {
    let myFuncExpression = function() {};
    expect(getTypeOf(myFuncExpression)).toBe('function');
});

it('getTypeOf declared function instance', () => {
    function mydeclaredFunction() {}
    expect(getTypeOf(new mydeclaredFunction())).toBe('mydeclaredFunction');
});

it('getTypeOf function instance', () => {
    let myFuncExpression = function() {};
    expect(getTypeOf(new myFuncExpression())).toBe('myFuncExpression');
});

it('getTypeOf promise', () => {
    expect(getTypeOf(new Promise(() => {}))).toBe('Promise');
});

it('getTypeOf generatorfunction', () => {
    let theGenerator = function*() {};  
    expect(getTypeOf( theGenerator )).toBe('GeneratorFunction');
});

it('getTypeOf asyncfunction', () => {
    let myAsyncFunction = async function() {};
    if (  isAsyncFunction(myAsyncFunction)  ) {
        expect(getTypeOf( myAsyncFunction )).toBe('AsyncFunction');
    } else {
        expect(getTypeOf( myAsyncFunction )).toBe('function');  // if called from ES5 code
        console.log('Async functions are not supported in this environment');
    }
});

it('getTypeOf function reference', () => {
    let myFuncReference = function() {};
    expect(getTypeOf(myFuncReference)).toBe('function');
});

it('getTypeOf arrow Function ', () => {
    let myArrowFunction = () => {}; 
    if ( isArrowFunction(myArrowFunction) ) {
        expect(getTypeOf( myArrowFunction )).toBe('ArrowFunction');
    } else {
        expect(getTypeOf( myArrowFunction )).toBe('function');  // if called from ES5 code
        console.log('Arrow functions are not supported in this environment');
    }
});


// ------- objects and user-defined types -------

it('getTypeOf object', () => {
    expect(getTypeOf({})).toBe('object');
});

it('getTypeOf object instance', () => {
    expect(getTypeOf(new Object())).toBe('object');
});

it('getTypeOf user-defined object instance via the Spread operator', () => {
    let myObj = {
        name: 'John',
        age: 30,
    }
    let myObjCopy = { ... myObj };
    expect(getTypeOf(myObjCopy)).toBe('object');
});

it('getTypeOf user-defined object instance via Object.assign', () => {
    let myObj = {
        name: 'John',
        age: 30,    
    }   
    let myObjCopy = Object.assign({}, myObj);
    expect(getTypeOf(myObjCopy)).toBe('object');
});

it('getTypeOf user-defined object instance via Object.create', () => {
    let myObj = {};
    let myObjCopy = Object.create(myObj);
    expect(getTypeOf(myObjCopy)).toBe('object');
});

it('getTypeOf object with custom tag', () => {
    let myObj = {
        name: 'John',
        age: 30,
        [Symbol.toStringTag]: 'MyCustomTag'
    }
    expect(getTypeOf(myObj)).toBe('MyCustomTag');
});

it ('getTypeOf object with overridden toString method', () => {
    let myObj = {
        name: 'John',
        age: 30,
        toString: function() {
            return 'MagicObj';
        }
    }
    expect(getTypeOf(myObj)).toBe('unknown');
});

it('getTypeOf user-defined class instance', () => {
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

it('getTypeOf of extended user class', () => {
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


it('getTypeOf user-defined class instance with no user constructor', () => {
    class MyOtherClass {}
    let myClassInstance = new MyOtherClass();
    expect(getTypeOf(myClassInstance)).toBe('MyOtherClass'); 
});  



