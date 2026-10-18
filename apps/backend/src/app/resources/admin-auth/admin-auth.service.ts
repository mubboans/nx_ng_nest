import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseHelpers } from '../../common/database-helper/db-helpers';
import { User } from '../user/entities/user.entity';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminAuthService {
  constructor(
    private jwtService: JwtService,
    private dbHelper: DatabaseHelpers,
  ) {}

  async register(dto: AdminRegisterDto) {
    const existing = await this.dbHelper.fnGet(User, { email: dto.email });
    if (existing && existing.length > 0) {
      throw new ConflictException('Admin with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const admin = await this.dbHelper.fnPost(User, {
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      isEmailVerified: true,
    });
    return { message: 'Admin registered successfully', id: admin?.id };
  }

  async login(dto: AdminLoginDto) {
    const users = await this.dbHelper.fnGet(User, { email: dto.email });
    if (!users || users.length === 0) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const admin: any = users[0];
    if (admin.role !== 'admin' && admin.role !== 'moderator') {
      throw new UnauthorizedException('Access denied. Admin role required.');
    }

    // Compare password (bcrypt)
    const isPasswordValid = await bcrypt.compare(dto.password, admin.password || '');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email, role: admin.role };
    const token = this.jwtService.sign(payload);

    // Update last login
    await admin.update({ lastLogin: new Date() });

    return {
      accessToken: token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  async getProfile(userId: string) {
    const users = await this.dbHelper.fnGet(User, { id: userId });
    if (!users || users.length === 0) throw new UnauthorizedException('User not found');
    const u: any = users[0];
    return { id: u.id, username: u.username, email: u.email, role: u.role, lastLogin: u.lastLogin };
  }
}
