import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { Record } from './record.entity';
import { CreateRecordDto } from './dto/create.dto';
import { CreateRecordBulkDto } from './dto/create-bulk.dto';
import { UpdateRecordDto } from './dto/update.dto';
import { EmailPassAuthGuard, JwtAuthGuard } from 'src/auth/guards';

@Controller('/api/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Record[]> {
    return this.recordService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number): Promise<Record> {
    return this.recordService.findOne(id);
  }

  @Post()
  @UseGuards(EmailPassAuthGuard)
  create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordService.create(createRecordDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateRecordDto: UpdateRecordDto,
  ): Promise<Record> {
    return this.recordService.update(id, updateRecordDto);
  }

  @Post('bulk')
  @UseGuards(EmailPassAuthGuard)
  createBulk(
    @Body() createRecordBulkDto: CreateRecordBulkDto,
  ): Promise<Record[]> {
    return this.recordService.createBulk(createRecordBulkDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.recordService.remove(id);
  }
}
