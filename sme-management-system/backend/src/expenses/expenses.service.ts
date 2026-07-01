import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from "../prisma/client";
@Injectable()
export class ExpensesService {
    async create(data: any) {
        return prisma.expenses.create({
            data,
        });
    }
    async findAll() {
        return prisma.expenses.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        });
    }
    async findOne(id: string) {
        const expense = await prisma.expenses.findUnique({
            where: { id },
        });
        if (!expense) {
            throw new NotFoundException('Expense not found');
        }
        return expense;
    }
    async update(id: string, data: any) {
        return prisma.expenses.update({
            where: { id },
            data,
        });
    }
    async remove(id: string){
        return prisma.expenses.delete({
            where: { id },
        });
    }

}
