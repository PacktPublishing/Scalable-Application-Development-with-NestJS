import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Mock the UsersService methods used by the UsersController
    mockUsersService = {
      createUser: jest.fn((dto) => ({ ...dto, id: Date.now() })),
      // Add other methods as necessary
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should call UsersService to create a user', () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const user = usersController.createUser(createUserDto);

    expect(mockUsersService.createUser).toHaveBeenCalledWith(createUserDto);

    expect(user).toEqual({
      ...createUserDto,
      id: expect.any(Number),
    });

    expect(user.id).toBeDefined();
  });
});
