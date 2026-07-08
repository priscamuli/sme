import { Injectable } from '@nestjs/common';
import prisma from '../prisma/client';

@Injectable()
export class AnalyticsService {
  async getAnalytics() {
    const products = await prisma.product.findMany();

    let totalStockCost = 0;
    let totalStockValue = 0;
    let expectedProfit = 0;
    let lowStockItems = 0;

    const analysis = products.map((product) => {
      const profitPerUnit =
        product.sellingPrice - product.buyingPrice;

      const stockCost =
        product.buyingPrice * product.quantity;

      const stockValue =
        product.sellingPrice * product.quantity;

      const totalProfit =
        profitPerUnit * product.quantity;

      totalStockCost += stockCost;
      totalStockValue += stockValue;
      expectedProfit += totalProfit;

      if (
        product.quantity <=
        product.reorderLevel
      ) {
        lowStockItems++;
      }

      return {
        ...product,
        profitPerUnit,
        stockCost,
        stockValue,
        totalProfit,
      };
    });

    return {
      totalStockCost,
      totalStockValue,
      expectedProfit,
      lowStockItems,
      products: analysis,
    };
  }
}