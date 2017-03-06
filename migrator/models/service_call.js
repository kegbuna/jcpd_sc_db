const Sequelize = require('sequelize');

const tableName = 'service_calls';

const config = {
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'updated'
};

const model = {
  "event_number": Sequelize.STRING,
  "district": Sequelize.STRING,
  "time_received": Sequelize.DATE,
  "shift": Sequelize.INTEGER,
  "time_dispatched": Sequelize.DATE,
  "time_arrived": Sequelize.DATE,
  "callcode": Sequelize.STRING,
  "call_code_description": Sequelize.STRING,
  "call_type": Sequelize.STRING,
  "priority": Sequelize.INTEGER,
  "unit_id": Sequelize.STRING,
  "is_primary": Sequelize.BOOLEAN,
  "address": Sequelize.STRING,
  "city": Sequelize.STRING,
  "latitude": Sequelize.FLOAT,
  "longitude": Sequelize.FLOAT,
  "geo_count": Sequelize.INTEGER,
  "geo_error": Sequelize.STRING
};

module.exports = {tableName, config, model};