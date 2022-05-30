export interface timeTrackingData {
  title: string,
  timeframes: {
    [key: string]: {
      current: number,
      previous: number
    }
  }
}

export interface timeDataSort {
  title: string,
  current: number,
  previous: number
}