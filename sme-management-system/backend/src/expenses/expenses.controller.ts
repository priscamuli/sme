import { Body, Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
    constructor( private readonly expensesService: ExpensesService,){}
    @Post()
    create(@Body() body: any) {
        return this.expensesService.create(body);
    }
    @Get()
    findAll() {
        return this.expensesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.expensesService.findOne(id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() body: any,) {
        return this.expensesService.update(id, body);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.expensesService.remove(id);
    }
}
