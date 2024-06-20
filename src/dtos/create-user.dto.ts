import { IsNotEmpty, IsString, IsEmail, MinLength, MaxLength, Matches, IsOptional, IsNumber } from "class-validator";
import { userRole } from "src/enum/role.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Sorry, you must put in 8 characters' })
  @MaxLength(16, { message: 'Password should not be more than 16 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/, {
    message:
      'Password must contain atleast one Uppercase, one number and one special key',
  })
  password: string;

  @IsOptional()
  @IsString()
  role: userRole;
}
