import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  // v2 field
  @IsNotEmpty()
  @IsOptional()
  address?: string;
}
