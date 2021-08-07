import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { Coffee } from './coffee.entity';
import { CoffeeService } from './coffee.service';
@Module({
  imports:[
    TypeOrmModule.forFeature([
      Coffee
    ])
  ],
  controllers: [CoffeeController],
  providers: [CoffeeService]
})
export class CoffeeModule {}
