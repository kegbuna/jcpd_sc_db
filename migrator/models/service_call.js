const Sequelize = require('sequelize');

const tableName = 'service_calls';

const config = {
  timestamps: true,
  createdAt: 'created',
  updatedAt: 'updated'
};

const model = {
  "event_number": {
    type: Sequelize.DataTypes.TEXT,
    primaryKey: true
  },
  "district": Sequelize.DataTypes.TEXT,
  "time_received": Sequelize.DataTypes.DATE,
  "shift": Sequelize.DataTypes.INTEGER,
  "time_dispatched": Sequelize.DataTypes.DATE,
  "time_arrived": {
    type: Sequelize.DataTypes.DATE,
  },
  "callcode": Sequelize.DataTypes.TEXT,
  "call_code_description": Sequelize.DataTypes.TEXT,
  "call_type": Sequelize.DataTypes.TEXT,
  "priority": Sequelize.DataTypes.INTEGER,
  "unit_id": {
    type: Sequelize.DataTypes.TEXT,
    primaryKey: true
  },
  "is_primary": Sequelize.DataTypes.BOOLEAN,
  "address": Sequelize.DataTypes.TEXT,
  "city": Sequelize.DataTypes.TEXT,
  "latitude": Sequelize.DataTypes.FLOAT,
  "longitude": Sequelize.DataTypes.FLOAT,
  "geo_count": Sequelize.DataTypes.INTEGER,
  "geo_error": Sequelize.DataTypes.TEXT
};

module.exports = {tableName, config, model};