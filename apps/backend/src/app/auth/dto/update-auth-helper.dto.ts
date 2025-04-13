import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthHelperDto } from './create-auth-helper.dto';

export class UpdateAuthHelperDto extends PartialType(CreateAuthHelperDto) {}
