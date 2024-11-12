import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExternalUserDataService } from '../external-services/external-user-data.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('EXTERNAL_USER_DATA_SERVICE')
    private externalUserService: ExternalUserDataService,
  ) {}

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
      address: '1234, Kinshasa, DRC',
    },
    {
      id: 4,
      name: 'Kabeya Jean',
      email: 'kabeya@myapp.com',
      address: '1234, Goma, DRC',
    },
  ];

  async findAll(): Promise<User[]> {
    const externalUsers = await this.externalUserService.fetchUsers();
    return [...this.users, ...externalUsers];
  }

  // findall v2 -- with pagination
  findAllV2(page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const end = page * limit;

    return {
      data: this.users.slice(start, end),
      meta: {
        page,
        limit,
        total: this.users.length,
      },
    };
  }

  createUser(user: CreateUserDto) {
    this.users.push({
      ...user,
      id: this.users.length + 1,
    });

    return this.users[this.users.length - 1];
  }

  updateUser(user: UpdateUserDto & { id: number }) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }

    this.users[index] = {
      name: user.name ?? this.users[index].name,
      email: user.email ?? this.users[index].email,
      id: this.users[index].id,
    };

    return this.users[index].id;
  }
}
