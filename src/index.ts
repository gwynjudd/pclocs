
export interface DataPoint {
  date: string;
  value: number;
}

export function calculateSimpleMovingAverage(values: DataPoint[], pointsToAverage: number): DataPoint[] {
  throw new Error('Not implemented');
}

export function calculateExponentialMovingAverage(values: DataPoint[], pointsToAverage: number): DataPoint[] {
  throw new Error('Not implemented');
}
