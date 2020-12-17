import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { CoffeeDto } from './coffee.dto';

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

    @Get()
    getCoffees(

    ) {
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
            return {
                msg: 'add coffee success'
            }
        } catch (error) {
            throw new ConflictException('add fail')
        }
    }
}
