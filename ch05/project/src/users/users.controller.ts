import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MockAuthGuard } from 'src/auth/mock-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Get()
  findAll() {
    console.log('version 1');
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(MockAuthGuard)
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // without the PaseIntPipe, the id will be a string, and need to be converted to number manually

  // @Patch(':id')
  // updateUser(@Body() updateUserDto: CreateUserDto, @Param('id', ParseIntPipe) id: string) {
  // on this line, we are converting the id to a number -- using the `+` sign
  //   return this.usersService.updateUser({ ...updateUserDto, id: +id });
  // }

  @Patch(':id')
  @UseGuards(MockAuthGuard)
  updateUser(
    @Body(new ValidationPipe()) updateUserDto: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.updateUser({ ...updateUserDto, id });
  }

  @Version('2')
  @Get()
  findAllV2() {
    return this.usersService.findAllV2();
  }
}
