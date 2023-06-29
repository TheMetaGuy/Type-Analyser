# **Type-Master**

## **What is Type-Master?**
-----
Type-Master is a simple yet innovative utility package designed to provide in-depth and precise type information for any JavaScript object. It's capable of analyzing primitive, built-in types, ES6/ES2020 types, and even your custom classes. 

It offers a set of functions that go beyond the native `typeof`, `instanceof`, and `isNaN` operators, addressing their limitations and delivering enhanced run-time and debug-time functionality that every JavaScript developer needs.  
<br>

## **Why Use Type-Master?**
---------
Understanding the types you're working with in JavaScript is crucial for maintaining robust, bug-free code. Yet, JavaScript's native tools for identifying types can be limited and sometimes misleading; there are numerous edge cases where these built-in operators fail to provide correct or usable information. Type-Master addresses these shortcomings by:

- Accurately identifying the **actual** type of any JavaScript object via a simple-to-use **`extendedTypeOf( )`** function. This function works consistently across Iframes, Worker threads, and with browser DOM objects.  

- Testing if a number is safe to use in calculations, a common source of bugs when dealing with JavaScript's different number types, via **`isSafeNumber( )`**.

- Providing information on the specific sub-type of a number via **`typeOfNumber( )`** - (E.g. 'NaN', 'infinity', 'safeInteger', 'safeFloat' and 'unsafeNumber' etc).

- Offering detailed information about the object, including its prototype chain, via **`getTypeDetails( )`** function.

- Checking if an object is JSON serializable, a common requirement in modern JavaScript programming, via **`isJSONSerializable()`**.

- Checking for circular references, an essential tool for debugging complex object structures, via **`hasCircularReference()`**.

<br>  

Additionally, Type-Master:
  
- Has zero external dependencies.

- Works with most ES6 types, even in non-ES6 environments via Polyfills (E.g., when bundling via Babel). See the 'Compatibility' section below for more details.

- Has been extensively tested across different browsers and runtime environments (Node, Iframes, Worker threads, etc. - see the 'tests' folder in the GitHub project for details).

- Provides ESM, CSJ, and IIFE module variants for various use cases (refer to the *installation* section below).

- Is lightweight, at just 15KB unminified and 3KB minified. 

<br> 

## **Usage**

Here are descriptions and some examples of how you might use Type-Master. This library allows you to correctly identify the type of an object and know the allowed operations on it across a wide range of examples.


## **`extendedTypeOf( object )`**
---
Accurately identifies the type of all Javascript objects not just the primitive types and it's much more useful than the built-in Javascript 'typeof' operator. It provides the same core functionality but also has the following advantages. It; 

- returns the correct type for null, Array, **all** ES6 / ES2020 types and custom types ( E.g. your classes ). 

- works correctly with types correctly simulated via Polyfills (E.g. Symbol via Babel ) 

- Distinquishes between different types of functions( regular, async, generator, arrow ) 

- correctly identifies types retieved from Iframes and Worker threads where passing of those types is supported.

***Parameters***    
`object` - The object to determine the 'type' of

**Returns**  
This function returns a `string` representing the type of the object passed in. if a type can't be determined the string `unknown` will be returned. The following types will be in lower case as per the built-in javascript typeof operator: 

'string', 'number', 'boolean', 'undefined', 'symbol', 'function', 'object', 'bigint'. 

All other built-in types will be recognised and returned in CamelCase format as per the Javascript standard: E.g. 'Array', 'Date', 'Error', 'RegExp', 'URL' etc. Here are some typical return values: 

| Type | `extendedTypeOf` Output |
| ----------- | ------------------------- |
| `Number` | 'number' |
| `BigInt` | 'bigint' |
| `String` | 'string' |
| `Boolean` | 'boolean' |
| `Symbol` | 'symbol' |
| `Undefined` | 'undefined' |
| `Null` | 'null' |
| `Object` | 'object' |
| `Function` | 'function' |
| `Array` | 'Array' |
| `Date` | 'Date' |
| `RegExp` | 'RegExp' |
| `Error` | 'Error' |
| `TypeError` | 'TypeError' |
| `Map` | 'Map' |
| `WeakMap` | 'WeakMap' |
| `Set` | 'Set' |
| `WeakSet` | 'WeakSet' |
| `Promise` | 'Promise' |
| `Proxy` | 'Proxy' |
| `Int8Array` | 'Int8Array' |
| `Uint8Array` | 'Uint8Array' |
| `SharedArrayBuffer` | 'SharedArrayBuffer' |
| `URL` | 'URL' |
| `URLSearchParams` | 'URLSearchParams' |
| `Blob` | 'Blob' |
| `async function` | 'AsyncFunction' |
| `function*` | 'GeneratorFunction' |
| `() => {}` | 'ArrowFunction' |
|

