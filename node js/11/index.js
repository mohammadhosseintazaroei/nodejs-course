const { UserActivity } = require('./EventEmitter')
const mohammadActivity = new UserActivity('fdsafdf')
mohammadActivity.on('sleep', (username) => {
    require('fs').appendFileSync("./mohammad-activity.log", "\nmohammad was sleeped in this time : " + new Date().toLocaleString("fa-IR")+"=>" + username)
});
mohammadActivity.on('wakeup', () => {
    require('fs').appendFileSync("./mohammad-activity.log", "\nmohammad was wakeuped in this time : " + new Date().toLocaleString("fa-IR"))
});
mohammadActivity.on('study', () => {
    require('fs').appendFileSync("./mohammad-activity.log", "\nmohammad was studyied in this time : " + new Date().toLocaleString("fa-IR"))
});

mohammadActivity.sleep();
mohammadActivity.study();
