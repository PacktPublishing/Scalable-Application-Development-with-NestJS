import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

import { Transform } from 'class-transformer';

class AddressDTO {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  houseNumber: number;
}

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  address: AddressDTO;

  // transforiming data
  @Transform((value) => value.toString().toUpperCase())
  favoriteColor: string;
}
