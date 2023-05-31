import { getNumberType } from '../src/index.js';

test('getNumberType of NaN', () => {
  expect(getNumberType(NaN)).toBe('nan');
  expect(getNumberType('not a number')).toBe('nan');
});

test('getNumberType of Infinity', () => {
  expect(getNumberType(Infinity)).toBe('infinity');
  expect(getNumberType(-Infinity)).toBe('infinity');
});

test('getNumberType of safeinteger', () => {
  expect(getNumberType(10)).toBe('safeinteger');
  expect(getNumberType(Number.MAX_SAFE_INTEGER)).toBe('safeinteger');
});

test('getNumberType of unsafe integer', () => {
  expect(getNumberType(Number.MAX_SAFE_INTEGER + 1)).toBe('unsafeNumber');
  expect(getNumberType(Number.MIN_SAFE_INTEGER - 1)).toBe('unsafeNumber');
});

test('getNumberType of float', () => {
  expect(getNumberType(1.1)).toBe('float');
});

