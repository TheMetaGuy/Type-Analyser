import { getTypeDetails } from '../testIndex.js';
import { isArrowFunction, isAsyncFunction } from '../testUtils.js';

// Basic Type Checks
it('check type details of string primitive', () => {
  const stringDetails = getTypeDetails('test');
  expect(stringDetails.Type).toBe('string');
  expect(stringDetails.hasCustomConstructor).toBe(false);
  expect(stringDetails.ReferenceVariable).toBe('');
  expect(stringDetails.prototypeChainString).toBe('String -> Object');
  expect(stringDetails.prototypeChain).toEqual(['String', 'Object']);
});

it('check type details of string number', () => {  
  const numberDetails = getTypeDetails(123);
  expect(numberDetails.Type).toBe('number');
  expect(numberDetails.hasCustomConstructor).toBe(false);
  expect(numberDetails.ReferenceVariable).toBe('');
  expect(numberDetails.prototypeChainString).toBe('Number -> Object');
  expect(numberDetails.prototypeChain).toEqual(['Number', 'Object']);
});

it('check type details of string boolean', () => {  
  const booleanDetails = getTypeDetails(true);
  expect(booleanDetails.Type).toBe('boolean');
  expect(booleanDetails.hasCustomConstructor).toBe(false);
  expect(booleanDetails.ReferenceVariable).toBe('');
  expect(booleanDetails.prototypeChainString).toBe('Boolean -> Object');
  expect(booleanDetails.prototypeChain).toEqual(['Boolean', 'Object']);
});

it('check type details of Null', () => {  
  const nullDetails = getTypeDetails(null);
  expect(nullDetails.Type).toBe('null');
  expect(nullDetails.hasCustomConstructor).toBe(false);
  expect(nullDetails.ReferenceVariable).toBe('');
  expect(nullDetails.prototypeChainString).toBe("");
  expect(nullDetails.prototypeChain).toBe(null);
});

// Undefined
it('check type details of undefined', () => {
  const undefinedDetails = getTypeDetails(undefined);
  expect(undefinedDetails.Type).toBe('undefined');
  expect(undefinedDetails.hasCustomConstructor).toBe(false);
  expect(undefinedDetails.ReferenceVariable).toBe('');
  expect(undefinedDetails.prototypeChainString).toBe('');
  expect(undefinedDetails.prototypeChain).toEqual(null);
});

// Array
it('check type details of Array', () => {
  const arrayDetails = getTypeDetails([]);
  expect(arrayDetails.Type).toBe('Array');
  expect(arrayDetails.hasCustomConstructor).toBe(true);
  expect(arrayDetails.ReferenceVariable).toBe('');
  expect(arrayDetails.prototypeChainString).toBe('Array -> Object');
  expect(arrayDetails.prototypeChain).toEqual(['Array', 'Object']);
});

// number Object 
it('check type details of number Object', () => {
  const numberObjectDetails = getTypeDetails(new Number(999));
  expect(numberObjectDetails.Type).toBe('Number');
  expect(numberObjectDetails.hasCustomConstructor).toBe(true);
  expect(numberObjectDetails.ReferenceVariable).toBe('');
  expect(numberObjectDetails.prototypeChainString).toBe('Number -> Object');
  expect(numberObjectDetails.prototypeChain).toEqual(['Number', 'Object']);
});

//  ---------ES6 Types ------------

// Symbol
it('check type details of Symbol ES6 type', () => {
  const symbolDetails = getTypeDetails(Symbol("test"));
  expect(symbolDetails.Type).toBe('symbol');
  expect(symbolDetails.hasCustomConstructor).toBe(false);
  expect(symbolDetails.ReferenceVariable).toBe('');
  expect(symbolDetails.prototypeChainString).toBe('Symbol -> Object');
  expect(symbolDetails.prototypeChain).toEqual(['Symbol', 'Object']);
});

// regexp
it('check type details of ES6 RegExp', () => {
  const regExDetails = getTypeDetails(/hello/);
  expect(regExDetails.Type).toBe('RegExp');
  expect(regExDetails.hasCustomConstructor).toBe(true);
  expect(regExDetails.ReferenceVariable).toBe('');
  expect(regExDetails.prototypeChainString).toBe('RegExp -> Object');
  expect(regExDetails.prototypeChain).toEqual(['RegExp', 'Object']);
});

