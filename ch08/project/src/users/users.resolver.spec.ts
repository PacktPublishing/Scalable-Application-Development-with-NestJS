import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    mockUsersService = {
      create: jest.fn((dto: CreateUserInput) => ({ id: Date.now(), ...dto })),
      // other methods
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a user', () => {
    const dto: CreateUserInput = {
      name: 'Test User',
      email: 'test@test.com',
    };
    expect(resolver.createUser(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });
});
