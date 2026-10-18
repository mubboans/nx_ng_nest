import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CarModel } from './entities/car-model.entity';
import { CreateCarModelDto } from './dto/create-car-model.dto';
import { UpdateCarModelDto } from './dto/update-car-model.dto';

@Injectable()
export class CarModelService {
  constructor(@InjectModel(CarModel) private carModelRepo: typeof CarModel) {}

  async create(dto: CreateCarModelDto): Promise<CarModel> {
    return this.carModelRepo.create(dto as any);
  }

  async findAll(activeOnly = false): Promise<CarModel[]> {
    const where: any = activeOnly ? { isActive: true } : {};
    return this.carModelRepo.findAll({ where, order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']] });
  }

  async findOne(id: number): Promise<CarModel> {
    const car = await this.carModelRepo.findByPk(id);
    if (!car) throw new NotFoundException(`CarModel #${id} not found`);
    return car;
  }

  async update(id: number, dto: UpdateCarModelDto): Promise<CarModel> {
    const car = await this.findOne(id);
    await car.update(dto);
    return car;
  }

  async remove(id: number): Promise<{ message: string }> {
    const car = await this.findOne(id);
    await car.destroy(); // soft delete (paranoid: true)
    return { message: `CarModel #${id} deleted successfully` };
  }

  async toggleActive(id: number): Promise<CarModel> {
    const car = await this.findOne(id);
    await car.update({ isActive: !car.isActive });
    return car;
  }
}
