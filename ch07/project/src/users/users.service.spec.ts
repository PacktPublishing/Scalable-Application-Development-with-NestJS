import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  const newUser: CreateUserDto = {
    name: 'Kitoko Mwana',
    email: 'kitoko@test.com',
    address: '1234, Lubumbashi, DRC',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const users = await service.findAll();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name).toBeDefined();
    expect(users[0].email).toBe('tshim@myapp.com');
    expect(users[1].address).not.toBeDefined();
  });

  // findall v2
  it('should return an array of users with pagination', () => {
    const users = service.findAllV2(1, 2);
    expect(users.data.length).toBe(2);
    expect(users.data[0].name).toBeDefined();
    expect(users.meta).not.toBeNull();
    expect(users.meta.page).toBe(1);
    expect(users.meta.limit).toBe(2);
    expect(users.meta.total).toBe(4);

    // bad request with a wrong page number
    const users2 = service.findAllV2(100, 2);
    expect(users2.data.length).toBe(0); // no data
    expect(users2.meta).not.toBeNull(); // still return meta
  });

  // user creation
  it('should create a new user', () => {
    const user = service.createUser(newUser);
    expect(user).toBeDefined();
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
    expect(user.id).toBe(5); // new user id
  });

  // update user
  it('should update a user', () => {
    const user = service.updateUser({ name: 'Tshimanga MUKENDI John', id: 1 });
    expect(user).toBeDefined();
    expect(user.name).toBe('Tshimanga MUKENDI John'); // name has been updated
    expect(user.email).toBe('tshim@myapp.com'); // email remains the same

    try {
      // should throw an error if user is not found
      service.updateUser({ name: 'Tshimanga MUKENDI John', id: 100 });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('User not found');
    }
  });
});
