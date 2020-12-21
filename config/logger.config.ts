import winston, { format, transports } from 'winston'

export class LoggerConfig {
    private readonly options: winston.LoggerOptions

    constructor() {
        this.options = {
            exitOnError: false,
            format: format.combine(
                format.timestamp(),
                format.printf(
                    msg => {
                        return `${msg.timestamp} - ${msg.message}`
                    }
                )
            ),
            transports: [ new transports.Console({ level: 'debug' }) ]
        }
    }

    public console(): object {
        return this.options
    }
}