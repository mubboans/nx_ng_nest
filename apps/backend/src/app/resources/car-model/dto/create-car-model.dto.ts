import { IsString, IsOptional, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarModelDto {
  @ApiProperty({ example: 'APEX VELOCITY GT' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tagline?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: '1,420 HP' })
  @IsOptional()
  @IsString()
  hp?: string;

  @ApiPropertyOptional({ example: '1.89s' })
  @IsOptional()
  @IsString()
  acceleration?: string;

  @ApiPropertyOptional({ example: '350 km/h' })
  @IsOptional()
  @IsString()
  topSpeed?: string;

  @ApiPropertyOptional({ example: '680 km' })
  @IsOptional()
  @IsString()
  range?: string;

  @ApiPropertyOptional({ example: '$285,000' })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiPropertyOptional({ example: '#d6e4ff' })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ example: '/images/hypercar-hero.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
