import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email address to check',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyCodeDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'The email address to verify',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'The 6-digit verification code',
    required: true
  })
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class VerificationResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates if the operation was successful'
  })
  success: boolean;

  @ApiProperty({
    example: 'Verification code sent',
    description: 'Response message',
    required: false
  })
  message?: string;

  @ApiProperty({
    example: { exists: false },
    description: 'Response data',
    required: false
  })
  data?: any;
}
