import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards, ParseIntPipe, Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CarModelService } from './car-model.service';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';
import { JwtAuthGuard, RolesGuard, Roles } from '../../common/guards/jwt-auth.guard';
import { returnResponse } from '../../utils/success-response';

@ApiTags('Car Models (Admin)')
@Controller('car-models')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  // ── PUBLIC: list active cars ────────────────────────────────────
  @Get('public')
  @ApiOperation({ summary: 'List all active car models (public)' })
  async findPublic() {
    const data = await this.carModelService.findAll(true);
    return returnResponse(200, 'Car models fetched', data);
  }

  // ── ADMIN: full CRUD, JWT + Admin role required ─────────────────
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new car model (Admin)' })
  @ApiResponse({ status: 201, description: 'Car model created' })
  async create(@Body() dto: CreateCarModelDto) {
    const data = await this.carModelService.create(dto);
    return returnResponse(201, 'Car model created successfully', data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  async findAll(@Query('activeOnly') activeOnly?: string) {
    const data = await this.carModelService.findAll(activeOnly === 'true');
    return returnResponse(200, 'Car models fetched', data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.carModelService.findOne(id);
    return returnResponse(200, 'Car model fetched', data);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a car model (Admin)' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCarModelDto) {
    const data = await this.carModelService.update(id, dto);
    return returnResponse(200, 'Car model updated successfully', data);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle active status of a car model' })
  async toggleActive(@Param('id', ParseIntPipe) id: number) {
    const data = await this.carModelService.toggleActive(id);
    return returnResponse(200, `Car model ${data.isActive ? 'activated' : 'deactivated'}`, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft-delete a car model (Admin only)' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.carModelService.remove(id);
    return returnResponse(200, 'Car model deleted', data);
  }
}
