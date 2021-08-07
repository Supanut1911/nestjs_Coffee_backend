import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import { Repository } from 'typeorm';
import { Coffee } from './coffee.entity';
import { CoffeeDto } from './DTO/coffee.dto';

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
@Injectable()
export class CoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepo: Repository<Coffee>
    ) {}


    async getCoffees(): Promise<Coffee[]> {
        let coffees = await this.coffeeRepo.find()
        return coffees
    }

    async addCoffee(
        payload: CoffeeDto
    ): Promise<string> {
        const { name, cost } = payload
        let coffee = await this.coffeeRepo.create()
        coffee.name = name
        coffee.cost = cost

        try {
            await this.coffeeRepo.save(coffee)
            return 'add coffee successfuly'
        } catch (error) {
            throw new HttpException('add coffee error', 400)
        }
    }

    async editCoffee(
        coffeeName: string,
        payload: CoffeeDto
    ): Promise<string> {
        const {name, cost} = payload
        let coffeeFound = await this.coffeeRepo.findOne({ where: { name:  coffeeName}})

        if(!coffeeFound) {
            return 'not found coffee'
        } else {
            coffeeFound.name = name
            coffeeFound.cost = cost
            await this.coffeeRepo.save(coffeeFound)
            return 'edit coffee success'
        }
    }

    async deleteCoffee(
        coffeeName: string
    ): Promise<string> {
        let coffeeFound = await this.coffeeRepo.findOne({ where: {name: coffeeName}})
        if(!coffeeFound) {
            throw new HttpException(`not found coffee ${coffeeName}`, 404)
        } else {
            await this.coffeeRepo.delete(coffeeFound)
            return `delete ${coffeeName} successfuly`
        }
    }


}
