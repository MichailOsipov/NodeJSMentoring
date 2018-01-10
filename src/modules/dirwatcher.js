const {difference} = require('lodash')
const Promise = require('bluebird');

const EventEmitter = require('events');
const fs = require('fs');

const readdir = Promise.promisify(fs.readdir);

class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.directories = {};
    }
    async watch(path, delay) {
        if (this.directories[path]) {
            console.log(`directory ${path} is already on watch`);
            return;
        }
        let files;
        try {
            files = await readdir(path);
        } catch(e) {
            console.log(e);
        }

        this.interval = setInterval(async () => {
            try {
                const currFiles = await readdir(path);
                const newFiles = difference(currFiles, files);
                files = currFiles;
                if (newFiles.length) {
                    this.emit('change', newFiles);
                }
            } catch (e) {
                console.log(e);
            }
        }, delay);
    }
}

module.exports = DirWatcher;
