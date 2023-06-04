import { typeOfNumber } from '../src/index.js';

test('get number type of NaN', () => {
  expect(typeOfNumber(NaN)).toBe('nan');
  expect(typeOfNumber('not a number')).toBe('nan');
});

test('get number type of Infinity', () => {
  expect(typeOfNumber(Infinity)).toBe('infinity');
  expect(typeOfNumber(-Infinity)).toBe('infinity');
});

test('get number type of safeinteger', () => {
  expect(typeOfNumber(10)).toBe('safeinteger');
  expect(typeOfNumber(Number.MAX_SAFE_INTEGER)).toBe('safeinteger');
});

test('get number type of unsafe integer', () => {
  expect(typeOfNumber(Number.MAX_SAFE_INTEGER + 1)).toBe('unsafeinteger');
  expect(typeOfNumber(Number.MIN_SAFE_INTEGER - 1)).toBe('unsafeinteger');
  expect(typeOfNumber(Number.MAX_VALUE)).toBe('unsafeinteger');
});

test('get number type of float', () => {
  expect(typeOfNumber(1.1)).toBe('float');
});

test ('get number type of bigint', () => {
  expect(typeOfNumber(BigInt(123))).toBe('bigint');
});

test ('get number type of string', () => {
  expect(typeOfNumber('123')).toBe('nan');
});

test ('get number type of boolean', () => {
  expect(typeOfNumber(true)).toBe('nan');
});

test ('get number type of null', () => {
  expect(typeOfNumber(null)).toBe('nan');
});

test ('get number type of object', () => {
  expect(typeOfNumber({})).toBe('nan');
});

test ('get number type of Symbol', () => {  
  expect(typeOfNumber(Symbol('hello'))).toBe('nan');
});

test ('get number type of undefined', () => {
  expect(typeOfNumber(undefined)).toBe('nan');
});

test ('get number type of function', () => {
  expect(typeOfNumber(function() {})).toBe('nan');
});

test ('get number type of array', () => {
  expect(typeOfNumber([])).toBe('nan');
});