it('check type details of BigInt ES6 type', () => {
  const bigIntDetails = getTypeDetails(1n);
  expect(bigIntDetails.Type).toBe('bigint');
  expect(bigIntDetails.hasCustomConstructor).toBe(false);
  expect(bigIntDetails.ReferenceVariable).toBe('');
  expect(bigIntDetails.prototypeChainString).toBe('BigInt -> Object');
  expect(bigIntDetails.prototypeChain).toEqual(['BigInt', 'Object']);
});

// Date
it('check type details of Date', () => {
  const dateDetails = getTypeDetails(new Date());
  expect(dateDetails.Type).toBe('Date');
  expect(dateDetails.hasCustomConstructor).toBe(true);
  expect(dateDetails.ReferenceVariable).toBe('');
  expect(dateDetails.prototypeChainString).toBe('Date -> Object');
  expect(dateDetails.prototypeChain).toEqual(['Date', 'Object']);
});

// Map
it('check type details of Map', () => {
  const mapDetails = getTypeDetails(new Map());
  expect(mapDetails.Type).toBe('Map');
  expect(mapDetails.hasCustomConstructor).toBe(true);
  expect(mapDetails.ReferenceVariable).toBe('');
  expect(mapDetails.prototypeChainString).toBe('Map -> Object');
  expect(mapDetails.prototypeChain).toEqual(['Map', 'Object']);
});

// Set
it('check type details of Set', () => {
  const setDetails = getTypeDetails(new Set());
  expect(setDetails.Type).toBe('Set');
  expect(setDetails.hasCustomConstructor).toBe(true);
  expect(setDetails.ReferenceVariable).toBe('');
  expect(setDetails.prototypeChainString).toBe('Set -> Object');
  expect(setDetails.prototypeChain).toEqual(['Set', 'Object']);
});

// Error
it('check type details of Error', () => {
  const errorDetails = getTypeDetails(new Error());
  expect(errorDetails.Type).toBe('Error');
  expect(errorDetails.hasCustomConstructor).toBe(true);
  expect(errorDetails.ReferenceVariable).toBe('');
  expect(errorDetails.prototypeChainString).toBe('Error -> Object');
  expect(errorDetails.prototypeChain).toEqual(['Error', 'Object']);
});

// SyntaxError
it('check type details of SyntaxError', () => {
  const syntaxErrorDetails = getTypeDetails(new SyntaxError());
  expect(syntaxErrorDetails.Type).toBe('SyntaxError');
  expect(syntaxErrorDetails.hasCustomConstructor).toBe(true);
  expect(syntaxErrorDetails.ReferenceVariable).toBe('');
  expect(syntaxErrorDetails.prototypeChainString).toBe('SyntaxError -> Error -> Object');
  expect(syntaxErrorDetails.prototypeChain).toEqual(['SyntaxError', 'Error', 'Object']);
});

// RangeError
it('check type details of RangeError', () => {
  const rangeErrorDetails = getTypeDetails(new RangeError());
  expect(rangeErrorDetails.Type).toBe('RangeError');
  expect(rangeErrorDetails.hasCustomConstructor).toBe(true);
  expect(rangeErrorDetails.ReferenceVariable).toBe('');
  expect(rangeErrorDetails.prototypeChainString).toBe('RangeError -> Error -> Object');
  expect(rangeErrorDetails.prototypeChain).toEqual(['RangeError', 'Error', 'Object']);
});

// AggregateError 
it('check type details of AggregateError', () => {
  if ( typeof AggregateError !== 'undefined' ) {    
    const errors = [
      new Error("Error 1"),
      new Error("Error 2"),
    ];
    const AggregateErrorDetails  = getTypeDetails(new AggregateError (errors, 'multiple errors'));
    expect(AggregateErrorDetails .Type).toBe('AggregateError');
    expect(AggregateErrorDetails .hasCustomConstructor).toBe(true);
    expect(AggregateErrorDetails .ReferenceVariable).toBe('');
    expect(AggregateErrorDetails .prototypeChainString).toBe('AggregateError -> Error -> Object');
    expect(AggregateErrorDetails .prototypeChain).toEqual(['AggregateError', 'Error', 'Object']);  
  } else {
    console.log('AggregateError not supported in this environment');
  }
});

