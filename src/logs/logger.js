import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty', 
        options: {
            colorize: true, // Enable colorized output
            translateTime: 'SYS:dd-mm-yyyy HH:mm:ss', // Use standard time format
        }   
    }
});

export default logger;
// Logger configuration using pino  