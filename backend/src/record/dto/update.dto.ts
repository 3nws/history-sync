import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRecordDto {
  @IsNotEmpty({ message: 'Field text must be added' })
  @IsString()
  text: string;
}