<br>

### **Examples**

**Working with `null` and `object`**  
Using `typeof`, you might try to access a property or method of an object which is actually `null`, leading to a TypeError.  Using `ExtendedTypeOf` avoids this.

```javascript
const tm = require('type-master' ); 

let x = null;
if (typeof x === "object") {        // typeof always returns 'object' for null
    x.property = "value";           // TypeError: Cannot set property 'property' of null
}
if (tm.extendedTypeOf(x) === "null") {
    console.log( "x is null, can't access properties or methods");  // Safe operation
}

let y = {};
if (tm.extendedTypeOf(y) === "object") {
    console.log( "y is an object, we can access it's properties or methods");  // Safe operation
    y.property = "value";
}
```
Note that while `instanceof` can be used as an alternative to `typeof` in some cases, it won't work reliably across iframes or Worker threads. Moreover, `instanceof` can yield false positives if there's a matching type in the object's prototype chain. Using `ExtendedTypeOf` will avoid these issues.  
<br>

**Identifying `arrays`**  

Arrays have unique methods that objects don't have. Trying to use these methods on an object will cause a TypeError. Using `Array.isArray` does not work in all environments (E.g. IFrames or Worker threads). Using `extendedTypeOf` all arrays including ES6 typed arrays can also be identified in all environments.

```javascript
console.log( typeof someArrayInstance );                 // => 'object' not 'Array' - typeof considers Arrays as objects  

// This works across iframes and worker threads unlike Array.isArray( )
if (tm.extendedTypeOf( someArrayInstance ) === "Array") {  
    someArrayInstance.push(4); // Safe operation,
}

// All typed arrays can be recognised.  E.g. 
console.log( tm.extendedTypeOf(new Uint8Array) );       // => 'Uint8Array'
console.log( tm.extendedTypeOf(new Float32Array) );     // => 'Float32Array'
console.log( tm.extendedTypeOf(new BigInt64Array) );    // => 'BigInt64Array'
```
**Detecting safe use of function types**  
There are sometimes cases where checking of function type should be done in order to avoid subtle run-time errors

```javascript
function myFunction() {}
// check if it's safe to use call() or Apply( ) 
if (tm.extendedTypeOf(someFunction) === 'ArrowFunction') {
    throw new TypeError('Arrow functions cannot be invoked with new context using call() or apply().');
} else {
    someFunction.call( thisContext );
}

// check if it's safe to iterate 
if (tm.extendedTypeOf(someFunction) === 'GeneratorFunction') {
    const generator = someFunction();
    for (let value of generator) {
        console.log(value);
    }
} else {
    throw new TypeError('Expected a Generator Function.');
}

// check for safe use of a promise or something which returns a promise
if (tm.extendedTypeOf(someFunction) === 'Promise') {
    someFunction
        .then(result => console.log(result))
        .catch(error => console.error(error));
} else {
    let returnedPromise = someFunction();
    if (tm.extendedTypeOf(returnedPromise) === 'Promise') {
        returnedPromise()
            .then(result => console.log(result))
            .catch(error => console.error(error));
    } else {
        throw new TypeError('Expected a Promise or a function that returns a Promise.');
    }
}
```

**API Data Handling**:    
When building applications, you often fetch data from external APIs, and this data can come in various forms. Being able to accurately determine the type of the received data is crucial for handling it correctly.   

