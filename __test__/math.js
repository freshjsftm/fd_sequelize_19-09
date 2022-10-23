function checkNumberSafe (n) {
  return Number(n) < Number.MAX_SAFE_INTEGER;
}
function sum (a, b) {
  if (checkNumberSafe(a) && checkNumberSafe(b)) {
    return Number(a) + Number(b);
  }
  return Infinity;
}

describe('test for sum function', () => {
  test('add 1 to 2 to expect 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('add 1:string to 2:string to expect 3', () => {
    expect(sum('1', '2')).toBe(3);
  });

  test('add MAX_SAFE_INT to MAX_SAFE_INT to expect Infinity', () => {
    expect(sum(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(
      Infinity
    );
  });

  test('add 0.1 to 0.2 to expect 0.3', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});


describe('test for sum function 2', () => {
  test('add 1 to 2 to expect 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('add 1:string to 2:string to expect 3', () => {
    expect(sum('1', '2')).toBe(3);
  });

  test('add MAX_SAFE_INT to MAX_SAFE_INT to expect Infinity', () => {
    expect(sum(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)).toBe(
      Infinity
    );
  });

  test('add 0.1 to 0.2 to expect 0.3', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});