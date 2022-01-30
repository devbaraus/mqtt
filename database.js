const fs = require('fs');
const path = require('path')

class Database {
    constructor() {
        this.dbFile = path.join(__dirname, 'db.json');
        this.init();
    }
    init() {
        if (fs.existsSync(this.dbFile)) {
            this.data = JSON.parse(fs.readFileSync(this.dbFile))
        } else {
            this.data = []
            this.save()
        }
    }
    push(data) {
        this.data.push(data);
        this.save();
    }
    save() {
        fs.writeFileSync(this.dbFile, JSON.stringify(this.data))
    }
}


module.exports = {
    Database
}