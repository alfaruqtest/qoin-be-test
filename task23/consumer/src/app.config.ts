import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  validateSync,
} from 'class-validator';

export class AppEnv {
  @IsString()
  @IsNotEmpty()
  RABBITMQ_HOST: string;

  @IsNumberString()
  @IsNotEmpty()
  RABBITMQ_PORT: number;

  @IsString()
  @IsNotEmpty()
  RABBITMQ_QUEUE_NAME: string;
}

export default registerAs('app', () => {
  const validateConfig = plainToInstance(AppEnv, process.env);
  const errors = validateSync(validateConfig);
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
});
