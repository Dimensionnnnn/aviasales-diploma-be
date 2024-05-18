import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class AuthUserResponseType {
  id: string;
  name: string;
  email: string;
  token: string;
}
