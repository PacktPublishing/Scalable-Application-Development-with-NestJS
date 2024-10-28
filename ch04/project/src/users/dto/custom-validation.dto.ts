import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsPalindrome(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsPalindrome',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            value === value.split('').reverse().join('')
          );
        },
      },
    });
  };
}
