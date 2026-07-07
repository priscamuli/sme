import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { SalesModule } from './sales/sales.module';
import { ExpensesModule } from './expenses/expenses.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    JwtModule.register({
      secret:'SUPER_SECRET_KEY_CHANGE_THIS',
      signOptions: { expiresIn: '1d'},
    }),
    SalesModule,
    ExpensesModule,
    DashboardModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
