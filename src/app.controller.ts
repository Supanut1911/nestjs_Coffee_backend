import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/re/:id')
  index(
    @Res() res,
    @Param('id') id: number,
    @Query() query 
  ) {
    console.log({ success: true, id: id, ...query });
    
    return res.send({ success: true, id: id, ...query })
  }

  @Post()
  createCoffee(
    @Body('name') name: string,
    @Body('cost') cost: string,
    @Res() res
  ) {
    return res.send({name, cost})
  }
}
