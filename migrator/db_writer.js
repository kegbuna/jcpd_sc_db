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
  }

  /**
   * Writes a record to the database
   * @param {string} table - Table name
   * @param {Sequelize.Model} schema - The schema of the record
   * @param {object} record - The record to be inserted
   */
  writeRecord(table, schema, record) {
    const newRecord = this.sequelize.define(table, schema);

    this.sequelize.sync().then(() => {
      newRecord.create(record)
        .then((submitted) => {
          console.log(submitted);
        });
    }, err => {
      console.error(err);
    });
  }
}

module.exports = DBWriter;