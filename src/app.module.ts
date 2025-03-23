import { JwtStrategy } from '@/auth/guards/strategies/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { CartModule } from './cart/cart.module'
import { FriendsModule } from './friends/friends.module'
import { ChatGateway } from './gateway/chat.gateway'
import { ProductsModule } from './products/products.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    FriendsModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, ChatGateway]
})
export class AppModule {}
