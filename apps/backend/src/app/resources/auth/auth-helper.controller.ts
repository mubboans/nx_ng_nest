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
import { ApiBadRequestResponse, ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth Helper')
@Controller('auth')
export class AuthHelperController {
  constructor(private readonly HttpHelperService: HttpHelperService) {}

  @Post('user-details')
  @ApiOperation({ summary: 'Create or check user details' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAuthHelperDto: CreateUserDto) {
    return returnResponse(201, 'User created successfully', this.HttpHelperService.create(createAuthHelperDto));
  }

  @Post('check-user-exists')
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
