import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService){}
    @Post()
    create(@Body() body: any) {
        return this.salesService.CreateSale(body.userId,body.items);
    }
    @Get()
    findAll(){
        return this.salesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(id);
    }
}

