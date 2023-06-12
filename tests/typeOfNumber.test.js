import { typeOfNumber } from '../src/index.js';

it('get number type of NaN', () => {
  expect(typeOfNumber(NaN)).toBe('NaN');
  expect(typeOfNumber('not a number')).toBe('NaN');
});

it('get number type of Infinity', () => {
  expect(typeOfNumber(Infinity)).toBe('infinity');
  expect(typeOfNumber(-Infinity)).toBe('-infinity');
});

it('get number type of safeinteger', () => {
  expect(typeOfNumber(10)).toBe('safeInteger');
  expect(typeOfNumber(Number.MAX_SAFE_INTEGER)).toBe('safeInteger');
});

it('get number type of unsafe integers', () => {
  expect(typeOfNumber(Number.MAX_SAFE_INTEGER + 1)).toBe('unsafeInteger');
  expect(typeOfNumber(Number.MIN_SAFE_INTEGER - 1)).toBe('unsafeInteger');
  expect(typeOfNumber(Number.MAX_VALUE)).toBe('unsafeInteger');
});

it('get number type of float', () => {
  expect(typeOfNumber(1.1)).toBe('float');
});

it('get number type of bigint', () => {
  expect(typeOfNumber(BigInt(123))).toBe('bigint');
});

it('get number type of bigint literal', () => {
  expect(typeOfNumber( 123n )).toBe('bigint');
});

it('get number type of string with a number', () => {
  expect(typeOfNumber('123')).toBe('safeInteger');
  expect(typeOfNumber('1.11')).toBe('float');
  expect(typeOfNumber('-1.11')).toBe('float');
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
