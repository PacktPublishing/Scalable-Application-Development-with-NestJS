// this is a pseudo code

import { Reflector } from "@nestjs/core";

// Custom Roles decorator to assign roles to different routes

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      "roles",
      context.getHandler()
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common'; 
 
@Controller('users') 
export class UserController { 
  @Get('admin') 
  @Roles('admin') // Only allow users with the 'admin' role 
  @UseGuards(RoleGuard) 
  getAdminData() { 
    return 'Admin content'; 
  } 
} 