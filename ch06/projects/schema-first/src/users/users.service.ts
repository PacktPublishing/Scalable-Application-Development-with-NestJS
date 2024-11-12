import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'Tshimanga Mukendi',
      email: 'tshim@myapp.com',
    },
    {
      id: 2,
      name: 'Kasereka Akim',
      email: 'kase@myapp.com',
    },
    // v2 mocks
    {
      id: 3,
      name: 'Ushindi Joseph',
      email: 'ushindi@myapp.com',
    },
    {
      id: 4,
      name: 'Kabeya Jean',
      email: 'kabeya@myapp.com',
    },
  ];

  create(createUserInput: CreateUserInput) {
    const id = this.users.length + 1;
    this.users.push({ id, ...createUserInput });
    return { id, ...createUserInput };
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    Object.assign(user, updateUserInput);
    return user;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }
}
