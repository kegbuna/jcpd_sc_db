const Sequelize = require('sequelize');

const tableName = 'service_calls';

const config = {
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'updated'
};

const model = {
  "event_number": Sequelize.TEXT,
  "district": Sequelize.TEXT,
  "time_received": Sequelize.DATE,
  "shift": Sequelize.INTEGER,
  "time_dispatched": Sequelize.DATE,
  "time_arrived": Sequelize.DATE,
  "callcode": Sequelize.TEXT,
  "call_code_description": Sequelize.TEXT,
  "call_type": Sequelize.TEXT,
  "priority": Sequelize.INTEGER,
  "unit_id": Sequelize.TEXT,
  "is_primary": Sequelize.BOOLEAN,
  "address": Sequelize.TEXT,
  "city": Sequelize.TEXT,
  "latitude": Sequelize.FLOAT,
  "longitude": Sequelize.FLOAT,
  "geo_count": Sequelize.INTEGER,
  "geo_error": Sequelize.TEXT
};

module.exports = {tableName, config, model};