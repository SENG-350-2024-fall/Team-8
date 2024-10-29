/*
  Author: Reid Williamson

  This is the logger configuration file. If you want to change general behaviours of the logger, this is where you would do it.
*/
import LoggerClient from '../clients/LoggerClient';

export default class Logger {
    static levels = {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
    };

    constructor(initialLevel = 'info') {
        this.currentLevel = Logger.levels[initialLevel]; // Default log level
    }

    // Method to set the current logging level
    setLevel(level) {
        if (Logger.levels[level] !== undefined) {
            this.currentLevel = Logger.levels[level];
        } else {
            console.error(`Invalid log level: ${level}`);
        }
    }

    // Method to create a log entry
    createLog(level, message) {
        if (Logger.levels[level] <= this.currentLevel) {
            // Only log if the level is equal or above the current level
            const timestamp = new Date().toISOString(); // Get the current timestamp
            const date = new Date().toLocaleDateString(); // Get the current date

            // Create a log object
            const logEntry = {
                level: level,
                timestamp: timestamp,
                date: date,
                message: this.formatMessage(message),
            };

            this.logToClient(logEntry);
            this.logToConsole(logEntry);
        }
    }

    formatMessage(message) {
        if (message instanceof Error) {
            return JSON.stringify({
                name: message.name,
                message: message.message,
                stack: message.stack,
            });
        }
        return typeof message === 'object' ? JSON.stringify(message) : message; // Convert to JSON string if it's an object
    }

    logToConsole(logEntry) {
        console.log(JSON.stringify(logEntry));
    }

    logToClient(logEntry) {
        LoggerClient.post('logs', logEntry);
    }

    info(message) {
        this.createLog('info', message);
    }

    warn(message) {
        this.createLog('warn', message);
    }

    error(message) {
        this.createLog('error', message);
    }

    debug(message) {
        this.createLog('debug', message);
    }

    logToConsole(logEntry) {
        console.log(logEntry);
    }
}
