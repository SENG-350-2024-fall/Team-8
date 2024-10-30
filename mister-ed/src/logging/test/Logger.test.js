import Logger from '../Logger';
import LoggerClient from '../../clients/LoggerClient';

jest.mock('../../clients/LoggerClient');

describe('Constructor Method', () => {
    test('Constructor with initial level', () => {
        const logger = new Logger('error');
        expect(logger.getLevel()).toBe('error');
    });
    test('Constructor without intial level', () => {
        const logger = new Logger();
        expect(logger.getLevel()).toBe('info');
    });
});

describe('setLevel Method', () => {
    test('set the logger level a valid level', () => {
        const logger = new Logger('error');
        logger.setLevel('info');
        expect(logger.getLevel()).toBe('info');
    });
    test('set the logger level to an invalid level', () => {
        const logger = new Logger('error');
        expect(() => logger.setLevel('invalid')).toThrow();
    });
});

describe('General Logging Methods', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(LoggerClient, 'post').mockImplementation();
    });
    afterAll(() => {
        console.log.mockRestore();
        LoggerClient.post.mockRestore();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('error() with error attached and logger set to valid level', () => {
        const logger = new Logger('debug');
        logger.error('Door Stuck!', new Error('Error!'));

        const logEntry = {
            level: 'error',
            message: 'Door Stuck!',
            timestamp: expect.any(String),
            error: expect.any(Error),
        };

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledWith(
            'logs',
            expect.objectContaining(logEntry)
        );
    });
    test('warn() with logger set to valid level', () => {
        const logger = new Logger('debug');
        logger.warn('Door Stuck!');

        const logEntry = {
            level: 'warn',
            message: 'Door Stuck!',
            timestamp: expect.any(String),
        };

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledWith(
            'logs',
            expect.objectContaining(logEntry)
        );
    });
    test('info() with logger set to valid level', () => {
        const logger = new Logger('debug');
        logger.info('Door Stuck!');

        const logEntry = {
            level: 'info',
            message: 'Door Stuck!',
            timestamp: expect.any(String),
        };

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledWith(
            'logs',
            expect.objectContaining(logEntry)
        );
    });
    test('debug() with logger set to valid level', () => {
        const logger = new Logger('debug');
        logger.debug('Door Stuck!');

        const logEntry = {
            level: 'debug',
            message: 'Door Stuck!',
            timestamp: expect.any(String),
        };

        expect(console.log).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledTimes(1);
        expect(LoggerClient.post).toHaveBeenCalledWith(
            'logs',
            expect.objectContaining(logEntry)
        );
    });
    test('create a log with invalid level', () => {
        const logger = new Logger('error');
        logger.info('Door Stuck!');

        expect(console.log).toHaveBeenCalledTimes(0);
        expect(LoggerClient.post).toHaveBeenCalledTimes(0);
    });
});
