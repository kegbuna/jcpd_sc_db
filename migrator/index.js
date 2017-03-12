const CSVReader = require('./csv_reader');
const DBWriter = require('./db_writer');
const dbConfig = require('./config/db.json');
const readerConfig = require('./config/reader.json');

const csvReader = new CSVReader(readerConfig);
const dbWriter = new DBWriter(dbConfig);

const serviceCallDBConfig = require('./models/service_call');

csvReader.getRecords().subscribe((records) => {
  dbWriter.writeRecords(serviceCallDBConfig, records);
});