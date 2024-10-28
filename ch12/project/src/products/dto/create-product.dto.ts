import {
  IsDecimal,
  IsObject,
  IsString,
  IsUrl,
  Length,
  Validate,
} from 'class-validator';
import { ProductDescription } from '../custom-validators/ProductDescription';
import { ProductSpecs } from '../custom-validators/ProductSpecs';

export class CreateProductDto {
  @IsString({
    message: 'name must be a string',
  })
  @Length(5, 25, {
    message: 'name must be between 5 and 25 characters',
  })
  name: string;

  @IsString({
    message: 'description must be a string',
  })
  @Length(25, 255, {
    message: 'description must be between 25 and 255 characters',
  })
  @Validate(ProductDescription)
  description: string;

  @IsDecimal(
    {
      decimal_digits: '2',
    },
    {
      message: 'price must be a decimal number',
    },
  )
  price: number;

  @IsObject({
    message: 'specs must be a valid object',
  })
  @Validate(ProductSpecs)
  specs: Record<string, string>;

  @IsString({
    message: 'image must be a string',
  })
  @IsUrl(
    {
      require_protocol: true,
    },
    {
      message: 'image must be a valid URL',
    },
  )
  image: string;
}
