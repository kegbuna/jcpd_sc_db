const fs = require('fs');
const Rx = require('rxjs/Rx');
const csv = require('csv');

/**
 * Reads in CSVs
 */
class CSVReader {

  /**
   * Creates instanceof CSVReader
   * @param {object} [config] - A default path
   */
  constructor(config) {
    this.config = config || {};
    if (config && config.csvPath) {
      if (typeof config.csvPath !== 'string') {
        throw new Error('Path needs to be a string');
      }

      this.defaultPath = config.csvPath;
    }
  }

  /**
   * Reads in a file and returns a dictionary with the results
   * @param {string} [path] - Tell us where to look. If this instance was constructed with a path, no need to provide another.
   * @returns {ReplaySubject<object>} An observable with the results of the file reading
   */
  getRecords(path) {
    if (!path && !this.defaultPath) {
      throw new Error('no path provided and no default set');
    }
    const recordSubject = new Rx.Subject();
    const filePath = path || this.defaultPath;

    const parser = csv.parse({
      auto_parse: true,
      auto_parse_date: true,
      // setting columns manually because the library is counting an empty column in the header
      // TODO:: Figure out why empty header is being parsed from records and restore dynamic column generation
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


    parser.on('readable', () => {
      let data;
      while (data = parser.read()) {
        recordSubject.next(data);
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