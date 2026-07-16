import { Injectable, NotFoundException } from '@nestjs/common';
import prisma from "../prisma/client";

@Injectable()
export class ProductsService {
    // CREATE PRODUCT
    async create(data: any) {
    // Get the next number from the PostgreSQL sequence
    const result = await prisma.$queryRaw<{ nextval: bigint }[]>`
        SELECT nextval('product_sku_seq')
    `;

    const nextNumber = Number(result[0].nextval);

    // Generate the SKU
    const sku = `MGHETTO${nextNumber.toString().padStart(4, '0')}`;

    return prisma.product.create({
        data: {
            ...data,
            sku,
        },
    });
}
    //GET ALL PRODUCTS
    async findAll() {
    return prisma.product.findMany({
        where: {
            isActive: true,
        },
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
    async remove(id: string) {
    return prisma.product.update({
        where: { id },
        data: {
            isActive: false,
        },
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
