
export interface DataPoint {
  date: string;
  value: number;
}

/**
 * calculate simple moving average using `pointsToAverage` points from `values`
 * The first data point in the SMA is the average value from the first
 * `pointsToAverage` points. For each successive point, we drop the
 * first value from the sum and add the next value
 *
 * @export
 * @param {DataPoint[]} values
 * @param {number} pointsToAverage
 * @return {*}  {DataPoint[]}
 */
export function calculateSimpleMovingAverage(values: DataPoint[], pointsToAverage: number): DataPoint[] {
  if (pointsToAverage > values.length) {
    return [];
  }
  
  const result: DataPoint[] = [];
  
  let sum = 0;
  let firstIndex = 0;
  
  for (let i = 0; i < values.length; i++) {
    const current = values[i];
    sum += current.value;
    
    if (i >= pointsToAverage - 1) {
      result.push({
        date: current.date,
        value: sum / pointsToAverage
      });
      
      const first = values[firstIndex];
      sum -= first.value;
      
      firstIndex++;
    }
  }
  
  return result;
}

/**
 * Calculate the exponential moving average using the following:
 * multiplier = 2 / (pointsToAverage + 1)
 * EMA = Closing price x multiplier + EMA (previous day) x (1-multiplier)
 * 
 * Each EMA data point is calculated using the value from the previous day
 * The first EMA data point is estimated using the SMA value from the previous day
 *
 * @export
 * @param {DataPoint[]} values
 * @param {number} pointsToAverage
 * @return {*}  {DataPoint[]}
 */
export function calculateExponentialMovingAverage(values: DataPoint[], pointsToAverage: number): DataPoint[] {
  if (pointsToAverage > values.length) {
    return [];
  }
  
  const firstSMA = calculateSimpleMovingAverage(values, pointsToAverage)[0];
  const multiplier = 2 / (pointsToAverage + 1);
  
  const result: DataPoint[] = [];
  
  let lastEMA = firstSMA.value;
  
  for (let i = pointsToAverage; i++; i < values.length) {
    const current = values[i];
    
    lastEMA = current.value * multiplier + lastEMA * (1 - multiplier);
    
    result.push({
      date: current.date,
      value: lastEMA
    });
  }
  
  return result;
}
