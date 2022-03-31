import { formatDate, formatMoney } from '..';

describe('utilities', () => {
  describe('formatDate', () => {
    it('returns the correct date', () => {
      expect(formatDate(new Date('2021-03-24'))).toBe('3-24-2021');
      expect(formatDate(new Date('2022-02-27'))).toBe('2-27-2022');
      expect(formatDate(new Date('2022-01-01'))).toBe('1-1-2022');
      expect(formatDate(new Date('2021-12-31'))).toBe('12-31-2021');
      expect(formatDate(new Date('2006-12-05'))).toBe('12-5-2006');
    });
  });

  describe('formatMoney', () => {
    it('formats a positive amount correctly', () => {
      expect(formatMoney(20.34)).toBe('$20.34');
      expect(formatMoney(7.56)).toBe('$7.56');
      expect(formatMoney(543.21)).toBe('$543.21');
    });
    it('formats a negative amount correctly', () => {
      expect(formatMoney(-20.34)).toBe('-$20.34');
      expect(formatMoney(-7.56)).toBe('-$7.56');
      expect(formatMoney(-543.21)).toBe('-$543.21');
    });
    it('formats an amount with one cent digit correctly', () => {
      expect(formatMoney(20.3)).toBe('$20.30');
      expect(formatMoney(-7.5)).toBe('-$7.50');
      expect(formatMoney(543.2)).toBe('$543.20');
    });
    it('formats an amount with no cents correctly', () => {
      expect(formatMoney(20)).toBe('$20.00');
      expect(formatMoney(7)).toBe('$7.00');
      expect(formatMoney(-543)).toBe('-$543.00');
    });
    it('formats large amounts correctly', () => {
      expect(formatMoney(200000)).toBe('$200,000.00');
      expect(formatMoney(-123456.78)).toBe('-$123,456.78');
      expect(formatMoney(5245.3)).toBe('$5,245.30');
    });
  });
});
