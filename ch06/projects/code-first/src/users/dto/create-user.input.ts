import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  // @Field(() => Int, { description: 'unique id for a user' })
  // id: number;

  @Field(() => String, { description: 'name of a user' })
  name: string;

  @Field(() => String, { description: 'email of a user' })
  email: string;
}
