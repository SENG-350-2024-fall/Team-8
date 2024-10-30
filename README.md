# SENG 350 - Team 8

## Project Idea

**Medical Information System To Enhance Resources for Emergency Departments - Mister Ed**

Emergency Departments (EDs) are often crowded and overloaded. The Mister Ed system will be designed to help with this situation. People who feel that they need to visit an ED will be able to use Mister Ed to understand the current load of EDs in their area. They will be able to register virtually and undergo a "virtual triage" to determine whether they really should visit the ER or potentially follow another course of action, like going to a regular primary care clinic (GP), taking over-the-counter medication, or contact the nurse/clinician hotline over the phone or Internet. Patients who can safely be triaged virtually but still need to visit the ED can wait from the comfort of their home and will be notified to come in when it is time to see them. Patients who need to be triaged in person are asked to attend but can then return to their homes until it is time to see them.

## Installation and Setup

Run the following command to install project dependencies:

### `npm install`

To simulate a backend, this project uses json-server to serve data from a db.json file. Run the following command on a new console to start the JSON server on port 3001:

### `npx json-server db.json --port 3001`

To create logs outside the console, this project uses another json-server to store logs. To enable saving logs, run the following command on a new console to start the JSON server on port 3002:

### `npx json-server logs.json --port 3002`

To start the application in development mode, open a new console and run:

### `npm start`
