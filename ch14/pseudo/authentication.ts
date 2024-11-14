// this is a pseudo code, to update

import { Injectable } from '@nestjs/common'; 
import { JwtService } from '@nestjs/jwt'; 
 
@Injectable() 
export class AuthService { 
  constructor(private jwtService: JwtService) {} 
 
  async validateUser(username: string, pass: string): Promise<any> { 
    // Validate user logic 
  } 
 
  async login(user: any) { 
    const payload = { username: user.username, sub: user.userId }; 
    return { 
      access_token: this.jwtService.sign(payload), 
    }; 
  } 
} 