```Javascript 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (tm.extendedTypeOf(data) === 'Array') {
    data.forEach(item => {
      console.log(item);
    });
  } else if (tm.extendedTypeOf(data) === 'Object') {
    Object.keys(data).forEach(key => {
      console.log(`${key}: ${data[key]}`);
    });
  } else {
    console.error('Unexpected data type received from API');
  }
}
```
**Building a Middleware for a Web Server:**  
When you're building middleware for a web server, you may receive data in the request body in different formats depending on the client's request. extendedTypeOf can also be useful here. In this example, expressApp is an instance of an Express.js application; 
```Javascript
expressApp.use((req, res, next) => {
  if (tm.extendedTypeOf(req.body) === 'Array') {
    // Do something with the array
  } else if (tm.extendedTypeOf(req.body) === 'Object') {
    // Do something with the object
  } else {
    // Unexpected type - handle error
  }
  next();
});
```
**checking an object type from an iframe or worker thread**
```javascript
const iframe = document.createElement("iframe");
iframe.src = "https://example.com/iframe.html";
iframe.onload = () => {
  const obj = iframe.contentWindow.obj;
  if (tm.extendedTypeOf(obj) === "MyCustomType") {
    // do something with the obj
    // This would not cause an error because extendedTypeOf obj is "MyCustomType"
    // using the builtin typeof wound cause an error because typeof obj is "object"
  }
};
```

**Differentiating between 'Date', 'RegExp', and generic 'objects'**
You may want to perform operations specific to Date or RegExp but `typeof` treats them as generic objects which can lead to incorrect operations

```javascript
let z = new Date();
console.log( typeof(z)  );                          // => 'object' not Date
if (tm.extendedTypeOf(z) === "Date") {
    console.log( z.getFullYear());                  // '2023' - Safe operation, outputs the year of date
}

let regex = new RegExp("\\d+");
console.log( typeof(regex) );                       // => 'object' not RegExp
if (tm.extendedTypeOf(regex) === "RegExp") {
    console.log( regex.test("123"));                // 'true' - Safe operation, tests if string contains a number
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

// All known ES6 types can be detected. E.g. 
const buffer = new ArrayBuffer(16);
console.log( tm.extendedTypeOf(new DataView(buffer)));          // => 'DataView'
console.log( tm.extendedTypeOf(buffer));                        // => 'ArrayBuffer'
console.log( tm.extendedTypeOf(new SharedArrayBuffer(16)));     // => 'SharedArrayBuffer'
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

**Working with overridden Custom Tags and objects with toString( ) Method**
```javascript
let theObj = {
    name: 'John',
    age: 30,
    [Symbol.toStringTag]: 'SomeCustomTag'
}
// Setting [Symbol.toStringTag] allows the detected 'type' of custom objects to be defined
// so that objects can be distinquished from each other
console.log( tm.extendedTypeOf(theObj));                               // => 'MyCustomTag'

let myObj = {
    name: 'John',
    age: 30,
    toString: function() {
        return 'MagicObj';
    }
}
console.log( tm.extendedTypeOf(myObj));                                // => 'unknown' - by deisgn see below

