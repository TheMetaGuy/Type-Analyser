import { isSafeNum } from '../testIndex.js';

// basic check of deprecated version of isSafeNum
import { isSafeNumber } from '../testIndex.js';
it('test safe integers for safe use as a number', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers  
  expect(isSafeNumber(1)).toBe(true);
  expect(isSafeNumber(maxInt)).toBe(true);
  expect(isSafeNumber(-maxInt)).toBe(true);
  expect(isSafeNumber(0)).toBe(true);
});
// ----------- end of deprecated tests -----------


it('test safe integers for safe use as a number', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers  
  expect(isSafeNum(1)).toBe(true);
  expect(isSafeNum(maxInt)).toBe(true);
  expect(isSafeNum(-maxInt)).toBe(true);
  expect(isSafeNum(0)).toBe(true);
});

it('test unsafe integers for safe use as a number', () => {
  var maxInt = 9007199254740991;  // from mozilla docs. Number.MAX_SAFE_INTEGER is not supported on very old browsers    
  expect(isSafeNum(maxInt + 1)).toBe(false);
  expect(isSafeNum(-maxInt - 1)).toBe(false);
  expect(isSafeNum(Number.MAX_VALUE)).toBe(false); // Number.MAX_VALUE is not a safe integer
});

it('test Infinity and NaN for safe use as a number', () => {
  expect(isSafeNum(1/0)).toBe(false);
  expect(isSafeNum(-1/0)).toBe(false);
  expect(isSafeNum(NaN)).toBe(false);
});

it('test integer divided by zero for safe use as a number', () => {
    expect(isSafeNum(1/0)).toBe(false);
  });

it('test valid numeric strings are safe by default', () => {
  expect(isSafeNum('1')).toBe(true);
  expect(isSafeNum('1.1')).toBe(true);
  expect(isSafeNum('-1')).toBe(true);
  expect(isSafeNum('0xFF')).toBe(true);
});

it('test invalid numeric strings are safe by default', () => {
  expect(isSafeNum('34.345abchs', true)).toBe(false);
  expect(isSafeNum('Xyz', true)).toBe(false);
});

it('test numeric strings for safe use as a number when acceptStringNumbers is false', () => {
  expect(isSafeNum('1', false)).toBe(false);
  expect(isSafeNum('1.1', false)).toBe(false);
});

it('test BigInt and BigInt literals for safe use as a number', () => {
  if (typeof BigInt !== 'undefined') {
    expect(isSafeNum(1n)).toBe(false);
    expect(isSafeNum(BigInt(1))).toBe(false);
  } else {
    console.log('BigInt is not supported in this environment');
  }
});

it('test floating point string that is too large for safe use as a number', () => {
  expect(isSafeNum("999999999999999999999999.99", true)).toBe(false);
  expect(isSafeNum("999999999999999999999999.99", false)).toBe(false);
});

it('test Symbol for safe use as a number', () => {
  expect(isSafeNum(Symbol("test"))).toBe(false);
});

it('test Object for safe use as a number', () => {
  expect(isSafeNum({})).toBe(false);
  expect(isSafeNum(new Date())).toBe(false);
});

it('test Array for safe use as a number', () => {
  expect(isSafeNum([])).toBe(false);
  expect(isSafeNum([1])).toBe(false);
});

it('test Number Objects for safe use as a number', () => {
  expect(isSafeNum(new Number(1))).toBe(false);
  expect(isSafeNum(new Number(1.1))).toBe(false);
  expect(isSafeNum(new Number(-1))).toBe(false);
  expect(isSafeNum(new Number(0xFF))).toBe(false);
});