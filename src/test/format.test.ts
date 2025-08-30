import { describe, expect, it } from 'vitest';
import { formatHourlyRate, formatSalary, initials } from '@/lib/format';

describe('format helpers', () => {
  it('formats salary range correctly', () => {
    expect(formatSalary(30000, 60000)).toBe('₹30k–₹60k / mo');
    expect(formatSalary(100000, 200000)).toBe('₹1L–₹2L / mo');
  });

  it('formats hourly rate', () => {
    expect(formatHourlyRate(450)).toBe('₹450/hr');
  });

  it('returns initials for a name', () => {
    expect(initials('Priya Menon')).toBe('PM');
    expect(initials('Arjun')).toBe('A');
  });
});
