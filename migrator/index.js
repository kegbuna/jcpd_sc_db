const CSVReader = require('./csv_reader');
const DBWriter = require('./db_writer');
const dbConfig = require('./config/db.json');

const csvReader = new CSVReader('./migrator/data/jcpd_calls_import-3-4-2017-test.csv');
const dbWriter = new DBWriter(dbConfig);

const table = 'service_calls';
const tableSchema = require('./models/service_call');

csvReader.getRecords().subscribe((record) => {
  dbWriter.writeRecord(table, tableSchema, record);
});