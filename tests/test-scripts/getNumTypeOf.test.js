import { getNumTypeOf } from '../testIndex.js';

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

// basic check of deprecated version of getNumTypeOf
import { typeOfNumber } from '../testIndex.js';
it('get number type of NaN', () => {
  expect(typeOfNumber(NaN)).toBe('NaN');
  expect(typeOfNumber('not a number')).toBe('NaN');
});
// ----------- end of deprecated tests -----------

it('get number type of NaN', () => {
  expect(getNumTypeOf(NaN)).toBe('NaN');
  expect(getNumTypeOf('not a number')).toBe('NaN');
});

it('get number type of Infinity', () => {
  expect(getNumTypeOf(1/0)).toBe('infinity');
  expect(getNumTypeOf(-1/0)).toBe('-infinity');
});

it('get number type of safeinteger', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers  
  expect(getNumTypeOf(10)).toBe('safeInteger');
  expect(getNumTypeOf(maxInt)).toBe('safeInteger');
  expect(getNumTypeOf(-maxInt)).toBe('safeInteger');
});

it('get number type of unsafe integers', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers
  expect(getNumTypeOf(maxInt + 1)).toBe('unsafeNumber');
  expect(getNumTypeOf(-maxInt - 1)).toBe('unsafeNumber');
  expect(getNumTypeOf(Number.MAX_VALUE)).toBe('unsafeNumber');
});

it('get number type of float', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers
  expect(getNumTypeOf(1.1)).toBe('safeFloat');
  expect(getNumTypeOf(900719925474099.75)).toBe('safeFloat');
  expect(getNumTypeOf(90071992547409975.33)).toBe('unsafeNumber');
});

it('get number type of bigint', () => {
  if (typeof BigInt !== 'undefined') {
    expect(getNumTypeOf(BigInt(123))).toBe('bigint');
  } else {
    console.log('BigInt is not supported in this environment');
  }
});

it('get number type of bigint literal', () => {
  if (typeof BigInt !== 'undefined') {
    expect(getNumTypeOf( 123n )).toBe('bigint');
  } else {
    console.log('BigInt is not supported in this environment');
  }
});

it('get number type of string with a number', () => {
  expect(getNumTypeOf('123')).toBe('safeInteger');
  expect(getNumTypeOf('1.11')).toBe('safeFloat');
  expect(getNumTypeOf('-1.11')).toBe('safeFloat');
  expect(getNumTypeOf('0xFF')).toBe('safeInteger');
});

it('get number type of invalid number string', () => {
  expect(getNumTypeOf('123xyz')).toBe('NaN');
  expect(getNumTypeOf('xyz')).toBe('NaN');
  expect(getNumTypeOf('123xyz', false)).toBe('NaN');
  expect(getNumTypeOf('xyz',false)).toBe('NaN');
});

it('get number type of string with acceptStringNumber set to false', () => {
  expect(getNumTypeOf('123', false)).toBe('NaN');
  expect(getNumTypeOf('123.99', false)).toBe('NaN');
});

it('get number type of boolean', () => {
  expect(getNumTypeOf(true)).toBe('NaN');
});

it('get number type of null', () => {
  expect(getNumTypeOf(null)).toBe('NaN');
});

it('get number type of object', () => {
  expect(getNumTypeOf({})).toBe('NaN');
});

it('get number type of Symbol', () => {  
  expect(getNumTypeOf(Symbol('hello'))).toBe('NaN');
});

it('get number type of undefined', () => {
  expect(getNumTypeOf(undefined)).toBe('NaN');
});

it('get number type of function', () => {
  expect(getNumTypeOf(function() {})).toBe('NaN');
});

it('get number type of array', () => {
  expect(getNumTypeOf([])).toBe('NaN');
});

it('get number type of a Number Object', () => {
  expect(getNumTypeOf( new Number(999))).toBe('numberObject');   // Note - not a number primitive
}); 

