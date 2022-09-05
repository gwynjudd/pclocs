import { calculateSimpleMovingAverage } from '.';

describe('simple moving average', () => {
  it('should calculate the result correctly with simple values', () => {
    const values = [
      { date: '2022-01-01', value: 5 },
      { date: '2022-01-02', value: 10 },
      { date: '2022-01-03', value: 15 },
      { date: '2022-01-04', value: 20 },
      { date: '2022-01-05', value: 10 },
      { date: '2022-01-06', value: 6 },
      { date: '2022-01-07', value: 11 },
    ];
    expect(calculateSimpleMovingAverage(values, 3)).toEqual([
      { date: '2022-01-03', value: 10 },
      { date: '2022-01-04', value: 15 },
      { date: '2022-01-05', value: 15 },
      { date: '2022-01-06', value: 12 },
      { date: '2022-01-07', value: 9 },
    ]);
  });

  it('should return an empty array if there is not enough data', () => {
    const values = [
      { date: '2022-01-01', value: 2 },
      { date: '2022-01-02', value: 4 },
      { date: '2022-01-03', value: 6 },
    ];
    expect(calculateSimpleMovingAverage(values, 5)).toEqual([]);
  });

  it('should maintain at least 5 decimal places of precision', () => {
    const values = [
      { date: '2022-01-01', value: 1 },
      { date: '2022-01-02', value: 2 },
      { date: '2022-01-03', value: 5 },
      { date: '2022-01-04', value: 4 },
    ];
    const smaValues = calculateSimpleMovingAverage(values, 3);
    expect(smaValues[0]?.value).toBeCloseTo(2.66667, 5);
    expect(smaValues[1]?.value).toBeCloseTo(3.66667, 5);
  });

  it('should return the correct result with negative numbers', () => {
    const values = [
      { date: '2022-01-01', value: -5 },
      { date: '2022-01-02', value: 5 },
      { date: '2022-01-03', value: -11 },
    ];
    expect(calculateSimpleMovingAverage(values, 2)).toEqual([
      { date: '2022-01-02', value: 0 },
      { date: '2022-01-03', value: -3 },
    ]);
  });

  it('should return the correct result with decimals inputs', () => {
    const values = [
      { date: '2022-01-01', value: 1.12356 },
      { date: '2022-01-02', value: 2.41206 },
      { date: '2022-01-03', value: 5.44536 },
    ];
    const smaValues = calculateSimpleMovingAverage(values, 3);
    expect(smaValues[0]?.value).toBeCloseTo(2.99366);
  });

});
