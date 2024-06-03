import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class DatabaseEnv {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsString()
  @IsNotEmpty()
  DB_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;
}

export default registerAs('database', () => {
  const validateConfig = plainToInstance(DatabaseEnv, process.env);
  const errors = validateSync(validateConfig);
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
});
