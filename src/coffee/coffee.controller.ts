import { Controller, Get } from '@nestjs/common';

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
}
