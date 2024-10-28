// this is a pseudo code to demonstrate the concept of dependency injection

import { Injectable } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  fetchUserData(): string {
    return this.databaseService.getData("user");
  }
}
