# CodeForJC JCPD Service Call Database

## Technologies
* Node
* Sequelize
* PostgresSQL


## Get Started
### Before attempting to migrate records
* Any CSVs obtained from the Jersey City Data Portal should have their columns changed to a snake_case format:
```json
[
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
]
```
### Create a DB configuration file
In the `config` directory, place a file named `db.json`. Example:
```json
    {
      "host": "localhost",
      "dialect": "postgres",
      "database": "public",
      "port": 5432,
      "user": "postgres",
      "password": "<password>"
    }
```
This will enable the main file to provide the DBWriter class with configuration
### Create a CSV Reader configuration file
In the `config` directory, place a file named `reader.json`. Example: 
```json
    {
      "csvPath": "./migrator/data/jcpd_calls.csv"
    }
```
The `csvPath` should point to the location of the exported CSV file
### Execute the script
To start it up, run `node index.js` in the `migrator` directory.