import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateRecordDto } from './create.dto';

export class CreateRecordBulkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecordDto)
  @ArrayMinSize(1)
  entries: CreateRecordDto[];
}
