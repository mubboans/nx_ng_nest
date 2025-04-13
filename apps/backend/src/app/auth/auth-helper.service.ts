import { Injectable } from '@nestjs/common';
import { CreateAuthHelperDto } from './dto/create-auth-helper.dto';
import { UpdateAuthHelperDto } from './dto/update-auth-helper.dto';

@Injectable()
export class AuthHelperService {
  create(createAuthHelperDto: CreateAuthHelperDto) {
    return 'This action adds a new authHelper';
  }

  findAll() {
    return `This action returns all authHelper`;
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
