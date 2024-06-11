import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty({ message: 'Field text must be added' })
  @IsString()
  text: string;
}
