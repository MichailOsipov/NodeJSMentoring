const {map} = require('lodash');

module.exports.csvToJson = csv => {
    const [first, ...lines] = csv.split('\n');
    const header = first.split(',');
    const res = [];
    return JSON.stringify(map(lines, line => lineToObject(header, line)));
};

function lineToObject(header, line) {
    const obj = {};
    const objAttributes = line.split(',');
    map(objAttributes, (attr, i) => {
        const key = header[i];
        if (key) {
            obj[key] = attr;
        }
    });
    return obj;
};
