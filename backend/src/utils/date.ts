/**
 *
 * @param date1
 * @param date2
 * @returns Negative hour number if date2 is to the past, Other wise gives Positive hour
 */
export function getHourGap(date1: Date, date2: Date) {
  const gapMilliseconds = date1.getTime() - date2.getTime();
  const gapHours = Math.round(gapMilliseconds / (1000 * 60 * 60));
  return gapHours;
}

export function dateHoursFromNow(hours: number) {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date;
}
