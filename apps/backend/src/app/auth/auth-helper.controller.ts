import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HttpHelperService } from './auth-helper.service';
import { CreateUserDto } from './dto/create-auth-helper.dto';
import { UpdateAuthHelperDto } from './dto/update-auth-helper.dto';

@Controller('auth')
export class AuthHelperController {
  constructor(private readonly HttpHelperService: HttpHelperService) {}

  @Post()
  create(@Body() createAuthHelperDto: CreateUserDto) {
    return this.HttpHelperService.create(createAuthHelperDto);
  }

  @Post('checkUserExists')
  findAll(@Body() body: CreateUserDto) {
    return this.HttpHelperService.checkUserExists(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.HttpHelperService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAuthHelperDto: UpdateAuthHelperDto
  ) {
    return this.HttpHelperService.update(+id, updateAuthHelperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.HttpHelperService.remove(+id);
  }
}
