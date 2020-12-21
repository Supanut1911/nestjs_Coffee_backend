import { Body, ConflictException, Controller, Get, Inject, LoggerService, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CoffeeDto } from './coffee.dto';
import { Logger } from 'winston';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';

let coffees = [
    {
        name: 'mocha',
        cost: 55
    },
    {
        name: 'expresso',
        cost: 75
    }
]

@Controller('coffee')
export class CoffeeController {

    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) {}

    @Get()
    getCoffees(
    ) {
        this.logger.log('info', 'getCoffee', coffees)
        return coffees
    }

    @Post()
    createCoffee(
        @Body() coffeeDto: CoffeeDto
    ):Object {
        let { name, cost } = coffeeDto
        let coffee = {
            name,
            cost
        }

        try {
            coffees.push(coffee)
            this.logger.log('debug', 'createCoffee', coffees)
            return {
                msg: 'add coffee success'
            }
        } catch (error) {
            throw new ConflictException('add fail')
        }
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
          destination: './avatars', 
          filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
        })
      }))
    uploadimg(
        @UploadedFile() file,
        @Res() res
    ) {
        console.log(file);        
    }
}
