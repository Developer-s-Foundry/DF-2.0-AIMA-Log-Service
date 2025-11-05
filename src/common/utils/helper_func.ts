import { QueryData, TimeStampData } from "../types/interface"

export const parseTimestamp = (timestamp: string, minutes: number) => {
   const newTimestamp = new Date(timestamp)
    return newTimestamp.getTime() + (minutes * 60 * 1000)
}

export const parseData = (data: any) => {
    return (
        data.metric_name &&  typeof data.metric_name === 'string' &&
        data.project_id &&  typeof data.project_id === 'string' &&
        data.time_stamp && data.time_stamp instanceof Date &&
        data.value &&  typeof data.value === 'number' &&
        data.result_type &&  typeof data.result_type === 'string' &&
        data.app &&  typeof data.app === 'string' &&
        data.instance &&  typeof data.instance=== 'string' &&
        data. job &&  typeof data. job === 'string'
    )
}

const orderedKeys = ['year', 'month', 'day', 'hour', 'minute'] as const;
type TimeKeys = typeof orderedKeys[number];

export function validateTimeQuery(query: Record<TimeKeys, number |undefined >) {
  for (let i = 0; i < orderedKeys.length; i++) {
    const key = orderedKeys[i];
    const nextKeys = orderedKeys.slice(0, i); // keys must be sequential

    if (query[key] && nextKeys.some(k => !query[k])) {
      throw new Error(`${key} cannot be used without ${nextKeys.join(', ')}`);
    }
  }
}


 export function buildTimestamp({
  year,
  month,
  day,
  hour,
  minute
}: TimeStampData) {
  // Fill defaults if missing
  const finalYear = year;
  const finalMonth = (month ?? 1) - 1; // JS months are 0-indexed!
  const finalDay = day ?? 1;
  const finalHour = hour ?? 0;
  const finalMinute = minute ?? 0;

  const date = new Date(finalYear, finalMonth, finalDay, finalHour, finalMinute);
  return date.getTime(); // timestamp in ms
}

// function extractUserData(data: QueryData): Record<string, string | number> {
//   const keysNeeded = ['value', 'result_type', 'metric_name', 'app_name'];
//   const parsedData: Record<string, string | number> = {};

//   for (const key of Object.keys(data)) {
//     if (data && keysNeeded.includes(key)) {
//       parsedData[key] = data[key];
//     }
//   }

//   return parsedData;
// }
