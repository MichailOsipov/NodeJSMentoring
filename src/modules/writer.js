const {map} = require('lodash');
const fs = require('fs');
const Promise = require('bluebird');

const writeFile = Promise.promisify(fs.writeFile);

class Writer {
    write(path, files) {
        return Promise.all(map(files, ({name, data}) => {
            writeFile(`${path}/${name}.json`, data);
        }))
    }
}

module.exports = Writer;
