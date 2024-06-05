"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateHoursFromNow = exports.getHourGap = void 0;
/**
 *
 * @param date1
 * @param date2
 * @returns Negative hour number if date2 is to the past, Other wise gives Positive hour
 */
function getHourGap(date1, date2) {
    const gapMilliseconds = date1.getTime() - date2.getTime();
    const gapHours = Math.round(gapMilliseconds / (1000 * 60 * 60));
    return gapHours;
}
exports.getHourGap = getHourGap;
function dateHoursFromNow(hours) {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date;
}
exports.dateHoursFromNow = dateHoursFromNow;
