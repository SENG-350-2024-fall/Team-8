## Installation and Setup

Run the following command to install project dependencies:

### `npm install`

To simulate a backend, this project uses json-server to serve data from a db.json file. Run the following command on a new console to start the JSON server on port 3001:

### `npx json-server db.json --port 3001`

To create logs outside the console, this project uses another json-server to store logs. To enable saving logs, run the following command on a new console to start the JSON server on port 3002:

### `npx json-server logs.json --port 3002`

To start the triage queue, type the following command on a new console to start the node server (on port 3003):

### `node src/servers/TriageQueueServer.js`

To start the application in development mode, open a new console and run:

### `npm start`
