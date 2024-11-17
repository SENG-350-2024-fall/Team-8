/*
  Author: Reid Williamson

  This is a logger implementation that interfaces with the console and LoggerClient to create and send logs.
  You can customize each logger instance to filter out lower levels at construction, or using the setLevel method.
  
*/
import LoggerClient from '../clients/LoggerClient';

export default class Logger {
    #currentLevel;
    static #levels = {
        0: 'error',
        1: 'warn',
        2: 'info',
        3: 'debug',
    };

    static #getLevelValue(levelName) {
        return Object.keys(this.#levels).find(
            (key) => this.#levels[key] === levelName
        );
    }

    static #getLevelName(levelValue) {
        return Logger.#levels[levelValue];
    }

    constructor(initialLevel = 'info') {
        this.#currentLevel = Logger.#getLevelValue(initialLevel);
    }

    setLevel(level) {
        if (Logger.#getLevelValue(level) !== undefined) {
            this.#currentLevel = Logger.#getLevelValue(level);
        } else {
            throw new Error(`Invalid log level: ${level}`);
        }
    }

    getLevel() {
        return Logger.#getLevelName(this.#currentLevel);
    }

    #sendLogEntry(logEntry) {
        if (Logger.#getLevelValue(logEntry.level) <= this.#currentLevel) {
            this.#logToClient(logEntry);
            this.#logToConsole(logEntry);
        }
    }

    #logToConsole(logEntry) {
        console.log(JSON.stringify(logEntry));
    }

    #logToClient(logEntry) {
        LoggerClient.post('logs', logEntry);
    }

    info(message) {
        const log = new LogEntry('info', message);
        this.#sendLogEntry(log);
    }

    warn(message) {
        const log = new LogEntry('warn', message);
        this.#sendLogEntry(log);
    }

    error(message, error = null) {
        const log = new LogEntry('error', message, error);
        this.#sendLogEntry(log);
    }

    debug(message) {
        const log = new LogEntry('debug', message);
        this.#sendLogEntry(log);
    }
}

class LogEntry {
    constructor(level, message, err = null) {
        this.level = level;
        this.timestamp = new Date().toISOString();
        this.message = message;
        if (err !== null) this.error = err.message;
    }
}
