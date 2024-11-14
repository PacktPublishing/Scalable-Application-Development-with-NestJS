import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const newUser = this.usersService.create(createUserInput);
    pubSub.publish('userCreated', { userCreated: newUser });
    return newUser;
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const updatedUser = this.usersService.update(
      updateUserInput.id,
      updateUserInput,
    );
    pubSub.publish('userUpdated', { userUpdated: updatedUser });
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  // Subscriptions
  @Subscription(() => User, {
    name: 'userCreated',
  })
  userCreated() {
    return pubSub.asyncIterableIterator('userCreated');
  }

  @Subscription(() => User, {
    name: 'userUpdated',
  })
  userUpdated() {
    return pubSub.asyncIterableIterator('userUpdated');
  }
}
