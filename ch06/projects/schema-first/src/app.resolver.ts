import { Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Resolver } from '@nestjs/graphql';

@Resolver()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  getHello(): string {
    return this.appService.getHello();
  }
}
