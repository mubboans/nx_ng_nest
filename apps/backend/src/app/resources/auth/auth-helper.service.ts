import { Injectable } from '@nestjs/common';
import { checkUserWithEmailDto, CreateUserDto } from './dto/create-auth-helper.dto';
import { UpdateAuthHelperDto } from './dto/update-auth-helper.dto';
import { DatabaseHelpers } from '../../common/database-helper/db-helpers';
import { User } from '../user/entities/user.entity';

@Injectable()
export class HttpHelperService {
  constructor(private dbHelperService: DatabaseHelpers) {}
  create(createAuthHelperDto: CreateUserDto) {
    return 'This action adds a new authHelper';
  }

  async checkUserExists(body: checkUserWithEmailDto) {
    const checkUser = await this.dbHelperService.fnGet(User,{email: body.email});
    if (checkUser && checkUser.length > 0) {
      return { isUserExists: true, userName: checkUser[0]?.username, contact: checkUser[0]?.contact, role: checkUser[0]?.role, id: checkUser[0]?.id };
    }
    return { available: true };
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