class MyClass {
constructor() {
    this.name = 'John';
    this.age = 30;
}
get [Symbol.toStringTag]() {
    return 'Not_MyClass';
}   
let myClassInstance = new MyClass();
console.log( tm.extendedTypeOf(myClassInstance) );                    // => 'MyClass'  - by design see below
console.log( tm.myClassInstance[Symbol.toStringTag] );                // => 'Not_MyClass" - default javascript behavior still OK

```

#### ***Special Cases: toString( ) Override and [Symbol.toStringTag]***

`extendedTypeOf` handles several special cases where the returned 'type' might not align with your expectations:

- *Objects with toString() Overridden:** The built-in `toString()` method, which all objects have, is essential to determining an object's type. If this is overridden by custom code, the ability to correctly determine the object's type is compromised therefore `extendedTypeOf` returns `unknown` in these cases. You can still use `toString()` to retrieve the value set by the custom code.
  
- *Custom Classes with [Symbol.toStringTag]:** If custom classes have `[Symbol.toStringTag]` set, Type-Master will return the class name rather than the toStringTag value. This design is intentional. If you want to retrieve the custom tag, `[Symbol.toStringTag]` will still return whatever value was set.

- *Object Types with [Symbol.toStringTag]:** Actual `Object` types with `[Symbol.toStringTag]` set will have that value returned for the type of the object  


**Rationale**  
The goal of Type-Master is to reveal the intrinsic underlying 'type' of an object. For built-in types and custom objects, using `[Symbol.toStringTag]` doesn't alter that. However, we consider actual `Object` types an exception and return the `[Symbol.toStringTag]` value. This is because JavaScript's type system returns 'object' for all Objects, making it impossible to distinguish one type of custom Object from another without using `[Symbol.toStringTag]`. 

Note that `[Symbol.toStringTag]` and `toString()` values are always accessible to you. Type-Master simply provides you with additional type information you wouldn't otherwise have.

<br> 

## **`typeOfNumber( object , acceptStringNumbers = true )`**
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

// unsafe numbers to use in calculations
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

console.log( tm.typeOfNumber( new Number(999)));   // => 'numberObject'  - not a number primitive
```


<br> 

## **`isSafeNumber( object , acceptStringNumbers = true )`**
---
Tests to see if the number passed in is safe to use in a calculation. This is useful because Javascript has a number of different types of numbers and some of them are not safe to use in calculations. E.g. BigInts are not safe to use in calculations with regular numbers. Also, numbers that are too large to be safe integers are not safe to use in calculations. 

Note;  
1 . NaN returns false as it is not a safe number to use in calculations.  
2 . Booleans also returns false because even though javascript coerces them into 0 or 1, relying on this behaviour is not good practice and can lead to bugs.  
3 . Number Objects (created via new Number(xxx)) return false. Some JavaScript methods and functions behave differently when they receive an object instead of a primitive value. E.g. when comparing with ===, new Number(10) !== 10.

**Parameters**  
***object*** - The object to check to determine if it is a safe number
 
***acceptStringNumbers*** -  Optional. If true (the default value), then if a string is passed in, it will be converted to a number and it's type will tested for safe use. Strings are not coerceced to numbers if they do not represent a valid number. E.g '34.345abchs' will not be converted to a number and will return false. But '34.345' will be converted to a number and will return true. String representing Hex numbers also work - E.g. 0xFF. 

*(Note - the built in javascript parseFloat() function can be used before calling this function to force coercing. E.g. it will convert '34.345abchs' to 34.345). if acceptStringNumbers is false then when a string is passed in, it will never be converted to a number and false will be returned*
 
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

// Objects, Arrays and many built-in Javascript types (E.g. Map, Sets etc) aren't safe to use in calculations 
console.log( tm.isSafeNumber(NaN) );                   // => false 
console.log( tm.isSafeNumber( {} ) );                  // => false 
console.log( tm.isSafeNumber( new Date()) );           // => false 
console.log( tm.isSafeNumber( []) );                   // => false 
console.log( tm.isSafeNumber( [1]) );                  // => false 

// Number Objects (as opposed to number primitives) aren't safe in all cases either E.g. 'new Number(99) !== 99'  !!!  
console.log( tm.isSafeNumber( new Number(99) ) )       // => false

```

<br> 

## **`getTypeDetails( object, showFullPrototypeChain )`**
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
| **ReferenceVariable** | "" | A string representation of the reference variable, if any, that points to the input object. E.g. if you have *'let myfunc =  function() {};'* then 'Type' will be 'function' and the 'ReferenceVariable will be 'myfunc' in the returned object from getTypeDetails(myfunc). | 
| **hasCustomConstructor**| false | true if the input object has a it's own custom constructor, false otherwise. |
| **prototypeChainString** | ""  |A string representation of the Javascript inheritance prototype chain of the input object. Objects in the chain are separated by ' -> '. E.g. 'Child -> Parent -> Object'. | 
| **prototypeChain** | null | An array containing the javascript inheritance prototype chain of the input object passed. |
|

<br>

### **Examples** 


**type details of some built-in javascript types** 
```javascript
const tm = require('type-master' );

const stringDetails = tm.getTypeDetails('test');
console.log( stringDetails.Type );                              // => 'string'
console.log( stringDetails.hasCustomConstructor );              // => false
console.log( stringDetails.ReferenceVariable );                 // => ''
console.log( stringDetails.prototypeChainString );              // => 'String -> Object'
console.log( stringDetails.prototypeChain );                    // => ['String', 'Object']

const arrayDetails = tm.getTypeDetails( [] );
console.log( arrayDetails.Type );                               // => 'Array'
console.log( arrayDetails.hasCustomConstructor );               // => true
console.log( arrayDetails.ReferenceVariable );                  // => ''
console.log( arrayDetails.prototypeChainString );               // => 'Array -> Object'
console.log( arrayDetails.prototypeChain );                     // => ['Array', 'Object']

const nullDetails = tm.getTypeDetails(null);
console.log( nullDetails.Type );                                // => 'null'
console.log( nullDetails.hasCustomConstructor );                // => false
console.log( nullDetails.ReferenceVariable );                   // => ''
console.log( nullDetails.prototypeChainString );                // => ""
console.log( nullDetails.prototypeChain );                      // => null

const symbolDetails = tm.getTypeDetails( Symbol("test") );
console.log( symbolDetails.Type );                              // => 'symbol'
console.log( symbolDetails.hasCustomConstructor );              // => false
console.log( symbolDetails.ReferenceVariable );                 // => ''
console.log( symbolDetails.prototypeChainString );              // => 'Symbol -> Object'
console.log( symbolDetails.prototypeChain );                    // => ['Symbol', 'Object']

// check type details of Regular Expression
const regExDetails = tm.getTypeDetails(/hello/);
console.log( regExDetails.Type );                               // => 'RegExp'
console.log( regExDetails.hasCustomConstructor );               // => true
console.log( regExDetails.ReferenceVariable );                  // => ''
console.log( regExDetails.prototypeChainString );               // => 'RegExp -> Object'
console.log( regExDetails.prototypeChain );                     // => ['RegExp', 'Object']

// check type details of Date 
const dateDetails = tm.getTypeDetails(new Date());
console.log( dateDetails.Type );                                 // => 'Date'
console.log( dateDetails.hasCustomConstructor );                 // => true
console.log( dateDetails.ReferenceVariable );                    // => ''
console.log( dateDetails.prototypeChainString );                 // => 'Date -> Object'
console.log( dateDetails.prototypeChain );                       // => ['Date', 'Object']

let thePromise = new Promise(() => {});
const promiseDetails = tm.getTypeDetails( thePromise );
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
const childDetails = tm.getTypeDetails(new Child());

console.log( childDetails.Type );                               // => 'Child'
console.log( childDetails.hasCustomConstructor );               // => true
console.log( childDetails.ReferenceVariable );                  // => ''
console.log( childDetails.prototypeChainString );               // => 'Child -> Parent -> Object'
console.log( childDetails.prototypeChain );                     // => ['Child', 'Parent', 'Object']

// with shortened output prototype chain 
const childDetailsShort = tm.getTypeDetails(new Child(), false);
console.log( childDetailsShort.Type );                          // => 'Child'
console.log( childDetailsShort.hasCustomConstructor );          // => true
console.log( childDetailsShort.ReferenceVariable );             // => ''
console.log( childDetailsShort.prototypeChainString );          // => 'Child -> Parent'
console.log( childDetailsShort.prototypeChain );                // => ['Child', 'Parent']
```

**type details of some function types** 
```javascript
const myArrowFunction = () => {};
const arrowFunctionDetails = tm.getTypeDetails(myArrowFunction); 
console.log( arrowFunctionDetails.Type );                       // => 'ArrowFunction'
console.log( arrowFunctionDetails.hasCustomConstructor );       // => false
console.log( arrowFunctionDetails.ReferenceVariable );          // => 'myArrowFunction'
console.log( arrowFunctionDetails.prototypeChainString );       // => 'Function -> Object'
console.log( arrowFunctionDetails.prototypeChain );             // => ['Function', 'Object']

// can get details even if reference to function reference used 
let myFunc = function() {};
let otherFuncRef = myFunc;
const functionDetails = tm.getTypeDetails( otherFuncRef );
console.log( functionDetails.Type );                            // => 'function'
console.log( functionDetails.hasCustomConstructor );            // => false
console.log( functionDetails.ReferenceVariable );               // => 'myFunc'
console.log( functionDetails.prototypeChainString );            // => 'Function -> Object'
console.log( functionDetails.prototypeChain );                  // => ['Function', 'Object']

const anonFunctionDetails = tm.getTypeDetails( function() {} );
console.log( anonFunctionDetails.Type );                         // => 'function'
console.log( anonFunctionDetails.hasCustomConstructor );         // => false
console.log( anonFunctionDetails.ReferenceVariable );            // => ''
console.log( anonFunctionDetails.prototypeChainString );         // => 'Function -> Object'
console.log( anonFunctionDetails.prototypeChain );               // => ['Function', 'Object']

// Generator Function
function* genFunc() {};
const generatorDetails = tm.getTypeDetails(genFunc);
console.log( generatorDetails.Type );                            // => 'GeneratorFunction'
console.log( generatorDetails.hasCustomConstructor );            // => false
console.log( generatorDetails.ReferenceVariable );               // => 'genFunc'
console.log( generatorDetails.prototypeChainString );            // => 'GeneratorFunction -> Function -> Object'
console.log( generatorDetails.prototypeChain );                  // => ['GeneratorFunction', 'Function', 'Object']
```


<br> 


## **`isJSONSerializable(obj, acceptFormatLoss, visitedObjects)`**
----
Checks if an object is JSON serializable. This is a recursive function that will check *all* properties of an object. 

Only objects which are strictly serializable will return true. Objects with functions, circular references or invalid nested types will return false. 

**Parameters**  
***object*** - The object to check to determine if it has a circular reference

***acceptFormatLoss*** - Optional. if false (the default), only return true for types that can be serializaed without problems. 

If this parmeter is true then this function also returns true for types where no data is lost but the format is changed and can be easily converted back when de-serializing. E.g. 'Date', 'URL', 'URLsearchparams' are converted to strings when serializing to JSON, so New Date( stringValue ) or new URL( stringValue ) etc can be used to convert back. 

Typed arrays are converted to regular arrays when serializing to JSON so iterating over the results of the parsed JSON element, adding to an array and then new TypedArray( array ) can be used to convert back.  

***visitedObjects*** -  Used internally only to detect circular references. **Do not use this parameter**.

**Returns**   
true if the object is JSON serializable WITHOUT a loss of data, false otherwise.  Note that if 'acceptFormatLoss' is set then this function returns true if during JSON serialization there's no actual data loss but the format may be changed.   

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

// Arrays with non integer properties can't be serialized without loss of information
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
console.log( tm.isJSONSerializable( today, true ));             // => true - no data lost but format is changed into string
                                                            
let obj = { key: new URL('http://example.com') };
console.log( tm.isJSONSerializable( obj, true )));              // => true - value converted into a string 

let obj = { key: new Float64Array([1.1, 2.2, 3.3, 4.4]) };
console.log( tm.isJSONSerializable(obj) );                      // =>  false
console.log( tm.isJSONSerializable(obj,true) );                 // =>  true  
```
<br> 

## **`hasCircularReference( object, visitedObjects )`**
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
let obj1 = {};
obj1.self = obj1;
console.log( tm.hasCircularReference(obj1));         // => true

let obj2 = { a: 1, b: 2, c: { name: 'test' } };
console.log( tm.hasCircularReference(obj2));         // => false
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

# **Compatibility** 

### **ES6 Targets** 
For full compatibility with ES6 types, use the following Node or browser versions or newer:  

| Node | Chrome | FireFox | Safari | Edge | Opera | IOS | Samsung Browser | Chrome Android | WebView Android |
| :---:| :---:  | :---:   | :---:  | :---: | :--: |:---:|:---:            | :--:           |  :--:           |
| 7.6  | 55     | 53      |  10.2  |  15  | 43    | 11.2|  6.0            |         55     |  55             |
|

<br>

### **ES6 Targets via ES5 with Polyfills** 
if you are Targeting ES5 environments via ES6 Polyfills (E.g. via Babel) then Type-Master will work correctly with the following Node / Browser versions or newer: 

| Node | Chrome | FireFox | Safari | Edge | Opera | IOS | Samsung Browser | Chrome Android | WebView Android |
| :---: | :---: |  :---:  | :---:  |:---: |:---:  |:--- | :---:           | :---:          |:---:            | 
| 0.12  | 34    | 32      |  9     |  12  | 25    | 9   |    2.0          |         34     |  37             |
|

This requires the ES6 Polyfills to simulate the actual ES6 type. However, note that in some cases the polyfill duplicates the run-time behaviour of the type but ***can't*** simulate the actual ES6 type. E.g. This applies to *Arrow* and *Async Functions*. In practice If you don't need to detect/inspect these specific types at runtime in your code everything should work fine. E.g. you'll be able to correctly get the type of typed Arrays, or Symbol or Map objcts etc. 


