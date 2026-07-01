import { Injectable } from '@nestjs/common';
import prisma from "../prisma/client";
@Injectable()
export class SalesService {
    //CREATE SALE
    async CreateSale(userId: string, items: any[]) {
        let total = 0;
        //calculate total+ validate stock
        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product){
                throw new Error('Product not found');
            }
            if (product.quantity < item.quantity){
                throw new Error (`Not enough stock for $ {product.name}`);
            }
            total += product.sellingPrice * item.quantity;
        }
        //create sale record
        const sale = await prisma.sale.create({
            data: {
                total,
                userId,
            },
        });
        //create sale items + reduce stock
        for (const item of items) {
            const product =await prisma.product.findUnique({
                where: { id: item.productId },
            });
            await prisma.saleItem.create({
                data:{
                    saleId: sale.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product!.sellingPrice,
                },
            });
            //reduce stock
            await prisma.product.update({
                where: { id: item.productId },
                data: {
                    quantity: product!.quantity - item.quantity,
                },
            });
        }
        return sale;
    }
    // GET ALL SALES
    async findAll() {
        return prisma.sale.findMany({
            include: {
                items: true,
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    //GET SINGLE SALE
    async findOne(id: string) {
        return prisma.sale.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
                user: true,
            },
        });
    }
    
}
