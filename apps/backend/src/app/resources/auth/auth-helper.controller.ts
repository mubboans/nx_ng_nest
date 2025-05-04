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
import { checkUserWithEmailDto, CreateUserDto } from './dto/create-auth-helper.dto';
import { UpdateAuthHelperDto } from './dto/update-auth-helper.dto';
import { returnResponse } from '../../utils/success-response';
import { ApiBadRequestResponse, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthHelperController {
  constructor(private readonly HttpHelperService: HttpHelperService) {}

  @Post('user-details')
  create(@Body() createAuthHelperDto: CreateUserDto) {
    return this.HttpHelperService.create(createAuthHelperDto);
  }

  @Post('checkUserExists')
  @ApiBody({ type: checkUserWithEmailDto })
  @ApiBadRequestResponse({ description: 'Invalid email format or type' })
  async findAll(@Body() body: checkUserWithEmailDto) {
    const result = await this.HttpHelperService.checkUserExists(body);
    return returnResponse(200, 'User Check', result);
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
