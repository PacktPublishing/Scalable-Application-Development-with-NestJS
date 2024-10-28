import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUser: LoginUserDto) {
    const { username, password } = loginUser;
    try {
      const user = await this.userService.getUserByUsername(username);

      if (await this.verifyPassword(user, password, user.password)) {
        delete user.password;
        const accessToken = await this.jwtService.signAsync({
          sub: user.id,
          username: user.username,
        });

        return {
          message: 'Login successful',
          data: {
            ...user,
            accessToken,
          },
        };
      }

      return {
        message: 'Invalid username or password',
        data: null,
      };
    } catch (error) {
      return error;
    }
  }

  async signup(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = this.hashPassword(createUserDto.password);
      const newUser: CreateUserDto = {
        ...createUserDto,
        password: hashedPassword,
      };

      return await this.userService.create(newUser);
    } catch (error) {
      return error;
    }
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  async verifyPassword(user: User, password: string, hashedPassword: string) {
    return user && (await bcrypt.compare(password, hashedPassword));
  }
}
