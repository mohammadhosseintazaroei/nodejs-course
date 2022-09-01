const EventEmitter = require('events')
class UserActivity extends EventEmitter {
    constructor(username) {
        super()
        this.username = username;
    }
    sleep() {
        // do something
        this.emit("sleep", this.username)
    }
    wakeup() {
        this.emit("wakeup", this.username)

    }
    study() {
        this.emit("study", this.username)

    }
    eating() {
        this.emit("eating", this.username)

    }
    walking() {
        this.emit("walking", this.username)

    }
    work() {
        this.emit("work", this.username)

    }

}
module.exports = {
    UserActivity
}