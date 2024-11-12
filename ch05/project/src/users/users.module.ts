import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ExternalUserDataService } from '../external-services/external-user-data.service';

@Module({
  providers: [
    UsersService,
    {
      provide: 'EXTERNAL_USER_DATA_SERVICE',
      useClass: ExternalUserDataService,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
