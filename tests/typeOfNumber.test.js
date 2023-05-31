import { typeOfNumber } from '../src/index.js';

test('getNumberType of NaN', () => {
  expect(typeOfNumber(NaN)).toBe('nan');
  expect(typeOfNumber('not a number')).toBe('nan');
});

test('getNumberType of Infinity', () => {
  expect(typeOfNumber(Infinity)).toBe('infinity');
  expect(typeOfNumber(-Infinity)).toBe('infinity');
});

test('getNumberType of safeinteger', () => {
  expect(typeOfNumber(10)).toBe('safeinteger');
  expect(typeOfNumber(Number.MAX_SAFE_INTEGER)).toBe('safeinteger');
});

test('getNumberType of unsafe integer', () => {
  expect(typeOfNumber(Number.MAX_SAFE_INTEGER + 1)).toBe('unsafeNumber');
  expect(typeOfNumber(Number.MIN_SAFE_INTEGER - 1)).toBe('unsafeNumber');
});

test('getNumberType of float', () => {
  expect(typeOfNumber(1.1)).toBe('float');
});

