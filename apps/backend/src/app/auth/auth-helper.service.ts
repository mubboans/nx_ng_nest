import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth-helper.dto';
import { UpdateAuthHelperDto } from './dto/update-auth-helper.dto';

@Injectable()
export class AuthHelperService {
  create(createAuthHelperDto: CreateUserDto) {
    return 'This action adds a new authHelper';
  }

  checkUserExists(body: CreateUserDto) {
    return `This action returns all authHelper ${body?.email}`
  }

  findOne(id: number) {
    return `This action returns a #${id} authHelper`;
  }

  update(id: number, updateAuthHelperDto: UpdateAuthHelperDto) {
    return `This action updates a #${id} authHelper`;
  }

  remove(id: number) {
    return `This action removes a #${id} authHelper`;
  }
}
