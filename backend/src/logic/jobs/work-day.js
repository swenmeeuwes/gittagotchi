const schedule = require('node-schedule');

let weekdayRule = new schedule.RecurrenceRule();
weekdayRule.dayOfWeek = [0, new schedule.Range(1, 5)];
weekdayRule.hour = 9;
weekdayRule.minute = 30;

module.exports = schedule.scheduleJob(weekdayRule, () => { });