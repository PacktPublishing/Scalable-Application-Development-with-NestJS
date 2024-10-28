import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a user with ID ${id}`;
  }

  @Get('details')
  findDetails() {
    return 'Details about users';
  }

  @Get('images')
  findImages() {
    return 'Images of various users';
  }

  @Get(':id/:sex/:minAge')
  filterUsers(
    @Param('id') id: string,
    @Param('sex') sex: string,
    @Param('minAge') minAge: number,
    @Query('salary') salary?: number,
  ) {
    return `Fetching users with ID: ${id}, Sex: ${sex}, Minimum Age: ${minAge}, and Salary: ${salary || 'Not Specified'}`;
  }
}
