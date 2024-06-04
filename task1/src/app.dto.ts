import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateTestDTO {
  @IsNotEmpty()
  Nama: string;

  @IsNotEmpty()
  Status: number;

  @Exclude()
  Created = new Date();

  @Exclude()
  Updated = new Date();
}

export class UpdateTestDTO {
  @IsNotEmpty()
  Nama: string;

  @IsNotEmpty()
  Status: number;

  @Exclude()
  Updated = new Date();
}
