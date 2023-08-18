import { getNumType } from '../testIndex.js';

it('get number type of NaN', () => {
  expect(getNumType(NaN)).toBe('NaN');
  expect(getNumType('not a number')).toBe('NaN');
});

it('get number type of Infinity', () => {
  expect(getNumType(1/0)).toBe('infinity');
  expect(getNumType(-1/0)).toBe('-infinity');
});

it('get number type of safeinteger', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers  
  expect(getNumType(10)).toBe('safeInteger');
  expect(getNumType(maxInt)).toBe('safeInteger');
  expect(getNumType(-maxInt)).toBe('safeInteger');
});

it('get number type of unsafe integers', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers
  expect(getNumType(maxInt + 1)).toBe('unsafeNumber');
  expect(getNumType(-maxInt - 1)).toBe('unsafeNumber');
  expect(getNumType(Number.MAX_VALUE)).toBe('unsafeNumber');
});

it('get number type of float', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers
  expect(getNumType(1.1)).toBe('safeFloat');
  expect(getNumType(900719925474099.75)).toBe('safeFloat');
  expect(getNumType(90071992547409975.33)).toBe('unsafeNumber');
});

it('get number type of bigint', () => {
  if (typeof BigInt !== 'undefined') {
    expect(getNumType(BigInt(123))).toBe('bigint');
  } else {
    console.log('BigInt is not supported in this environment');
  }
});

it('get number type of bigint literal', () => {
  if (typeof BigInt !== 'undefined') {
    expect(getNumType( 123n )).toBe('bigint');
  } else {
    console.log('BigInt is not supported in this environment');
  }
});

it('get number type of string with a number', () => {
  expect(getNumType('123')).toBe('safeInteger');
  expect(getNumType('1.11')).toBe('safeFloat');
  expect(getNumType('-1.11')).toBe('safeFloat');
  expect(getNumType('0xFF')).toBe('safeInteger');
});

it('get number type of invalid number string', () => {
  expect(getNumType('123xyz')).toBe('NaN');
  expect(getNumType('xyz')).toBe('NaN');
  expect(getNumType('123xyz', false)).toBe('NaN');
  expect(getNumType('xyz',false)).toBe('NaN');
});

it('get number type of string with acceptStringNumber set to false', () => {
  expect(getNumType('123', false)).toBe('NaN');
  expect(getNumType('123.99', false)).toBe('NaN');
});

it('get number type of boolean', () => {
  expect(getNumType(true)).toBe('NaN');
});

it('get number type of null', () => {
  expect(getNumType(null)).toBe('NaN');
});

it('get number type of object', () => {
  expect(getNumType({})).toBe('NaN');
});

it('get number type of Symbol', () => {  
  expect(getNumType(Symbol('hello'))).toBe('NaN');
});

it('get number type of undefined', () => {
  expect(getNumType(undefined)).toBe('NaN');
});

it('get number type of function', () => {
  expect(getNumType(function() {})).toBe('NaN');
});

it('get number type of array', () => {
  expect(getNumType([])).toBe('NaN');
});

it('get number type of a Number Object', () => {
  expect(getNumType( new Number(999))).toBe('numberObject');   // Note - not a number primitive
}); 