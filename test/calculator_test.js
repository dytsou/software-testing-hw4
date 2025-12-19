const assert = require('assert');
const { test } = require('node:test');

const Calculator = require('../src/calculator');

// ============================================
// 1. Input Validation Tests (Boundary Testing)
// ============================================

// Month1 validation - boundary conditions to catch <, >, <=, >= mutations
test('month1 validation: should throw error for month1 = 0', () => {
    assert.throws(() => {
        Calculator.main(0, 1, 2, 1, 2024);
    }, /invalid month1/);
});

test('month1 validation: should accept month1 = 1 (lower boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 2, 1, 2024);
    });
});

test('month1 validation: should accept month1 = 12 (upper boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(12, 1, 12, 2, 2024);
    });
});

test('month1 validation: should throw error for month1 = 13', () => {
    assert.throws(() => {
        Calculator.main(13, 1, 12, 1, 2024);
    }, /invalid month1/);
});

test('month1 validation: should throw error for month1 < 1 (negative)', () => {
    assert.throws(() => {
        Calculator.main(-1, 1, 2, 1, 2024);
    }, /invalid month1/);
});

// Month2 validation - boundary conditions
test('month2 validation: should throw error for month2 = 0', () => {
    assert.throws(() => {
        Calculator.main(1, 1, 0, 1, 2024);
    }, /invalid month2/);
});

test('month2 validation: should accept month2 = 1 (lower boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 1, 2, 2024);
    });
});

test('month2 validation: should accept month2 = 12 (upper boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 12, 1, 2024);
    });
});

test('month2 validation: should throw error for month2 = 13', () => {
    assert.throws(() => {
        Calculator.main(1, 1, 13, 1, 2024);
    }, /invalid month2/);
});

// Day1 validation - boundary conditions
test('day1 validation: should throw error for day1 = 0', () => {
    assert.throws(() => {
        Calculator.main(1, 0, 2, 1, 2024);
    }, /invalid day1/);
});

test('day1 validation: should accept day1 = 1 (lower boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 2, 1, 2024);
    });
});

test('day1 validation: should accept day1 = 31 (upper boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 31, 2, 1, 2024);
    });
});

test('day1 validation: should throw error for day1 = 32', () => {
    assert.throws(() => {
        Calculator.main(1, 32, 2, 1, 2024);
    }, /invalid day1/);
});

// Day2 validation - boundary conditions
test('day2 validation: should throw error for day2 = 0', () => {
    assert.throws(() => {
        Calculator.main(1, 1, 2, 0, 2024);
    }, /invalid day2/);
});

test('day2 validation: should accept day2 = 1 (lower boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 1, 1, 2024);
    });
});

test('day2 validation: should accept day2 = 31 (upper boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 2, 31, 2024);
    });
});

test('day2 validation: should throw error for day2 = 32', () => {
    assert.throws(() => {
        Calculator.main(1, 1, 2, 32, 2024);
    }, /invalid day2/);
});

// Year validation - boundary conditions
test('year validation: should throw error for year = 0', () => {
    assert.throws(() => {
        Calculator.main(1, 1, 2, 1, 0);
    }, /invalid year/);
});

test('year validation: should accept year = 1 (lower boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 2, 1, 1);
    });
});

test('year validation: should accept year = 10000 (upper boundary)', () => {
    assert.doesNotThrow(() => {
        Calculator.main(1, 1, 2, 1, 10000);
    });
});

test('year validation: should throw error for year = 10001', () => {
    assert.throws(() => {
        Calculator.main(1, 1, 2, 1, 10001);
    }, /invalid year/);
});

// Month comparison validation
test('month comparison: should throw error when month1 > month2', () => {
    assert.throws(() => {
        Calculator.main(3, 1, 2, 1, 2024);
    }, /month1 must be less than month2/);
});

test('month comparison: should throw error when month1 === month2 and day1 > day2', () => {
    assert.throws(() => {
        Calculator.main(3, 15, 3, 10, 2024);
    }, /day1 must be less than day2 if month1 is equal to month2/);
});

