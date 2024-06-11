import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UsersModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