// Expressed Function 
it('check type details of expressed function', () => {
  let expressedFunc = function() {};
  let daFunc = expressedFunc;
  const functionDetails = getTypeDetails(daFunc);
  expect(functionDetails.Type).toBe('function');
  expect(functionDetails.hasCustomConstructor).toBe(false);
  expect(functionDetails.ReferenceVariable).toBe('expressedFunc');
  expect(functionDetails.prototypeChainString).toBe('Function -> Object');
  expect(functionDetails.prototypeChain).toEqual(['Function', 'Object']);
});

// Declared Function
it('check type details of declared function', () => {
  function declaredFunc() {};
  const functionDetails = getTypeDetails(declaredFunc);
  expect(functionDetails.Type).toBe('function');
  expect(functionDetails.hasCustomConstructor).toBe(false);
  expect(functionDetails.ReferenceVariable).toBe('declaredFunc');
  expect(functionDetails.prototypeChainString).toBe('Function -> Object');
  expect(functionDetails.prototypeChain).toEqual(['Function', 'Object']);
});

// Anonymous Function
it('check type details of anonymous function', () => {
  const functionDetails = getTypeDetails(function() {});
  expect(functionDetails.Type).toBe('function');
  expect(functionDetails.hasCustomConstructor).toBe(false);
  expect(functionDetails.ReferenceVariable).toBe('');
  expect(functionDetails.prototypeChainString).toBe('Function -> Object');
  expect(functionDetails.prototypeChain).toEqual(['Function', 'Object']);
});

// ArrowFunction
it('check type details of ArrowFunction', () => {
  const theArrowFunction = () => {};
  const arrowFunctionDetails = getTypeDetails( theArrowFunction );
  if ( isArrowFunction(theArrowFunction) ) {                
    expect(arrowFunctionDetails.Type).toBe('ArrowFunction');
  } else {
    expect(arrowFunctionDetails.Type).toBe('function');          // if called from ES5 code
    console.log('Arrow Functions not supported in this environment');
  }  
  expect(arrowFunctionDetails.hasCustomConstructor).toBe(false);
  expect(arrowFunctionDetails.ReferenceVariable).toBe('theArrowFunction');
  expect(arrowFunctionDetails.prototypeChainString).toBe('Function -> Object');
  expect(arrowFunctionDetails.prototypeChain).toEqual(['Function', 'Object']);
});

// Promise
it('check type details of Promise', () => {
  let thePromise = new Promise(() => {});
  const promiseDetails = getTypeDetails( thePromise );
  expect(promiseDetails.Type).toBe('Promise');
  expect(promiseDetails.hasCustomConstructor).toBe(true);
  expect(promiseDetails.ReferenceVariable).toBe('');
  expect(promiseDetails.prototypeChainString).toBe('Promise -> Object');
  expect(promiseDetails.prototypeChain).toEqual(['Promise', 'Object']);
});

// Generator Function
it('check type details of Generator Function', () => {
  function* genFunc() {};
  const generatorDetails = getTypeDetails(genFunc);
  expect(generatorDetails.Type).toBe('GeneratorFunction');
  expect(generatorDetails.hasCustomConstructor).toBe(false);
  expect(generatorDetails.ReferenceVariable).toBe('genFunc');
  expect(generatorDetails.prototypeChainString).toBe('GeneratorFunction -> Function -> Object');
  expect(generatorDetails.prototypeChain).toEqual(['GeneratorFunction', 'Function', 'Object']);
});

// async function
it('check type details of async function', () => {
  let asyncFunc = async function() {};
  const asyncFunctionDetails = getTypeDetails(asyncFunc);
  if ( isAsyncFunction(asyncFunc) ) {
    expect(asyncFunctionDetails.Type).toBe('AsyncFunction');
    expect(asyncFunctionDetails.prototypeChainString).toBe('AsyncFunction -> Function -> Object');
    expect(asyncFunctionDetails.prototypeChain).toEqual(['AsyncFunction', 'Function', 'Object']);
  
  } else {
    expect(asyncFunctionDetails.Type).toBe('function');          // if called from ES5 code
    expect(asyncFunctionDetails.prototypeChainString).toBe('Function -> Object');
    expect(asyncFunctionDetails.prototypeChain).toEqual(['Function', 'Object']);
    console.log('Async Functions not supported in this environment');
  }  
  expect(asyncFunctionDetails.hasCustomConstructor).toBe(false);
  expect(asyncFunctionDetails.ReferenceVariable).toBe('asyncFunc');
});


