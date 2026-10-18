import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { tryCatch } from '../../utils/promise-wrapper';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    try {
      
    } catch (error) {
      
    }
  }

  async findAll() {
   try {
     
   } catch (error) {
    
   }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
