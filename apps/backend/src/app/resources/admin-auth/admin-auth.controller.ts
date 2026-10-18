import { Body, Controller, Get, Post, Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { returnResponse } from '../../utils/success-response';

@ApiTags('Admin Auth')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new admin user' })
  @ApiResponse({ status: 201, description: 'Admin registered' })
  async register(@Body() dto: AdminRegisterDto) {
    const result = await this.adminAuthService.register(dto);
    return returnResponse(201, 'Admin registered successfully', result);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login — returns JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful, returns accessToken' })
  async login(@Body() dto: AdminLoginDto) {
    const result = await this.adminAuthService.login(dto);
    return returnResponse(200, 'Login successful', result);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current admin profile' })
  async getProfile(@Request() req: any) {
    const result = await this.adminAuthService.getProfile(req.user.id);
    return returnResponse(200, 'Profile fetched', result);
  }
}
