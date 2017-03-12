const fs = require('fs');
const Rx = require('rxjs/Rx');
const csv = require('csv');

/**
 * Reads in CSVs
 */
class CSVReader {

  /**
   * Creates instanceof CSVReader
   * @param {object} config - A config object
   * @param {string} config.csvPath - The path to the csv file
   * @param {string} config.chunkSize - max number of records to return at a time
   */
  constructor(config) {
    this.config = config || {};
    if (!config.csvPath) {
        throw new Error('Need a value for csvPath');
    }
  }

  /**
   * Reads in a file and returns a dictionary with the results
   * @returns {ReplaySubject<object>} An observable with the results of the file reading
   */
  getRecords() {

    const recordSubject = new Rx.Subject();
    const filePath = this.config.csvPath;

    const parser = csv.parse({
      auto_parse: true,
      // setting columns manually because the library is counting an empty column in the header
      // TODO:: Figure out why empty header is being parsed from records and restore dynamic column generation
      // Consider usage of 'columns' callback to clean the first row results
      columns: [
        "event_number",
        "district",
        "time_received",
        "shift",
        "time_dispatched",
        "time_arrived",
        "callcode",
        "call_code_description",
        "call_type",
        "priority",
        "unit_id",
        "is_primary",
        "address",
        "city",
        "latitude",
        "longitude",
        "geo_count",
        "geo_error"
      ],
      from: 2,
      relax_column_count: true
    });

    const buffer = [];

    //on end just provide whatever is left
    parser.on('end', function () {
      recordSubject.next(buffer);
    });

    parser.on('readable', () => {
      let data;
      while (data = parser.read()) {
        buffer.push(data);
        if (buffer.length === this.config.chunkSize) {
          recordSubject.next(buffer.splice(0, this.config.chunkSize));
        }
      }
    });

    parser.on('error', err => {
      console.error(err);
    });


    const file = fs.createReadStream(filePath, this.config.fileEncoding || 'utf8');

    file.on('data', (chunk) => {
      parser.write(chunk);
    });

    return recordSubject;
  }
}

module.exports = CSVReader;