// Uint8ClampedArray
it('check type details of Uint8ClampedArray', () => {
  const uint8ClampedArrayDetails = getTypeDetails(new Uint8ClampedArray());
  expect(uint8ClampedArrayDetails.Type).toBe('Uint8ClampedArray');
  expect(uint8ClampedArrayDetails.hasCustomConstructor).toBe(true);
  expect(uint8ClampedArrayDetails.ReferenceVariable).toBe('');
  expect(uint8ClampedArrayDetails.prototypeChainString).toBe('Uint8ClampedArray -> TypedArray -> Object');
  expect(uint8ClampedArrayDetails.prototypeChain).toEqual(['Uint8ClampedArray', 'TypedArray', 'Object']);
});

// Custom Type
it('check type details of custom class type', () => {
  class MyClass {};
  const myObject = new MyClass();
  const myClassDetails = getTypeDetails(myObject);
  expect(myClassDetails.Type).toBe('MyClass');
  expect(myClassDetails.hasCustomConstructor).toBe(true);
  expect(myClassDetails.ReferenceVariable).toBe('');
  expect(myClassDetails.prototypeChainString).toBe('MyClass -> Object');
  expect(myClassDetails.prototypeChain).toEqual(['MyClass', 'Object']);
});

// Full Prototype Chain
it('check type details of custom type instance', () => {
  class MyClass {};
  const myClassDetails = getTypeDetails(new MyClass(), true);
  expect(myClassDetails.Type).toBe('MyClass');
  expect(myClassDetails.hasCustomConstructor).toBe(true);
  expect(myClassDetails.ReferenceVariable).toBe('');
  expect(myClassDetails.prototypeChainString).toBe('MyClass -> Object');
  expect(myClassDetails.prototypeChain).toEqual(['MyClass', 'Object']);
});

// object with toString( ) overridden
it('check type details of object with toString( ) overridden', () => {
  const obj = {  a: 1, b: 2, c: {} };
  obj.toString = () => { return 'test'; };
  const objDetails = getTypeDetails(obj);
  expect(objDetails.Type).toBe('unknownn');
  expect(objDetails.hasCustomConstructor).toBe(false);
  expect(objDetails.ReferenceVariable).toBe('');
  expect(objDetails.prototypeChainString).toBe('Object');
  expect(objDetails.prototypeChain).toEqual(['Object']);
});  

// Object with custom tag property set 
it('check type details of object with custom tag property set', () => {
  const obj = {  a: 1, b: 2, c: {} };
  obj[Symbol.toStringTag] = 'MyCustomTag';
  const objDetails = getTypeDetails(obj);
  expect(objDetails.Type).toBe('MyCustomTag');
  expect(objDetails.hasCustomConstructor).toBe(false);
  expect(objDetails.ReferenceVariable).toBe('');
  expect(objDetails.prototypeChainString).toBe('Object');
  expect(objDetails.prototypeChain).toEqual(['Object']);
});     

// Object created with Object.create()
it('check type details of Object created with Object.create()', () => {
  const obj = Object.create({});
  const objectCreateDetails = getTypeDetails(obj);
  expect(objectCreateDetails.Type).toBe('object');
  expect(objectCreateDetails.hasCustomConstructor).toBe(false);
  expect(objectCreateDetails.ReferenceVariable).toBe('');
  expect(objectCreateDetails.prototypeChainString).toBe('Object -> Object');
  expect(objectCreateDetails.prototypeChain).toEqual(['Object', 'Object']);
});

// Custom class with custom tag property set
it('check type details of custom class with custom tag property set', () => {
  class MyClass {};
  const myObject = new MyClass();
  myObject[Symbol.toStringTag] = 'MyCustomTag';
  const myClassDetails = getTypeDetails(myObject);
  expect(myClassDetails.Type).toBe('MyClass');
  expect(myClassDetails.hasCustomConstructor).toBe(true);
  expect(myClassDetails.ReferenceVariable).toBe('');
  expect(myClassDetails.prototypeChainString).toBe('MyClass -> Object');
  expect(myClassDetails.prototypeChain).toEqual(['MyClass', 'Object']);
});

