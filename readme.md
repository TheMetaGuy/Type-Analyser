# **Type-Master**

## **What is Type-Master?**
-----
Type-Master is an simple but innovative JavaScript utility package designed to provide in-depth and precise type information for any JavaScript object, be it a primitive, built-in type, ES6/ES2020 type or even your custom classes. It offers a set of functions that go beyond the native `typeof`, `instanceof` or `isNaN` operators, addressing their limitations and delivering enhanced functionality that every JavaScript developer needs at their fingertips.  
<br>

## **Why?**
---------
In JavaScript, understanding the types you are working with is crucial for maintaining robust, bug-free code. Yet, JavaScript's native tools for identifying types are limited and sometimes misleading; there are numerous edge cases where the javascript built-in operators fail to provide correct or useable information. Type-Master addresses these shortcomings at run-time by:

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


## **Compatiability** 
------
### **ES6 Targets** 
For full compatiability with ES6 and ES2020 types the following Node or browser versions should be used

#### Desktop
  - Node > v6 or greater  (V6 or less is 0.7% of users, V14 or less is 22% of users)
  - Chrome: v55+
  - Firefox: v54+
  - Safari: v10.2+ 
  - Edge: v15+
#### Mobile
  - Safari:  v11.2+
  - Samsumg Browser: v6.2+
  - ChromeAndriod: v55+
  - FirefoxAndroid v54+    

### **ES5 Targets** 
if you are Targeting ES5 environments via ES6 Polyfills ( E.g. via Babel ) then Type-Master will work correcly except where ES5 Polyfills duplicate the run-time behaviour of the type but *can't* simulate the actual ES6 type. E.g. This applies to *Arrow* and *Async Functions* -  In practice If you don't need to detect/inspect these types at runtime in your code everything should work fine.  E.g. you'd be able to correctly get the type of typed Arrays, or Symbol or Map objcts etc. 

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

## Usage

Here are some examples of how you might use Type-Master:

```javascript
const tm = require('type-master');    //or 
import ()

// Enhanced typeof
console.log(tm.extendedTypeOf(null)); // 'null'          typeOf would return 'object'
console.log(tm.extendedTypeOf([])); // 'Array'           typeOf would return 'object'
console.log(tm.extendedTypeOf(new Map())); // 'Map'      typeOf would return 'object'
console.log(tm.extendedTypeOf(() => {})); // 'ArrowFunction'  typeOf would return 'function' 

```
// Get detailed type information
```javascript
console.log(tm.getTypeDetails(new Set())); 
// { Type:                'Set',
//   ReferenceVariable:   '', 
//   hasCustomConstructor: false, 
//   prototypeChainString: 'Set -> Object', 
//   prototypeChain: ['Set']
//}
```
// Check if a number is safe for calculations
```javascript
console.log(tm.isSafeNumber(Number.MAX_SAFE_INTEGER)); // true
console.log(tm.isSafeNumber(Number.MAX_SAFE_INTEGER + 1)); // false
console.log(tm.isSafeNumber("1234")); // true
console.log(tm.isSafeNumber("1234abcd")); // false
```
// Check if an object is JSON serializable
```javascript
console.log(tm.isJSONSerializable({ a: 1, b: 2 })); // true
console.log(tm.isJSONSerializable(new Map())); // false
```
// Check for circular references
```javascript
let obj = {};
obj.self = obj;
console.log(tm.hasCircularReference(obj)); // true
```
// Safe use of a promise in a loop
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
// checking an object type from an iframe or worker thread
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



```

For a complete list of functions and their descriptions, please refer to the provided JSDoc comments within the module's source code. 

Upgrade your JavaScript toolkit today with Type-Master!