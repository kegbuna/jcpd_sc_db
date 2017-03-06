const Sequelize = require('sequelize');

/**
 * Responsible for writing new records to the database
 */
class DBWriter {
  constructor(dbConfig) {
    if (!dbConfig) {
      throw new Error('Need db configuration information');
    }

    this.sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect
    });

    this.sequelize.sync().then(() => {
      console.info('DB Connection initialized');
    });
  }

  /**
   * Writes a record to the database
   * @param {object} recordConfig - An object containing values used to populate db
   * @param {string} recordConfig.tableName - the name of the table to populate
   * @param {Sequelize.Model} recordConfig.model - The schema
   * @param {object} recordConfig.config = sequelize configuration data
   * @param {object} record - The record to be inserted
   */
  writeRecord(recordConfig, record) {
    const newRecord = this.sequelize.define(recordConfig.tableName, recordConfig.model, recordConfig.config);

    newRecord.create(record)
      .then((submitted) => {
        console.info(`Submitted new record for event number: ${record.event_number}`);
      }, err => {
        console.error(err);
      });
  }
}

module.exports = DBWriter;