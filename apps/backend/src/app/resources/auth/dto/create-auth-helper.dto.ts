import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  name?:string;
  email?:string;
  contact?:string;
  role?:string;
  type?:string;
}


export class checkUserWithEmailDto {
  @ApiProperty({ example: 'tpsmubashir@gmail.com' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
