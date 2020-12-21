import { Logger, Module } from '@nestjs/common';
import {utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import * as winston from 'winston'
import * as fs from 'fs'
import * as path from 'path'
import { MulterModule } from '@nestjs/platform-express';

const logDir = 'log'

if(!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
  console.log('halo');  
}

const fileName = path.join(logDir, 'result.log')

@Module({
  imports:[
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          )
        }),
        new winston.transports.File({ filename: 'result.log'})
      ]
    }),
  ],

  controllers: [CoffeeController],
  providers: [CoffeeService]
})
export class CoffeeModule {}
