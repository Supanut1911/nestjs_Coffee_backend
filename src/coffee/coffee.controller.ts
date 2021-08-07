import { Body, ConflictException, Controller, Delete, Get, Header, HttpStatus, Inject,  LoggerService, Param, Patch, Post, Res, SetMetadata, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CoffeeDto } from './DTO/coffee.dto';
import { CoffeeService } from './coffee.service';
import { Coffee } from './coffee.entity';

@Controller('coffee')
export class CoffeeController {

    constructor(
        private coffeeService: CoffeeService
    ) {}

    @Get()
    async getCoffees(

    ): Promise<Coffee[]> {
        let coffeesRes = await this.coffeeService.getCoffees()
        return coffeesRes
    }

    @Post()
    async addCoffee(
        @Body() payload: CoffeeDto
    ) {
        let response = await this.coffeeService.addCoffee(payload)
        return response
    }

    @Patch('/:name')
    async editCoffee(
        @Param('name') name: string,
        @Body() payload: CoffeeDto
    ) {
        let response = await this.coffeeService.editCoffee(name, payload)
        return response
    }

    @Delete('/:name')
    async deleteCoffee(
       @Param('name') name: string
    ) {
        let response = await this.coffeeService.deleteCoffee(name)
        return response
    }
}



