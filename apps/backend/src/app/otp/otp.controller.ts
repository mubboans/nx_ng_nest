import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto, VerificationResponseDto, VerifyCodeDto } from './dto/create-otp.dto';
import { UpdateOtpDto } from './dto/update-otp.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User Verification')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('check-user')
  @ApiOperation({
    summary: 'Check if user exists',
    description: 'Check if a user with the provided email already exists in the system'
  })
  @ApiBody({ type: CreateOtpDto })
  @ApiCreatedResponse({
    type: VerificationResponseDto,
    description: 'Successfully checked user existence'
  })
  @ApiBadRequestResponse({ description: 'Invalid email format' })
  async checkUser(@Body() checkUserDto: CreateOtpDto): Promise<VerificationResponseDto> {
    const exists = await this.otpService.checkUser(checkUserDto.email);
    return {
      success: true,
      message: exists ? 'User exists' : 'User does not exist',
      data: { exists }
    };
  }

  @Post('send-code')
  @ApiOperation({
    summary: 'Send verification code',
    description: 'Send a 6-digit verification code to the provided email address'
  })
  @ApiBody({ type: CreateOtpDto })
  @ApiCreatedResponse({
    type: VerificationResponseDto,
    description: 'Verification code sent successfully'
  })
  @ApiBadRequestResponse({ description: 'Invalid email format' })
  async sendVerificationCode(@Body() checkUserDto: CreateOtpDto): Promise<VerificationResponseDto> {
    await this.otpService.sendVerificationCode({to: checkUserDto.email, subject: 'Verification Code', html: 'Your verification code is 123456'});
    return {
      success: true,
      message: 'Verification code sent to email'
    };
  }

  @Post('verify-code')
  @ApiOperation({
    summary: 'Verify code',
    description: 'Verify the 6-digit code sent to the user\'s email'
  })
  @ApiBody({ type: VerifyCodeDto })
  @ApiCreatedResponse({
    type: VerificationResponseDto,
    description: 'Code verification result'
  })
  @ApiBadRequestResponse({ description: 'Invalid input format' })
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto): Promise<VerificationResponseDto> {
    const verified = await this.otpService.verifyCode(
      verifyCodeDto.email,
      verifyCodeDto.code
    );
    return {
      success: verified,
      message: verified ? 'Verification successful' : 'Invalid or expired code'
    };
  }
}