test('month comparison: should accept when month1 === month2 and day1 < day2', () => {
    assert.doesNotThrow(() => {
        Calculator.main(3, 10, 3, 15, 2024);
    });
});

test('month comparison: should accept when month1 === month2 and day1 === day2', () => {
    const result = Calculator.main(3, 15, 3, 15, 2024);
    assert.strictEqual(result, 0);
});

// ============================================
// 2. Date Calculation Tests
// ============================================

// Same month calculations
test('same month: day difference of 1', () => {
    const result = Calculator.main(3, 10, 3, 11, 2024);
    assert.strictEqual(result, 1);
});

test('same month: day difference of 5', () => {
    const result = Calculator.main(3, 10, 3, 15, 2024);
    assert.strictEqual(result, 5);
});

test('same month: day difference of 30', () => {
    const result = Calculator.main(1, 1, 1, 31, 2024);
    assert.strictEqual(result, 30);
});

test('same month: zero days (same day)', () => {
    const result = Calculator.main(6, 15, 6, 15, 2024);
    assert.strictEqual(result, 0);
});

// Adjacent months calculations
test('adjacent months: January to February', () => {
    const result = Calculator.main(1, 31, 2, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: February to March (non-leap year)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2023);
    assert.strictEqual(result, 1);
});

test('adjacent months: February to March (leap year)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2024);
    assert.strictEqual(result, 2);
});

