import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['orders'],
    });
  }

  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['orders'],
    });
  }

  async findOneByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findAll(page = 1, limit = 20) {
    return await this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['orders'],
    });
  }
}
