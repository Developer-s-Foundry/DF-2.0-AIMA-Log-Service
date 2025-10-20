

export const parseTimestamp = (timestamp: string, minutes: number) => {
   const newTimestamp = new Date(timestamp)
    return newTimestamp.getTime() + (minutes * 60 * 1000)
}

