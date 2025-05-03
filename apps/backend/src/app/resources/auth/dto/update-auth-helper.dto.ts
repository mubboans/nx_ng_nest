import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-auth-helper.dto';

export class UpdateAuthHelperDto extends PartialType(CreateUserDto) {}
