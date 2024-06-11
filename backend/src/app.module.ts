import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordModule } from './record/record.module';
import { Record } from './record/record.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { User } from './users/users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'history.db',
      entities: [Record, RefreshToken, User],
      synchronize: true, // true shouldn't be used in production - otherwise you can lose production data.
    }),
    RecordModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
