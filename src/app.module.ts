import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtStrategy } from '@/auth/guards/strategies/jwt.strategy'
import { UsersModule } from './users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { RolesGuard } from '@/auth/guards/roles/roles.guard'
import { JwtAuthGuard } from '@/auth/guards/ jwt-auth.guard'
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy]
})
export class AppModule {}