test('adjacent months: March to April', () => {
    const result = Calculator.main(3, 31, 4, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: April to May', () => {
    const result = Calculator.main(4, 30, 5, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: May to June', () => {
    const result = Calculator.main(5, 31, 6, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: June to July', () => {
    const result = Calculator.main(6, 30, 7, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: July to August', () => {
    const result = Calculator.main(7, 31, 8, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: August to September', () => {
    const result = Calculator.main(8, 31, 9, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: September to October', () => {
    const result = Calculator.main(9, 30, 10, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: October to November', () => {
    const result = Calculator.main(10, 31, 11, 1, 2024);
    assert.strictEqual(result, 1);
});

test('adjacent months: November to December', () => {
    const result = Calculator.main(11, 30, 12, 1, 2024);
    assert.strictEqual(result, 1);
});

// Multiple months calculations
test('multiple months: January to March', () => {
    const result = Calculator.main(1, 1, 3, 1, 2024);
    assert.strictEqual(result, 60);
});

test('multiple months: January to March (non-leap year)', () => {
    const result = Calculator.main(1, 1, 3, 1, 2023);
    assert.strictEqual(result, 59);
});

test('multiple months: March to June', () => {
    const result = Calculator.main(3, 15, 6, 15, 2024);
    assert.strictEqual(result, 92);
});

test('multiple months: January to December', () => {
    const result = Calculator.main(1, 1, 12, 31, 2024);
    assert.strictEqual(result, 365);
});

test('multiple months: January to December (leap year)', () => {
    const result = Calculator.main(1, 1, 12, 31, 2024);
    assert.strictEqual(result, 365);
});

test('multiple months: February to May', () => {
    const result = Calculator.main(2, 1, 5, 31, 2024);
    assert.strictEqual(result, 120);
});

test('multiple months: June to September', () => {
    const result = Calculator.main(6, 1, 9, 30, 2024);
    assert.strictEqual(result, 121);
});

// Edge cases for month calculations
test('edge case: first day of month to first day of next month', () => {
    const result = Calculator.main(1, 1, 2, 1, 2024);
    assert.strictEqual(result, 31);
});

test('edge case: last day of month to last day of next month', () => {
    const result = Calculator.main(1, 31, 2, 28, 2024);
    assert.strictEqual(result, 28);
});

test('edge case: spanning multiple months with partial days', () => {
    const result = Calculator.main(1, 15, 4, 15, 2024);
    assert.strictEqual(result, 91);
});

// ============================================
// 3. Leap Year Tests
// ============================================

// Leap year detection - year % 4 === 0
test('leap year: year divisible by 4 (2024)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2024);
    assert.strictEqual(result, 2);
});

test('leap year: year divisible by 4 (2020)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2020);
    assert.strictEqual(result, 2);
});

test('leap year: year divisible by 4 (2000)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2000);
    assert.strictEqual(result, 2);
});

// Non-leap year - year % 4 !== 0
test('non-leap year: year not divisible by 4 (2023)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2023);
    assert.strictEqual(result, 1);
});

test('non-leap year: year not divisible by 4 (2021)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2021);
    assert.strictEqual(result, 1);
});

// Century years - year % 100 !== 0
test('leap year: century year divisible by 400 (2000)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2000);
    assert.strictEqual(result, 2);
});

test('non-leap year: century year not divisible by 400 (1900)', () => {
    const result = Calculator.main(2, 28, 3, 1, 1900);
    assert.strictEqual(result, 1);
});

test('non-leap year: century year not divisible by 400 (2100)', () => {
    const result = Calculator.main(2, 28, 3, 1, 2100);
    assert.strictEqual(result, 1);
});

// Leap year calculations spanning February
test('leap year: January to March including Feb 29', () => {
    const result = Calculator.main(1, 31, 3, 1, 2024);
    assert.strictEqual(result, 30);
});

test('non-leap year: January to March with Feb 28', () => {
    const result = Calculator.main(1, 31, 3, 1, 2023);
    assert.strictEqual(result, 29);
});

test('leap year: full February month', () => {
    const result = Calculator.main(2, 1, 2, 29, 2024);
    assert.strictEqual(result, 28);
});

test('non-leap year: full February month', () => {
    const result = Calculator.main(2, 1, 2, 28, 2023);
    assert.strictEqual(result, 27);
});

// ============================================
// 4. Edge Cases
// ============================================

// First day of month
test('edge case: starting on first day of month', () => {
    const result = Calculator.main(3, 1, 3, 15, 2024);
    assert.strictEqual(result, 14);
});

test('edge case: ending on first day of month', () => {
    const result = Calculator.main(2, 15, 3, 1, 2024);
    assert.strictEqual(result, 15);
});

// Last day of month
test('edge case: starting on last day of month', () => {
    const result = Calculator.main(1, 31, 2, 5, 2024);
    assert.strictEqual(result, 5);
});

test('edge case: ending on last day of month', () => {
    const result = Calculator.main(1, 15, 1, 31, 2024);
    assert.strictEqual(result, 16);
});

// Single day difference
test('edge case: single day difference same month', () => {
    const result = Calculator.main(6, 10, 6, 11, 2024);
    assert.strictEqual(result, 1);
});

test('edge case: single day difference across months', () => {
    const result = Calculator.main(1, 31, 2, 1, 2024);
    assert.strictEqual(result, 1);
});

// Month transitions
test('edge case: transition from 30-day month to 31-day month', () => {
    const result = Calculator.main(4, 30, 5, 1, 2024);
    assert.strictEqual(result, 1);
});

test('edge case: transition from 31-day month to 30-day month', () => {
    const result = Calculator.main(3, 31, 4, 1, 2024);
    assert.strictEqual(result, 1);
});

// Additional boundary tests for operators
test('boundary: month1 exactly at lower bound with day validation', () => {
    const result = Calculator.main(1, 1, 1, 31, 2024);
    assert.strictEqual(result, 30);
});

test('boundary: month1 exactly at upper bound', () => {
    const result = Calculator.main(12, 1, 12, 31, 2024);
    assert.strictEqual(result, 30);
});

test('boundary: month2 exactly at lower bound', () => {
    const result = Calculator.main(1, 1, 1, 15, 2024);
    assert.strictEqual(result, 14);
});

test('boundary: month2 exactly at upper bound', () => {
    const result = Calculator.main(11, 1, 12, 15, 2024);
    assert.strictEqual(result, 44);
});

test('boundary: year at lower bound (year = 1)', () => {
    const result = Calculator.main(1, 1, 1, 15, 1);
    assert.strictEqual(result, 14);
});

test('boundary: year at upper bound (year = 10000)', () => {
    const result = Calculator.main(1, 1, 1, 15, 10000);
    assert.strictEqual(result, 14);
});
