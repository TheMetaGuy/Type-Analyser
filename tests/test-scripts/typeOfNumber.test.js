import { typeOfNumber } from '../testIndex.js';

it('get number type of NaN', () => {
  expect(typeOfNumber(NaN)).toBe('NaN');
  expect(typeOfNumber('not a number')).toBe('NaN');
});

it('get number type of Infinity', () => {
  expect(typeOfNumber(1/0)).toBe('infinity');
  expect(typeOfNumber(-1/0)).toBe('-infinity');
});

it('get number type of safeinteger', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers  
  expect(typeOfNumber(10)).toBe('safeInteger');
  expect(typeOfNumber(maxInt)).toBe('safeInteger');
  expect(typeOfNumber(-maxInt)).toBe('safeInteger');
});

it('get number type of unsafe integers', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers
  expect(typeOfNumber(maxInt + 1)).toBe('unsafeNumber');
  expect(typeOfNumber(-maxInt - 1)).toBe('unsafeNumber');
  expect(typeOfNumber(Number.MAX_VALUE)).toBe('unsafeNumber');
});

it('get number type of float', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers
  expect(typeOfNumber(1.1)).toBe('safeFloat');
  expect(typeOfNumber(900719925474099.75)).toBe('safeFloat');
  expect(typeOfNumber(90071992547409975.33)).toBe('unsafeNumber');
});

it('get number type of bigint', () => {
  if (typeof BigInt !== 'undefined') {
    expect(typeOfNumber(BigInt(123))).toBe('bigint');
  } else {
    console.log('BigInt is not supported in this environment');
  }
});

it('get number type of bigint literal', () => {
  if (typeof BigInt !== 'undefined') {
    expect(typeOfNumber( 123n )).toBe('bigint');
  } else {
    console.log('BigInt is not supported in this environment');
  }
});

it('get number type of string with a number', () => {
  expect(typeOfNumber('123')).toBe('safeInteger');
  expect(typeOfNumber('1.11')).toBe('safeFloat');
  expect(typeOfNumber('-1.11')).toBe('safeFloat');
  expect(typeOfNumber('0xFF')).toBe('safeInteger');
});

it('get number type of invalid number string', () => {
  expect(typeOfNumber('123xyz')).toBe('NaN');
  expect(typeOfNumber('xyz')).toBe('NaN');
  expect(typeOfNumber('123xyz', false)).toBe('NaN');
  expect(typeOfNumber('xyz',false)).toBe('NaN');
});

it('get number type of string with acceptStringNumber set to false', () => {
  expect(typeOfNumber('123', false)).toBe('NaN');
  expect(typeOfNumber('123.99', false)).toBe('NaN');
});

it('get number type of boolean', () => {
  expect(typeOfNumber(true)).toBe('NaN');
});

it('get number type of null', () => {
  expect(typeOfNumber(null)).toBe('NaN');
});

it('get number type of object', () => {
  expect(typeOfNumber({})).toBe('NaN');
});

it('get number type of Symbol', () => {  
  expect(typeOfNumber(Symbol('hello'))).toBe('NaN');
});

it('get number type of undefined', () => {
  expect(typeOfNumber(undefined)).toBe('NaN');
});

it('get number type of function', () => {
  expect(typeOfNumber(function() {})).toBe('NaN');
});

it('get number type of array', () => {
  expect(typeOfNumber([])).toBe('NaN');
});

it('get number type of a Number Object', () => {
  expect(typeOfNumber( new Number(999))).toBe('numberObject');   // Note - not a number primitive
}); 