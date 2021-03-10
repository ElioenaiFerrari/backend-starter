import { IsEmail, IsEnum, Length } from 'class-validator';

export class SignupDto {
  @Length(3, 20)
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 20)
  password: string;

  @IsEnum(['user', 'manager', 'admin'])
  role: string;
}
