const {map} = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const readFile = Promise.promisify(fs.readFile);

class Importer {
    import(path, files) {
        return Promise.all(map(files, file =>
            readFile(`${path}/${file}`, 'utf8')
            .then(data => ({name: file, data}))
        ));
    }
}

module.exports = Importer;
