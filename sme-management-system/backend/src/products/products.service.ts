import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from "../prisma/client";

@Injectable()
export class ProductsService {
    // CREATE PRODUCT
    async create(data: any) {
        return prisma.product.create({
            data,
        });
    }
    //GET ALL PRODUCTS
    async findAll() {
        return prisma.product.findMany({
            include: {
                category: true,
            },
        });
    }
    //GET ONE PRODUCT
    async findOne(id: string){
        const product = await prisma.product.findUnique({
            where: { id },
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }
    //UPDATE PRODUCT
    async update(id: string, data: any){
        return prisma.product.update({
            where: { id },
            data,
        });
    }
    //DELETE PRODUCT
    async remove(id: string){
        return prisma.product.delete({
            where: { id },
        });
    }
    //REDUCE STOCK (USED IN SALES LATER)
    async reduceStock(productId: string, quantity: number) {
        const product = await this.findOne(productId);
        if (product.quantity < quantity){
            throw new Error('Not enough stock');
        }
        return prisma.product.update({
            where: { id: productId },
            data: {
                quantity: product.quantity - quantity,
            },
        });
    }
}
