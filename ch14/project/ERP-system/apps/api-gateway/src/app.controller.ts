import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller('api')
export class AppController {
  private readonly hrServiceUrl: string;

  constructor(private readonly appService: AppService) {
    this.hrServiceUrl = process.env.HR_SERVICE_URL ?? 'http://localhost:3001';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('employees')
  async getEmployees(@Req() req: Request, @Res() res: Response) {
    await this.appService.handleRequest(
      req,
      res,
      'employees',
      'get',
      this.hrServiceUrl,
    );
  }

  @Post('employees')
  async createEmployee(@Req() req: Request, @Res() res: Response) {
    await this.appService.handleRequest(
      req,
      res,
      'employees',
      'post',
      this.hrServiceUrl,
    );
  }
}
