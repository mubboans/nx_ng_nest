import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModelController } from './car-model.controller';
import { CarModelService } from './car-model.service';
import { CarModel } from './entities/car-model.entity';

@Module({
  imports: [SequelizeModule.forFeature([CarModel])],
  controllers: [CarModelController],
  providers: [CarModelService],
  exports: [CarModelService],
})
export class CarModelModule {}
