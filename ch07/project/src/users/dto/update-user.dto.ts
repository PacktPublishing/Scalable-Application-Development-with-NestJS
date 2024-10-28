// export class UpdateUserDto {
//   name?: string;
//   email?: string;
// }

// a short form and the most used one

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
