/**
 * Daily statistics data transfer object
 * @property {string} date - Date in ISO format
 * @property {number} count - Number of users created on this date
 */
export interface DailyStatsDto {
  date: string;
  count: number;
}
