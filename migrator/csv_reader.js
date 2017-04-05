const fs = require('fs');
const Rx = require('rxjs/Rx');
const csv = require('csv');
const log4js = require('log4js');

const toSnakeCase = require('lodash').snakeCase;

const logger = log4js.getLogger('CSV Reader');

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

    logger.setLevel(this.config.logLevel || 'warn');
  }

  /**
   * Reads in a file and returns a dictionary with the results
   * @returns {Subject<object>} An observable with the results of the file reading
   */
  getRecords() {

    const recordSubject = new Rx.Subject();
    const filePath = this.config.csvPath;

    const parser = csv.parse({
      auto_parse: true,
      // setting columns manually because the library is counting an empty column in the header
      // TODO:: Figure out why empty header is being parsed from records and restore dynamic column generation
      // Consider usage of 'columns' callback to clean the first row results
      /**
       * Removes extra columns and
       * @param {string[]} row
       */
      columns: function (row) {
        //if the last column is empty just drop it
        //there might be extra columns from a trailing comma
        if (row[row.length - 1] === '') {
          row.splice(row.length-1);
        }

        const result = row.map((value) => {
          return toSnakeCase(value);
        });

        logger.debug(result);
        logger.debug(`Using the following columns: ${result.join(', ')}`);

        return result;
      },
      from: 2,
      relax_column_count: true
    });

    const buffer = [];

    //on end just provide whatever is left
    parser.on('end', function () {
      recordSubject.next(buffer);
    });

    parser.on('data', (chunk) => {
      buffer.push(chunk);
      if (buffer.length === this.config.chunkSize) {
        recordSubject.next(buffer.splice(0, this.config.chunkSize));
      }
    });

    parser.on('error', err => {
      console.error(err);
    });


    const file = fs.createReadStream(filePath, this.config.fileEncoding || 'utf8');

    file.on('data', (chunk) => {
      parser.write(chunk);
    });
    file.on('end', () => {
      recordSubject.next(buffer);
    });

    return recordSubject;
  }
}

module.exports = CSVReader;