const {map} = require('lodash');
const DirWatcher = require('./modules/dirwatcher');
const Importer = require('./modules/importer');
const Writer = require('./modules/writer');
const {csvToJson} = require('./utils/csv-to-json');

const STORAGE_FROM = 'src/data-csv';
const STORAGE_TO = 'src/data-json';

const dirwatcher = new DirWatcher();
const importer = new Importer();
const writer = new Writer();

dirwatcher.watch(STORAGE_FROM, 1500);
dirwatcher.on('change', async files => {
    const csvFiles = await importer.import(STORAGE_FROM, files);
    const jsonFiles = map(csvFiles, ({name, data}) => ({
        name,
        data: csvToJson(data)
    }));
    writer.write(STORAGE_TO, jsonFiles);
});
