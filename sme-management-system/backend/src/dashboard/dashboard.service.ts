import { Injectable } from '@nestjs/common';
import prisma from "../prisma/client";

@Injectable()
export class DashboardService {

  async getStats() {

    const totalProducts = await prisma.product.count();

    const lowStockProducts = await prisma.product.count({
      where: {
        quantity: {
          lte: 5,
        },
      },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const salesToday = await prisma.sale.aggregate({
      _sum: {
        total: true,
      },
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const expensesToday = await prisma.expenses.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const todaySales = salesToday._sum.total || 0;
    const todayExpenses = expensesToday._sum.amount || 0;

    return {
      totalProducts,
      lowStockProducts,
      todaySales,
      todayExpenses,
      profitToday: todaySales - todayExpenses,
    };
  }

  async lowStockItems() {
    return prisma.product.findMany({
      where: {
        quantity: {
          lte: 5,
        },
      },
      orderBy: {
        quantity: 'asc',
      },
    });
  }
}