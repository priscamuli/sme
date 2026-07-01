import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get()
  getDashboard() {
    return this.dashboardService.getStats();
  }

  @Get('low-stock')
  getLowStockProducts() {
    return this.dashboardService.lowStockItems();
  }
}