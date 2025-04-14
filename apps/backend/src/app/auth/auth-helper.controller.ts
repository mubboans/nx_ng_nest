import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthHelperService } from './auth-helper.service';
import { CreateUserDto } from './dto/create-auth-helper.dto';
import { UpdateAuthHelperDto } from './dto/update-auth-helper.dto';

@Controller('auth')
export class AuthHelperController {
  constructor(private readonly authHelperService: AuthHelperService) {}

  @Post()
  create(@Body() createAuthHelperDto: CreateUserDto) {
    return this.authHelperService.create(createAuthHelperDto);
  }

  @Post('checkUserExists')
  findAll(@Body() body: CreateUserDto) {
    return this.authHelperService.checkUserExists(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authHelperService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthHelperDto: UpdateAuthHelperDto
  ) {
    return this.authHelperService.update(+id, updateAuthHelperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authHelperService.remove(+id);
  }
}
