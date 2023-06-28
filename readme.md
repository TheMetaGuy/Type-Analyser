# **Type-Master**

## **What is Type-Master?**
-----
Type-Master is an simple but innovative utility package designed to provide in-depth and precise type information for any JavaScript object, be it a primitive, built-in type, ES6/ES2020 type or even your custom classes. 

It offers a set of functions that go beyond the native `typeof`, `instanceof` or `isNaN` operators, addressing their limitations and delivering enhanced run-time and debug-time functionality that every JavaScript developer needs at their fingertips.  
<br>

## **Why?**
---------
In JavaScript, understanding the types you are working with is crucial for maintaining robust, bug-free code. Yet, JavaScript's native tools for identifying types are limited and sometimes misleading; there are numerous edge cases where the javascript built-in operators fail to provide correct or useable information. Type-Master addresses these shortcomings by:

- Accurately identifying the **actual** type of any JavaScript object via a simple to use `extendedTypeOf( )` function whuich works across Iframes, Worker threads and consistently with browser DOM objects.  

- Testing if a number is safe to use in calculations, a common source of bugs when dealing with JavaScript's different number types, via `isSafeNumber( )`

- Providing information on the specific sub-type of a number via `typeOfNumber( )` - (E.g. 'bigint', 'NaN' , 'infinity, -infinity, safeInteger, unsafeNumber and safeFloat ).

- Providing detailed information about the object, including its prototype chain via `getTypeDetails( )` function

- Checking if an object is JSON serializable, a common requirement in modern JavaScript programming via `isJSONSerializable()`

- Checking for circular references, an essential tool for debugging complex object structures via `hasCircularReference()`

<br>  

Also Type-Master:
  
- Has zero external dependencies.

- Also works when testing most ES6 types whilst running in non ES6 environments via Polyfills ( E.g. when bundling via Babel ). See the 'Compatiability' section below.

- Has been extensively tested across different browsers and run-time environments (Node, Iframes, Worker threads etc - see the tests folder in the GitHub project for details).

- provides ESM, CSJ and IIFE modules variants for almost all use cases (see *installation* section below).

- Is tiny at 15KB unminified and 3KB minified. 


<br>

In short, Type-Master prevents the incorrect behaviour that can occur if you naively used the built-in `typeof`, `instanceof` or `isNaN` operators. It accurtaely identifies javascript types, eliminating guesswork and reducing potential sources of bugs and so saving development time.  

<br>

## **Usage**

Here are descriptions and some examples of how you might use Type-Master. This library allows you to correctly identify the type of an object and know the allowed operations on it across a wide range of examples.


### **`extendedTypeOf( object )`**
---
Accurately identifies the type of all Javascript objects not just the primitive types and it's much more useful than the built-in javascript 'typeof' operator. It provides the same core functionality but returns the correct type for null, all ES6 / ES2020 types and custom types ( E.g. your classes ). It works correctly with types simulated via Polyfills (E.g. Symbol via Babel ) and also correctly identifies types retieved from Iframes and worker threads where passing of those types is supported.

#### ***Special Cases: toString( ) Override and [Symbol.toStringTag]***

`extendedTypeOf` handles several special cases where the returned 'type' might not align with your expectations:

- *Objects with toString() Overridden:** If the built-in `toString()` method is overridden by custom code, Type-Master will return `'unknown'` for the type. You can still use `toString()` to retrieve the value set by the custom code.
  
- *Custom Classes with [Symbol.toStringTag]:** If custom classes have `[Symbol.toStringTag]` set, Type-Master will return the class name rather than the toStringTag value. This design is intentional. If you want to retrieve the custom tag, `[Symbol.toStringTag]` will still return whatever value was set.

- *Object Types with [Symbol.toStringTag]:** Actual `Object` types with `[Symbol.toStringTag]` set will have that value returned for the type of the object

**Rationale**  
The goal of Type-Master is to reveal the intrinsic underlying 'type' of an object. For built-in types and custom objects, using `[Symbol.toStringTag]` doesn't alter that. However, we consider actual `Object` types an exception and return the `[Symbol.toStringTag]` value. This is because JavaScript's type system returns 'object' for all Objects, making it impossible to distinguish one type of custom Object from another without using `[Symbol.toStringTag]`. 

Note that `[Symbol.toStringTag]` and `toString()` values are always accessible to you. Type-Master simply provides you with additional type information you wouldn't otherwise have.

***Parameters***    
`object` - The object to check to determine if it is a safe number

**Returns**  
This function returns a `string` representing the type of the object passed in. if a type can't be determined the string `unknown' will be returned.

<br>

### **Examples**

**Working with `null` and `object`**  

Using `typeof`, you might try to access a property or method of an object which is actually `null`, leading to a TypeError.  Using `ExtendedTypeOf` avoids this.

```javascript
const tm = require('type-master' ); 

let x = null;
let y = {};
if (typeof x === "object") {
    x.property = "value";  // TypeError: Cannot set property 'property' of null
}

if (tm.extendedTypeOf(x) === "null") {
    console.log( "x is null, can't access properties or methods");  // Safe operation
}
if (tm.extendedTypeOf(y) === "object") {
    console.log( "y is an objeect, we can access it's properties or methods");  // Safe operation
    y.property = "value";
}
```
Note that while `instanceof` can be used as an alternative to `typeof` in some cases, it won't work reliably across iframes or Worker threads. Moreover, `instanceof` can yield false positives if there's a matching type in the object's prototype chain. Using `ExtendedTypeOf` will avoid these issues.  
<br>

**Identifying `arrays`**  

Arrays have unique methods that objects don't have. Trying to use these methods on an object will cause a TypeError. Using `extendedTypeOf` All ES6 typed arrays can be identified 

```javascript
let y = [1, 2, 3];
if (typeof y === "object") {
    y.push(4);  // TypeError: y.push is not a function
}

// This works across iframes and worker threads unlike Array.isArray( )
if (tm.extendedTypeOf(y) === "Array") {  
    y.push(4);  // Safe operation, y is now [1, 2, 3, 4].  
}

// typed arrays can be recognised 
if (tm.extendedTypeOf(new Uint8Array) === 'Uint8Array') {
    // can now do safe operation on the Typed array 
};  

if ( tm.extendedTypeOf(new Float32Array) == 'Float32Array' ) {
    // can now do safe operation on the Typed array 
}
```

**Safe use of a promise in a loop**
```javascript
const api = new Promise((resolve, reject) => {
  // Fetch data from the API.
  // ...
  resolve(data);
});
// ...
for (let i = 0; i < 10; i++) {
  if (tm.extendedTypeOf(api) === "Promise") {
       // we can safely do somethin with the data 
    api.then((data) => {
       // ...
    });    
  }
}
```
**checking an object type from an iframe or worker thread**
```javascript
const iframe = document.createElement("iframe");
iframe.src = "https://example.com/iframe.html";
iframe.onload = () => {
  const obj = iframe.contentWindow.obj;
  if tm.extendedTypeOf(obj) === "MyCustomType") {
    // do something with the obj
    // This would not cause an error because extendedTypeOf obj is "MyCustomType"
    // using the builtin typeof wound cause an error because typeof obj is "object"
  }
};
```

**Differentiating between 'Date', 'RegExp', and generic 'object'**

You may want to perform operations specific to Date or RegExp, and using `typeof` might lead to incorrect operations.

```javascript
let z = new Date();
if (tm.extendedTypeOf(z) === "Date") {
    console.log( z.getFullYear());  // '2023' - Safe operation, outputs the year of date
}

let regex = new RegExp("\\d+");
if (tm.extendedTypeOf(regex) === "RegExp") {
    console.log( regex.test("123"));  // 'true' - Safe operation, tests if string contains a number
}
```

**Working with ES6 and ES2020 types like 'Map' and 'Set'**

Map and Set have unique methods. Attempting these on a generic object will lead to errors.

```javascript
let map = new Map();
if (tm.extendedTypeOf(map) === "Map") {
    map.set("key", "value");  // Safe operation, adds a key-value pair to the map
}

let set = new Set();
if (tm.extendedTypeOf(set) === "Set") {
    set.add("value");  // Safe operation, adds a value to the set
}
```

**Working with custom class instances**

With custom class instances, you might want to use specific methods from the class. Using `typeof` might cause you to use methods that don't exist. Using `instanceof` works but not in all cases and can give false positives.  

```javascript
class MyClass { 
    printHello() { 
        console.log( "Hello, World!"); 
    }
};
let instance = new MyClass();

if (tm.extendedTypeOf(instance) === "MyClass") {
    instance.printHello();  // Safe operation in all environments, prints "Hello, World!"
}
```

**Working with Polyfilled or transpiled types**

If you have a polyfilled Symbol, using `typeof` might make you perform incorrect operations.

```javascript
let polyfilledSymbol = /* polyfilled Symbol */;
if (tm.extendedTypeOf(polyfilledSymbol) === "Symbol") {
    // Safe operation - no operation is performed here as symbols are usually used as unique identifiers
    console.log( polyfilledSymbol);
}
```  

<br> 

### **`typeOfNumber( object , acceptStringNumbers = true )`**
----
Returns information about the 'sub-type' of number passed in. Unlike the built-in javascript isNaN( ) function, this returns useful information about the 'type' of number passed in. E.g. it will return 'infinity' for Infinity or it will return 'unsafeNumber' for a number that is too large to be a safe integer. It will return 'NaN' for BigInt and Symbol types unlike the built-in isNaN( ) function which throws a type error for these types. 

Also note  
1 . NaN returns 'NaN' as that is the 'number' sub-type that it actually is.  
2 . Booleans also returns 'NaN' because even though javascript coerces them into 0 or 1, relying on this behaviour is not good practice and can lead to bugs.  
3 . Number Objects (created via new Number(xxx)) return 'numberObject'. Some JavaScript methods and functions behave differently when they receive an object instead of a primitive value. E.g. when comparing with ===, new Number(10) !== 10.

***Parameters***    
`object` - The object to check to determine if it is a safe number

`acceptStringNumbers` - Optional. If true (the default value), then if a string is passed in, it will be converted to a number and the that will tested. Strings are not coerceced to numbers if they do not represent a valid number. E.g '34.345abchs' will not be converted to a number and will return 'NaN'. But '34.345' will be converted to a number and will return 'safeFloat'. Strings representing Hex numbers also work - E.g. 0xFF. 

*(Note - the built in javascript parseFloat() function can be used before calling this function to force coercing. E.g. it will convert '34.345abchs' to 34.345).  if acceptStringNumbers is false then when a string is passed in, it will never be converted to a number and 'NaN' will be returned.*

 ***Returns***  
 A string representing the sub-type of the number passed in. The possible values are:
 'bigint', 'NaN' , 'infinity', '-infinity', 'safeInteger', 'unsafeNumber', 'safeFloat' and 'numberObject'.

<br>  

### ***Examples***
```javascript
// for Clarity assume ESM import 
import { typeOfNumber } from './node_module/type-master/dist/type-master.esm.min.js';

// non number types  
console.log( tm.typeOfNumber(NaN) );               // => 'NaN' 
console.log( tm.typeOfNumber('not a number') );    // => 'NaN'
console.log( tm.typeOfNumber(true) );              // => 'NaN'
console.log( tm.typeOfNumber(null) );              // => 'NaN'
console.log( tm.typeOfNumber({}) );                // => 'NaN'
console.log( tm.typeOfNumber(Symbol('hello')) );   // => 'NaN'
console.log( tm.typeOfNumber(undefined) );         // => 'NaN'
console.log( tm.typeOfNumber(function() {}) );     // => 'NaN'
console.log( tm.typeOfNumber([]) );                // => 'NaN'

// Infinity 
console.log( tm.typeOfNumber(1/0) );               // => 'infinity'
console.log( tm.typeOfNumber(-1/0) );              // => '-infinity'

// safe integers 
var maxInt = Number.MAX_SAFE_INTEGER; 
console.log( tm.typeOfNumber(10) );                // => 'safeInteger'
console.log( tm.typeOfNumber(maxInt) );            // => 'safeInteger'
console.log( tm.typeOfNumber(-maxInt) );           // => 'safeInteger'

// unsafe mumbers to use in calculations
var maxInt = Number.MAX_SAFE_INTEGER; 
console.log( tm.typeOfNumber(maxInt + 1) );            // => 'unsafeNumber'
console.log( tm.typeOfNumber(-maxInt - 1) );           // => 'unsafeNumber'
console.log( tm.typeOfNumber(Number.MAX_VALUE) );      // => 'unsafeNumber'
console.log( tm.typeOfNumber(90071992547409975.33) );  // => 'unsafeNumber'

// safe floating point numbers' 
console.log( tm.typeOfNumber(1.1) );                   // => 'safeFloat'
console.log( tm.typeOfNumber(900719925474099.75) );    // => 'safeFloat'

// bigint' 
console.log( tm.typeOfNumber(BigInt(123)) );       // => 'bigint'

// bigint literal' 
console.log( tm.typeOfNumber( 123n ) );            // => 'bigint'

// numbers in string format 
console.log( tm.typeOfNumber('123') );             // => 'safeInteger'
console.log( tm.typeOfNumber('1.11') );            // => 'safeFloat'
console.log( tm.typeOfNumber('-1.11') );           // => 'safeFloat'
console.log( tm.typeOfNumber('0xFF') );            // => 'safeInteger'

// invalid numbers in string format
console.log( tm.typeOfNumber('123xyz') );          // => 'NaN'
console.log( tm.typeOfNumber('xyz') );             // => 'NaN'
console.log( tm.typeOfNumber('123pqr', false) );   // => 'NaN'
console.log( tm.typeOfNumber('zyx',false) );       // => 'NaN'

// numbers in string format with 'acceptStringNumber' param set to false' 
console.log( tm.typeOfNumber('123', false) );      // => 'NaN'
console.log( tm.typeOfNumber('123.99', false) );   // => 'NaN'

console.log( tm.typeOfNumber( new Number(999) );   // => 'numberObject'  - not a number primitive
```


<br> 

### **`isSafeNumber( object , acceptStringNumbers = true )`**
---
Tests to see if the number passed in is safe to use in a calculation. This is useful because Javascript has a number of different types of numbers and some of them are not safe to use in calculations. E.g. BigInts are not safe to use in calculations with regular numbers. Also, numbers that are too large to be safe integers are not safe to use in calculations. 

Note;  
1 . NaN returns false as it is not a safe number to use in calculations.  
2 . Booleans also returns false because even though javascript coerces them into 0 or 1, relying on this behaviour is not good practice and can lead to bugs.  
3 . Number Objects (created via new Number(xxx)) return false. Some JavaScript methods and functions behave differently when they receive an object instead of a primitive value. E.g. when comparing with ===, new Number(10) !== 10.

**Parameters**  
***object*** - The object to check to determine if it is a safe number
 
***acceptStringNumbers*** -  Optional. If true (the default value), then if a string is passed in, it will be converted to a number and it's type will tested for safe use. Strings are not coerceced to numbers if they do not represent a valid number. E.g '34.345abchs' will not be converted to a number and will return false. But '34.345' will be converted to a number and will return true. String representing Hex numbers also work - E.g. 0xFF. 

*(Note - the built in javascript parseFloat() function can be used before calling this function to force coercing. E.g. it will convert '34.345abchs' to 34.345). if acceptStringNumbers is false then when a string is passed in, it will never be converted to a number and 'NaN' will be returned*
 
 **Returns**  
 `true` if the number passed in is safe to use in a calculation, `false` otherwise.

<br>

### **Examples**  
```javascript
const tm = require('type-master' );

//safe integers
console.log( tm.isSafeNumber(1) );                         // => true 
console.log( tm.isSafeNumber(Number.MAX_SAFE_INTEGER) );   // => true 
console.log( tm.isSafeNumber(-Number.MAX_SAFE_INTEGER) );  // => true 
console.log( tm.isSafeNumber(0) ); // => true 

// unsafe integers
console.log( tm.isSafeNumber(Number.MAX_SAFE_INTEGER + 1) ); // => false 
console.log( tm.isSafeNumber(-Number.MAX_SAFE_INTEGER -1) ); // => false 
console.log( tm.isSafeNumber(Number.MAX_VALUE) );            // => false  -  Number.MAX_VALUE is not a safe integer !

// Infinity is never safe
console.log( tm.isSafeNumber(1/0) );                       // => false 
console.log( tm.isSafeNumber(-1/0) );                      // => false 

// valid numeric strings are safe by default (acceptStringNumbers=true) 
console.log( tm.isSafeNumber('1') );                       // => true 
console.log( tm.isSafeNumber('1.1') );                     // => true 
console.log( tm.isSafeNumber('-1') );                      // => true 
console.log( tm.isSafeNumber('0xFF') );                    // => true 

// invalid numeric strings are never safe 
console.log( tm.isSafeNumber('34.345abchs', true) );       // => false 
console.log( tm.isSafeNumber('34.345abchs', false) );      // => false 

// don't allow valid numeric strings to return true  - via acceptStringNumbers = false
console.log( tm.isSafeNumber('123', false) );              // => false 

// BigInt and BigInt literals are unsafe for use as a number 
console.log( tm.isSafeNumber(1n) );                        // => false 
console.log( tm.isSafeNumber(BigInt(1)) );                 // => false 

// unsafe floats 
console.log( tm.isSafeNumber("999999999999999999999999.99", true) );   // => false 
console.log( tm.isSafeNumber("999999999999999999999999.99", false) );  // => false 

// The Symbol type is not for safe 
console.log( tm.isSafeNumber(Symbol("test")) );        // => false 

// Objects, Arrays and ES6 types aren't safe to use in calculations 
console.log( tm.isSafeNumber(NaN) );                   // => false 
console.log( tm.isSafeNumber( {} ) );                  // => false 
console.log( tm.isSafeNumber( new Date()) );           // => false 
console.log( tm.isSafeNumber( []) );                   // => false 
console.log( tm.isSafeNumber( [1]) );                  // => false 

// Number Objects (as opposed to number primitives) aren't safe in all cases either E.g. 'new Number(99) !== 99'  !!!  
console.log( tm.isSafeNumber( new Number(99) ) )       // => false

```

<br> 

### **`getTypeDetails( object, showFullPrototypeChain )`**
---
Performs type introspection and returns detailed type information about the object passed in. This function returns useful information about all types including ES6 / EES2020 and customs types ( E.g. Your classes )

*For the  returned 'type' field, the same special cases involving the use of `toString( )` override and `[Symbol.toStringTag]` apply as per the **`extendedTypeOf`** function above and the same rationale applies. The goal is for the 'type' field to reveal the intrinsic underlying 'type' of an object. For built-in types and custom objects, using `[Symbol.toStringTag]` doesn't alter that by design here. However, we consider actual `Object` types an exception and return the `[Symbol.toStringTag]` value. This is because JavaScript's type system returns 'object' for all Objects, making it impossible to distinguish one type of custom Object from another without using `[Symbol.toStringTag]`.*

**Parameters**  
***object*** - The object to get type information about

***showFullPrototypeChain*** - Optional. if `true` (the default value), the full javascript inheritance prototype chain will be included in the returned object. If `false`, the last 'Object' will be removed from the chain (which is always 'Object') and also only chains longer than 1 will be included as in this case the chain will be just have a single value the same as the Type field which is not very useful.

**Returns** - an object containing the following fields:  
| field | default value | description | 
| :--- | :---: |  :---  |
| **Type** |  "null" | - A string representation of the exact input type. This is set for all types not just primitives.  The following types will be in lower case as per the built-in javascript typeof operator: 'string', 'number', 'boolean', 'undefined', 'symbol', 'function', 'object', 'bigint'. A Null object will be detected as 'null'.  All other built-in types will be recognised and returned in CamelCase Format as per the Javascirpt standard: E.g. 'Array', 'Date', 'Error', 'RegExp', 'URL' etc. if a type can't be determined, then 'unknown' will be returned. |
| **ReferenceVariable** | "" | A string representation of the reference variable, if any, that points to the input object |
| **hasCustomConstructor**| false | true if the input object has a it's own custom constructor, false otherwise. |
| **prototypeChainString** | ""  |A string representation of the Javascript inheritance prototype chain of the input object. Objects in the chain are separated by ' -> '. E.g. 'Child -> Parent -> Object'. | 
| **prototypeChain** | null | An array containing the javascript inheritance prototype chain of the input object passed. |
|

<br>

### **Examples** 


**type details of some built-in javascript types** 
```javascript
const tm = require('type-master' );

const stringDetails = tm.getTypeDetailss('test');
console.log( stringDetails.Type );                              // => 'string'
console.log( stringDetails.hasCustomConstructor );              // => false
console.log( stringDetails.ReferenceVariable );                 // => ''
console.log( stringDetails.prototypeChainString );              // => 'String -> Object'
console.log( stringDetails.prototypeChain );                    // => ['String', 'Object']

const arrayDetails = tm.getTypeDetailss( [] );
console.log( arrayDetails.Type );                               // => 'Array'
console.log( arrayDetails.hasCustomConstructor );               // => true
console.log( arrayDetails.ReferenceVariable );                  // => ''
console.log( arrayDetails.prototypeChainString );               // => 'Array -> Object'
console.log( arrayDetails.prototypeChain );                     // => ['Array', 'Object']

const nullDetails = tm.getTypeDetailss(null);
console.log( nullDetails.Type );                                // => 'null'
console.log( nullDetails.hasCustomConstructor );                // => false
console.log( nullDetails.ReferenceVariable );                   // => ''
console.log( nullDetails.prototypeChainString );                // => ""
console.log( nullDetails.prototypeChain );                      // => null

const symbolDetails = tm.getTypeDetailss( Symbol("test") );
console.log( symbolDetails.Type );                              // => 'symbol'
console.log( symbolDetails.hasCustomConstructor );              // => false
console.log( symbolDetails.ReferenceVariable );                 // => ''
console.log( symbolDetails.prototypeChainString );              // => 'Symbol -> Object'
console.log( symbolDetails.prototypeChain );                    // => ['Symbol', 'Object']

// check type details of Regular Expression
const regExDetails = tm.getTypeDetailss(/hello/);
console.log( regExDetails.Type );                               // => 'RegExp'
console.log( regExDetails.hasCustomConstructor );               // => true
console.log( regExDetails.ReferenceVariable );                  // => ''
console.log( regExDetails.prototypeChainString );               // => 'RegExp -> Object'
console.log( regExDetails.prototypeChain );                     // => ['RegExp', 'Object']

// check type details of Date 
const dateDetails = tm.getTypeDetailss(new Date());
console.log( dateDetails.Type );                                 // => 'Date'
console.log( dateDetails.hasCustomConstructor );                 // => true
console.log( dateDetails.ReferenceVariable );                    // => ''
console.log( dateDetails.prototypeChainString );                 // => 'Date -> Object'
console.log( dateDetails.prototypeChain );                       // => ['Date', 'Object']

let thePromise = new Promise(() => {});
const promiseDetails = tm.getTypeDetailss( thePromise );
console.log( promiseDetails.Type );                              // => 'Promise'
console.log( promiseDetails.hasCustomConstructor );              // => true
console.log( promiseDetails.ReferenceVariable );                 // => ''
console.log( promiseDetails.prototypeChainString );              // => 'Promise -> Object'
console.log( promiseDetails.prototypeChain );                    // => ['Promise', 'Object']
``` 

**type details of extended custom class** 
```javascript
class Parent {};
class Child extends Parent {};
const childDetails = tm.getTypeDetailss(new Child());

console.log( childDetails.Type );                               // => 'Child'
console.log( childDetails.hasCustomConstructor );               // => true
console.log( childDetails.ReferenceVariable );                  // => ''
console.log( childDetails.prototypeChainString );               // => 'Child -> Parent -> Object'
console.log( childDetails.prototypeChain );                     // => ['Child', 'Parent', 'Object']

// with shortened output prototype chain 
const childDetailsShort = tm.getTypeDetailss(new Child(), false);
console.log( childDetailsShort.Type );                          // => 'Child'
console.log( childDetailsShort.hasCustomConstructor );          // => true
console.log( childDetailsShort.ReferenceVariable );             // => ''
console.log( childDetailsShort.prototypeChainString );          // => 'Child -> Parent'
console.log( childDetailsShort.prototypeChain );                // => ['Child', 'Parent']
```

**type details of some function types** 
```javascript
const myArrowFunction = () => {};
const arrowFunctionDetails = tm.getTypeDetailss(myArrowFunction); 
console.log( arrowFunctionDetails.Type );                       // => 'ArrowFunction'
console.log( arrowFunctionDetails.hasCustomConstructor );       // => false
console.log( arrowFunctionDetails.ReferenceVariable );          // => 'myArrowFunction'
console.log( arrowFunctionDetails.prototypeChainString );       // => 'Function -> Object'
console.log( arrowFunctionDetails.prototypeChain );             // => ['Function', 'Object']

// can get details even if reference to function reference used 
let myFunc = function() {};
let otherFuncRef = myFunc;
const functionDetails = tm.getTypeDetailss( otherFuncRef );
console.log( functionDetails.Type );                            // => 'function'
console.log( functionDetails.hasCustomConstructor );            // => false
console.log( functionDetails.ReferenceVariable );               // => 'myFunc'
console.log( functionDetails.prototypeChainString );            // => 'Function -> Object'
console.log( functionDetails.prototypeChain );                  // => ['Function', 'Object']

const anonFunctionDetails = tm.getTypeDetailss( function() {} );
console.log( anonFunctionDetails.Type );                         // => 'function'
console.log( anonFunctionDetails.hasCustomConstructor );         // => false
console.log( anonFunctionDetails.ReferenceVariable );            // => ''
console.log( anonFunctionDetails.prototypeChainString );         // => 'Function -> Object'
console.log( anonFunctionDetails.prototypeChain );               // => ['Function', 'Object']

// Generator Function
function* genFunc() {};
const generatorDetails = tm.getTypeDetailss(genFunc);
console.log( generatorDetails.Type );                            // => 'GeneratorFunction'
console.log( generatorDetails.hasCustomConstructor );            // => false
console.log( generatorDetails.ReferenceVariable );               // => 'genFunc'
console.log( generatorDetails.prototypeChainString );            // => 'GeneratorFunction -> Function -> Object'
console.log( generatorDetails.prototypeChain );                  // => ['GeneratorFunction', 'Function', 'Object']
```


<br> 


### **`isJSONSerializable(obj, acceptFormatLoss, visitedObjects)`**
----
Checks if an object is JSON serializable. This is a recursive function that will check *all* properties of an object. 

Only objects which are strictly serializable will return true. Objects with functions, circular references or invalid nested types will return false. 

**Parameters**  
***object*** - The object to check to determine if it has a circular reference

***acceptFormatLoss*** - Optional. if false (the default), only return true for types that can be serializaed without problems. 

If this parmeter is true this function also returns true for types where data may need trivial conversion when de-serializing. E.g. 'Date', 'URL', 'URLsearchparams' are converted to strings when serializing to JSON. so New Date( stringValue ) or new URL( stringValue ) etc can be used to convert back. 

Typed arrays are converted to regular arrays when serializing to JSON so iterating over the results of the parsed JSON element, adding to an array and then new TypedArray( array ) can be used to convert back.  

***visitedObjects*** -   Used internally to detect circular references. **Do not pass this parameter**.

**Returns**   
true if the object is JSON serializable WITHOUT a loss of data, false otherwise

<br> 

### **Examples** 


```javascript
const tm = require('type-master' );

console.log( tm.isJSONSerializable({ a: 1, b: 2 }));            // => true
console.log( tm.isJSONSerializable(new Map()));                 // => false

// objects with non enumerable properties can still be serialized
let obj = { a: 1 };
Object.defineProperty( obj, 'b', { value: 2, 
                                   enumerable: false });
console.log( tm.isJSONSerializable(obj) );                      // =>  true

// Arrays with non integer properties can't be serialized 
let arr =[1, 2, 3, 4];
arr.foo = "bar"; 
console.log( tm.isJSONSerializable(arr) );                      // =>  false);
```

**functions or objects with functions can't be JSON serialized** 
```javascript
console.log( tm.isJSONSerializable( () => {} );                 // => false
console.log( tm.isJSONSerializable( () => {}, true );           // => false  - still false because data is lost

// nested function 
const objFn = {
    level1: {
        level2: { func: function() {}, },
    },
};
console.log( tm.isJSONSerializable( objFn ));                   // => false
```

**Some objects can be JSON serialized but with loss of format**
```javascript
let today = new Date();
console.log( tm.isJSONSerializable({ today, true }));           // => true - no data lost but format is changed into string
                                                            
let obj = { key: new URL('http://example.com') };
console.log( tm.isJSONSerializable( obj, true )));              // => true - value converted into a string 

let obj = { key: new Float64Array([1.1, 2.2, 3.3, 4.4]) };
console.log( tm.isJSONSerializable(obj) );                      // =>  false
console.log( tm.isJSONSerializable(obj,true) );                 // =>  true  
```
<br> 

### **`hasCircularReference( object, visitedObjects )`**
---
Checks if an object has a circular reference. This is a recursive function that will check all properties of an object. It works for ALL types of objects including custom and ES6 classes and is particularily useful for debugging. 

However, note:  
1 . It checks object properties (i.e., their state) and does not check for circular references in methods or object prototypes   
2 . It won't catch circular references in dynmically created properties (i.e. created when methods are called)  
3 . If a custom or ES6 class overrides the default behavior of for...in or Object.keys, there may be problems    

**Parameters**  
***object*** - The object to check to determine if it has a circular reference
 
***visitedObjects*** - Used internally to detect circular references. **Do not pass this parameter**
 
**returns**  
 `true` if the object has a circular reference, `false` otherwise.

<br> 

### **Examples** 

```javascript
let obj = {};
obj.self = obj;
console.log( tm.hasCircularReference(obj));         // => true

let obj = { a: 1, b: 2, c: { name: 'test' } };
console.log( tm.hasCircularReference(obj));         // => false
```

<br>
    
# **Installation**  


## **Node.js**

Installing Type-Master in a Node.js project is easy with npm. Simply use the following command:

```bash 
  npm install type-master
```

Then, in your JavaScript file, you can require the module as follows:

```javascript
  const tm = require('type-master' );
```

## **Browsers**
For browser environments, you can import Type-Master via either CommonJS (CJS), ECMAScript Modules (ESM) or a simple  IIFE style global module. You can use the minified or non-minified versions when debugging you app. 

#### ***CommonJS (CJS)***

If you're using a bundler like Browserify or Webpack, you can use the same `require` syntax as in Node.js:

```javascript
  const tm = require('type-master' );
```

#### ***ECMAScript Modules (ESM)***

In modern browsers that support ECMAScript Modules, you can import Type-Master directly in your HTML file. E.g;  

```html
  <script type="module">
      import * as tm from './node_module/type-master/dist/type-master.esm.min.js';
      // OR if you just need the essentials 
      import {extendedTypeOf, typeOfNumber, isSafeNumber} from './node_module/type-master/dist/type-master.esm.min.js';
  </script>
```

### ***Unbundled (IIFE) Global straight into your script*** 
If you are not using a bundler and your app is going to run on ES5 browsers without ESM module support you can use the IIFE global module version which will work on all browsers as is.
```html
  <script src="./node_module/type-master/dist/type-master.iife.min.js"></script>
  <script>
      var tm = typeMaster;  // the IIFE global is called 'typeMaster'

      // your code 
      if ( tm.extendedTypeOf(obj) === 'null' ) {
          yourObjectResetcode( obj);      
      } else {
          obj = yourObjectCreationCode( );
      }
  </script>  
```

<br>

# **Compatiability** 

### **ES6 Targets** 
For full compatiability with ES6 types the following Node or browser versions or greater should be used  

| Node | Chrome | FireFox | Safari | Edge | Opera | IOS | Samsung Browser | Chrome Android | WebView Android |
| :---:| :---:  | :---:   | :---:  | :---: | :--: |:---:|:---:            | :--:           |  :--:           |
| 7.6  | 55     | 52      |  10.2  |  15  | 43    | 11.2|  6.0            |         55     |  55             |
|

<br>

### **ES6 Targets via ES5 with Polyfills** 
if you are Targeting ES5 environments via ES6 Polyfills ( E.g. via Babel ) then Type-Master will work correctly with the following Node / Browser versions of greater 

| Node | Chrome | FireFox | Safari | Edge | Opera | IOS | Samsung Browser | Chrome Android | WebView Android |
| :---: | :---: |  :---:  | :---:  |:---: |:---:  |:--- | :---:           | :---:          |:---:            | 
| 0.12  | 34    | 32      |  9     |  12  | 25    | 9   |    2.0          |         34     |  37             |
|

This requires the ES6 Polyfills to simulate the actual ES6 type. However, note that in some cases the polyfill duplicates the run-time behaviour of the type but *can't* simulate the actual ES6 type. E.g. This applies to *Arrow* and *Async Functions*. In practice If you don't need to detect/inspect these specific types at runtime in your code everything should work fine. E.g. you'll be able to correctly get the type of typed Arrays, or Symbol or Map objcts etc. 


