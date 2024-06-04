import { IsNotEmpty } from 'class-validator';

export class CreateTestDTO {
  @IsNotEmpty()
  Nama: string;

  @IsNotEmpty()
  Status: number;
}

export class UpdateTestDTO {
  @IsNotEmpty()
  Nama: string;

  @IsNotEmpty()
  Status: number;
}
