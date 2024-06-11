import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto } from './dto/create.dto';
import { Record } from './record.entity';
import { CreateRecordBulkDto } from './dto/create-bulk.dto';
import { UpdateRecordDto } from './dto/update.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async findAll(): Promise<Record[]> {
    return await this.recordRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Record> {
    const record = await this.recordRepository.findOne({ where: { id: id } });
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return record;
  }

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    if (!createRecordDto.text.trim()) return null;
    const record_existing = await this.recordRepository.findOneBy({
      text: createRecordDto.text,
    });
    if (record_existing) {
      await this.recordRepository.remove(record_existing);
    }
    const record = this.recordRepository.create(createRecordDto);
    return await this.recordRepository.save(record);
  }

  async update(id: number, updateRecordDto: UpdateRecordDto): Promise<Record> {
    if (!updateRecordDto.text.trim()) return null;
    const record = await this.recordRepository.findOneBy({ id });
    record.text = updateRecordDto.text;
    return await this.recordRepository.save(record);
  }

  async createBulk(
    createRecordBulkDto: CreateRecordBulkDto,
  ): Promise<Record[]> {
    const records: Record[] = [];

    for (const dto of createRecordBulkDto.entries) {
      if (!dto.text.trim()) return null;
      const record_existing = await this.recordRepository.findOneBy({
        text: dto.text,
      });
      if (record_existing) {
        await this.recordRepository.remove(record_existing);
      }
      const record = this.recordRepository.create(dto);
      records.push(record);
    }
    return await this.recordRepository.save(records);
  }

  async remove(id: number) {
    const result = await this.recordRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`A record "${id}" was not found`);
    }
    return { message: 'Record successfully deleted' };
  }
}
