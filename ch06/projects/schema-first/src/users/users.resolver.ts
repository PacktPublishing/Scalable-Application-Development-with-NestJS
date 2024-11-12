import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation('createUser')
  async addUser(
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.usersService.create({ name, email });
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('email') email: string,
  ): Promise<User> {
    return this.usersService.update(id, { name, email });
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: number) {
    return this.usersService.remove(id);
  }
}
