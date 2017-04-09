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
  "callcode": {
    type: Sequelize.DataTypes.TEXT,
    set: function (val) {
      this.setDataValue('callcode', val);
      this.setDataValue('callcode_type', val[0]);
      this.setDataValue('callcode_pd_code', val.substring(1, 3))
    }
  },
  "callcode_type": {
    type: Sequelize.DataTypes.TEXT
  },
  "callcode_pd_code": {
    type: Sequelize.DataTypes.INTEGER
  },
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