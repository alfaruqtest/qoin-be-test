import { IsNotEmpty } from 'class-validator';

export class CreateTestDTO {
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  status: number;
}

export class UpdateTestDTO {
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  status: number;
}