// custome class with toString( ) overridden
it('check type details of custom class with toString( ) overridden', () => {
  class MyClass {};
  const myObject = new MyClass();
  myObject.toString = () => { return 'test'; };
  const myClassDetails = getTypeDetails(myObject);
  expect(myClassDetails.Type).toBe('unknownn');
  expect(myClassDetails.hasCustomConstructor).toBe(true);
  expect(myClassDetails.ReferenceVariable).toBe('');
  expect(myClassDetails.prototypeChainString).toBe('MyClass -> Object');
  expect(myClassDetails.prototypeChain).toEqual(['MyClass', 'Object']);
});

// Custom class extended
it('check type details of custom class extended', () => {
  class Parent {};
  class Child extends Parent {};
  const childDetails = getTypeDetails(new Child());
  expect(childDetails.Type).toBe('Child');
  expect(childDetails.hasCustomConstructor).toBe(true);
  expect(childDetails.ReferenceVariable).toBe('');
  expect(childDetails.prototypeChainString).toBe('Child -> Parent -> Object');
  expect(childDetails.prototypeChain).toEqual(['Child', 'Parent', 'Object']);
});

// Custom class extended
it('check type details of custom class extended with custom tags', () => {
  class Parent {};
  class Child extends Parent {};
  let myBoy = new Child();
  myBoy[Symbol.toStringTag] = 'MyCustomTag';
  const childDetails = getTypeDetails(myBoy);
  expect(childDetails.Type).toBe('Child');
  expect(childDetails.hasCustomConstructor).toBe(true);
  expect(childDetails.ReferenceVariable).toBe('');
  expect(childDetails.prototypeChainString).toBe('Child -> Parent -> Object');
  expect(childDetails.prototypeChain).toEqual(['Child', 'Parent', 'Object']);
});


// Custom Class with Shortened Prototype Chain
it('check type custom class details with shortened prototype chain', () => {
  class MyClass {};
  const myClassDetails = getTypeDetails(new MyClass(), false);
  expect(myClassDetails.Type).toBe('MyClass');
  expect(myClassDetails.hasCustomConstructor).toBe(true);
  expect(myClassDetails.ReferenceVariable).toBe('');
  expect(myClassDetails.prototypeChainString).toBe('');
  expect(myClassDetails.prototypeChain).toEqual(null);
});

// Custom class extended with shortened prototype chain 
it('check type details of custom class extended with shortened output prototype chain', () => {
  class Parent {};
  class Child extends Parent {};
  const childDetails = getTypeDetails(new Child(), false);
  expect(childDetails.Type).toBe('Child');
  expect(childDetails.hasCustomConstructor).toBe(true);
  expect(childDetails.ReferenceVariable).toBe('');
  expect(childDetails.prototypeChainString).toBe('Child -> Parent');
  expect(childDetails.prototypeChain).toEqual(['Child', 'Parent']);
});

const globalTestVar = { foo: 'bar'};
// Global variable
it('check type details with global variable', () => {
  globalTestVar.name = 'Dr Who';
  const globalVarDetails = getTypeDetails(globalTestVar);
  expect(globalVarDetails.Type).toBe('object');
  expect(globalVarDetails.hasCustomConstructor).toBe(false);
  expect(globalVarDetails.ReferenceVariable).toBe('');
  expect(globalVarDetails.prototypeChainString).toBe('Object');
  expect(globalVarDetails.prototypeChain).toEqual(['Object']);
});

const gClass = class {};
const globalTestClass = new gClass();
// Global class
it('check type details with global variable', () => {
  const globalClassDetails = getTypeDetails(globalTestClass);
  expect(globalClassDetails.Type).toBe('gClass');
  expect(globalClassDetails.hasCustomConstructor).toBe(true);
  expect(globalClassDetails.ReferenceVariable).toBe('');
  expect(globalClassDetails.prototypeChainString).toBe('gClass -> Object');
  expect(globalClassDetails.prototypeChain).toEqual(['gClass','Object']);
});

// Object property
it('check type details with object property', () => {
  const obj = { prop: { foo: 'bar' } };
  const propDetails = getTypeDetails(obj.prop);
  expect(propDetails.Type).toBe('object');
  expect(propDetails.hasCustomConstructor).toBe(false);
  expect(propDetails.ReferenceVariable).toBe('');
  expect(propDetails.prototypeChainString).toBe('Object');
  expect(propDetails.prototypeChain).toEqual(['Object']);
});
