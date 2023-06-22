# **Type-Master**

## **What is Type-Master?**
-----
Type-Master is an simple but innovative JavaScript utility package designed to provide in-depth and precise type information for any JavaScript object, be it a primitive, built-in type, ES6/ES2020 type or even your custom classes. It offers a set of functions that go beyond the native `typeof`, `instanceof` or `isNaN` operators, addressing their limitations and delivering enhanced run-time and debug-time functionality that every JavaScript developer needs at their fingertips.  
<br>

## **Why?**
---------
In JavaScript, understanding the types you are working with is crucial for maintaining robust, bug-free code. Yet, JavaScript's native tools for identifying types are limited and sometimes misleading; there are numerous edge cases where the javascript built-in operators fail to provide correct or useable information. Type-Master addresses these shortcomings by:

- Accurately identifying the **actual** type of any JavaScript object via a simple to use `extendedTypeOf( )` function.  

- Testing if a number is safe to use in calculations, a common source of bugs when dealing with JavaScript's different number types, via `isSafeNumber( )`

- Providing information on the specific sub-type of a number via `typeOfNumber( )` - (E.g. 'bigint', 'NaN' , 'infinity, -infinity, safeInteger, unsafeNumber and safeFloat ).

- Providing detailed information about the object, including its prototype chain via `getTypeDetails( )` function

- Checking if an object is JSON serializable, a common requirement in modern JavaScript programming via `isJSONSerializable()`

- Checking for circular references, an essential tool for debugging complex object structures via `hasCircularReference()`

<br>  

Also Type-Master:
  
- Has zero external dependencies.

- Also works when testing most ES6 types whilst running in non ES6 environments via Polyfills ( E.g. when bundling via Babel ).  See the Compatiability section below.

- Has been extensively tested across different browsers and run-time environments (Node, Iframes, Worker threads etc - see the tests folder in the GitHub project for details).


<br>

In short, Type-Master provides JavaScript developers with an small arsenal of tools for dealing with types, eliminating guesswork and reducing potential sources of bugs and so saving development time.

<br>




<br>
    
## **Installation**
------
## **Node.js**

Installing Type-Master in a Node.js project is easy with npm. Simply use the following command:

```bash 
  npm install type-master
```

Then, in your JavaScript file, you can require the module as follows:

```javascript
  const tm = require('type-master');
```

## **Browsers**
For browser environments, you can import Type-Master via either CommonJS (CJS), ECMAScript Modules (ESM) or a simple  IIFE style global module. You can use the minified or non-minified versions when debugging you app. 

## CommonJS (CJS)

If you're using a bundler like Browserify or Webpack, you can use the same `require` syntax as in Node.js:

```javascript
  const tm = require('type-master');
```

## ECMAScript Modules (ESM)

In modern browsers that support ECMAScript Modules, you can import Type-Master directly in your HTML file. 
E.g. If you have downloaded from GitHub 

```html
  <script type="module">
      import * as tm from './dist/type-master.esm.min.js';
  </script>
```

## Unbundled (IIFE) Global straight into your script 

```html
  <script src="./dist/type-master.iife.min.js"></script>
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

## **Usage**

Here are some examples of how you might use Type-Master. Note the wide range of examples where this tiny library will allow you to correctly identify the type of an object or the allowed operations and so the prevent incorrect behaviour if you naively used the built-in `typeof`, `instanceof` or `isNaN` operators.

**basic use**
```javascript
const tm = require('type-master'); 

console.log(tm.extendedTypeOf(null)); // 'null'          typeOf would return 'object'
console.log(tm.extendedTypeOf([])); // 'Array'           typeOf would return 'object'
console.log(tm.extendedTypeOf(new Map())); // 'Map'      typeOf would return 'object'
console.log(tm.extendedTypeOf(() => {})); // 'ArrowFunction'  typeOf would return 'function' 

```
**Get detailed type information**
```javascript
console.log(tm.getTypeDetails(new Set())); 
// { Type:                'Set',
//   ReferenceVariable:   '', 
//   hasCustomConstructor: false, 
//   prototypeChainString: 'Set -> Object', 
//   prototypeChain: ['Set']
//}
```
**Check if a number is safe for calculations**
```javascript
console.log(tm.isSafeNumber(Number.MAX_SAFE_INTEGER)); // true
console.log(tm.isSafeNumber(Number.MAX_SAFE_INTEGER + 1)); // false
console.log(tm.isSafeNumber("1234")); // true
console.log(tm.isSafeNumber("1234abcd")); // false
```
**Check if an object is JSON serializable**
```javascript
console.log(tm.isJSONSerializable({ a: 1, b: 2 })); // true
console.log(tm.isJSONSerializable(new Map())); // false
```
**Check for circular references**
```javascript
let obj = {};
obj.self = obj;
console.log(tm.hasCircularReference(obj)); // true
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
  if (extendedTypeOf(api) === "Promise") {
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
  if (extendedTypeOf(obj) === "MyCustomType") {
    // do something with the obj
    // This would not cause an error because extendedTypeOf obj is "MyCustomType"
    // using the builtin typeof wound cause an error because typeof obj is "object"
  }
};
```

**Working with `null` and `object`**

Using `typeof`, you might try to access a property or method of an object which is actually `null`, leading to a TypeError.

```javascript
let x = null;
if (typeof x === "object") {
    x.property = "value";  // TypeError: Cannot set property 'property' of null
}

if (extendedTypeOf(x) === "null") {
    console.log("x is null, can't access properties or methods");  // Safe operation
}
```

**Identifying arrays**

Arrays have unique methods that objects don't have. Trying to use these methods on an object will cause a TypeError.

```javascript
let y = [1, 2, 3];
if (typeof y === "object") {
    y.push(4);  // TypeError: y.push is not a function
}

if (extendedTypeOf(y) === "Array") {
    y.push(4);  // Safe operation, y is now [1, 2, 3, 4]
}
```

**Differentiating between 'Date', 'RegExp', and generic 'object'**

You may want to perform operations specific to Date or RegExp, and using `typeof` might lead to incorrect operations.

```javascript
let z = new Date();
if (typeof z === "object") {
    z.test("2023-06-21");  // TypeError: z.test is not a function
}

if (extendedTypeOf(z) === "Date") {
    console.log(z.getFullYear());  // Safe operation, outputs the year of date
}

let regex = new RegExp("\\d+");
if (typeof regex === "object") {
    console.log(regex.getFullYear());  // TypeError: regex.getFullYear is not a function
}

if (extendedTypeOf(regex) === "RegExp") {
    console.log(regex.test("123"));  // Safe operation, tests if string contains a number
}
```

**Working with ES6 and ES2020 types like 'Map' and 'Set'**

Map and Set have unique methods. Attempting these on a generic object will lead to errors.

```javascript
let map = new Map();
if (typeof map === "object") {
    map.push(["key", "value"]);  // TypeError: map.push is not a function
}

if (extendedTypeOf(map) === "Map") {
    map.set("key", "value");  // Safe operation, adds a key-value pair to the map
}

let set = new Set();
if (typeof set === "object") {
    set.property = "value";  // No error but incorrect operation, properties shouldn't be added to Set this way
}

if (extendedTypeOf(set) === "Set") {
    set.add("value");  // Safe operation, adds a value to the set
}
```

**Working with custom class instances**

With custom class instances, you might want to use specific methods from the class. Using `typeof` might cause you to use methods that don't exist.

```javascript
class MyClass { 
    printHello() { 
        console.log("Hello, World!"); 
    }
};

let instance = new MyClass();
if (typeof instance === "object") {
    instance.push("value");  // TypeError: instance.push is not a function
}

if (extendedTypeOf(instance) === "MyClass") {
    instance.printHello();  // Safe operation, prints "Hello, World!"
}
```

**Working with Polyfilled or transpiled types**

If you have a polyfilled Symbol, using `typeof` might make you perform incorrect operations.

```javascript
let polyfilledSymbol = /* polyfilled Symbol */;
if (typeof polyfilledSymbol === "object") {
    polyfilledSymbol.push("value");  // TypeError: polyfilledSymbol.push is not a function
}

if (extendedTypeOf(polyfilledSymbol) === "Symbol") {
    // Safe operation - no operation is performed here as symbols are usually used as unique identifiers
    console.log(polyfilledSymbol);
}
```

<br>

**For a complete list of functions and their descriptions, please refer to the provided JSDoc comments within the module's source code** 

<br> 


## **Compatiability** 
------
### **ES6 Targets** 
For full compatiability with ES6 types the following Node or browser versions or greater should be used

| Node | Chrome | FireFox | Safari | Edge | Opera | IOS | Samsung Browser | Chrome Android | WebView Android |
| :---: | :---: |  :---:  | :---:  |:---: |:---:  |:--- | :---:           | :---:          |:---:            | 
| 7.6  | 55     | 52      |  10.2  |  15  | 43    | 11.2 |    6.0         |         55     |  55             |
|

<br>

### **ES6 Targets via ES5 with Polyfills** 
if you are Targeting ES5 environments via ES6 Polyfills ( E.g. via Babel ) then Type-Master will work correctly with the following Node / Browser versions of greater 

| Node | Chrome | FireFox | Safari | Edge | Opera | IOS | Samsung Browser | Chrome Android | WebView Android |
| :---: | :---: |  :---:  | :---:  |:---: |:---:  |:--- | :---:           | :---:          |:---:            | 
| 0.12  | 34    | 32      |  9     |  12  | 25    | 9   |    2.0          |         34     |  37             |
|

This requires the ES6 Polyfills to simulate the actual ES6 type. However, note that in some cases the polyfill  
duplicates the run-time behaviour of the type but *can't* simulate the actual ES6 type. E.g. This applies to *Arrow* and *Async Functions*. In practice If you don't need to detect/inspect these specific types at runtime in your code everything should work fine. E.g. you'll be able to correctly get the type of typed Arrays, or Symbol or Map objcts etc. 

<br>
