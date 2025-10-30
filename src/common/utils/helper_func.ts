

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
