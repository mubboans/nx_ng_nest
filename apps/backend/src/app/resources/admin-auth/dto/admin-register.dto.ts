import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdminRegisterDto {
  @ApiProperty({ example: 'Admin User' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin@mdxlab.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Admin@12345' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
