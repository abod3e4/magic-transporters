// logger.service.ts
import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({ filename: 'logfile.log' })
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

}
