import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RefreshTokensModule } from 'src/refresh-token/refresh-token.module';
import { RefreshTokenJwtStrategy } from './strategies/refresh-token-jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    RefreshTokensModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        global: true,
      }),
    }),
  ],
  providers: [ConfigService, AuthService, JwtStrategy, RefreshTokenJwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
