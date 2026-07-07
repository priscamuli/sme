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

    // Last 7 days sales
const last7DaysSales: { day: string; sales: number }[] = [];

for (let i = 6; i >= 0; i--) {
  const start = new Date();
  start.setDate(start.getDate() - i);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  const sales = await prisma.sale.aggregate({
    _sum: {
      total: true,
    },
    where: {
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });

  last7DaysSales.push({
    day: start.toLocaleDateString("en-US", {
      weekday: "short",
    }),
    sales: sales._sum.total || 0,
  });
}

    return {
      totalProducts,
      lowStockCount:lowStockProducts,
      todaySales,
      todayExpenses,
      profit: todaySales - todayExpenses,
      weeklySales: last7DaysSales,
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