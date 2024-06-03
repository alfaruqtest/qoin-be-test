import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateTestDTO {
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  status: number;

  @Exclude()
  created = new Date();

  @Exclude()
  updated = new Date();
}
