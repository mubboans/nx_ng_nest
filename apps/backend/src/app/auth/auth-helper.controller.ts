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
import { CreateAuthHelperDto } from './dto/create-auth-helper.dto';
import { UpdateAuthHelperDto } from './dto/update-auth-helper.dto';

@Controller('auth-helper')
export class AuthHelperController {
  constructor(private readonly authHelperService: AuthHelperService) {}

  @Post()
  create(@Body() createAuthHelperDto: CreateAuthHelperDto) {
    return this.authHelperService.create(createAuthHelperDto);
  }

  @Get()
  findAll() {
    return this.authHelperService.findAll();
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
