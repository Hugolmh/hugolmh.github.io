import { describe, it, expect } from 'vitest';
import { calculateAge } from './calculateAge';

describe('calculateAge', () => {
  it('returns correct age for a fixed date', () => {
    const fixedDate = new Date(2024, 5, 1); // June 1, 2024
    expect(calculateAge(fixedDate)).toBe(20);
  });
});
