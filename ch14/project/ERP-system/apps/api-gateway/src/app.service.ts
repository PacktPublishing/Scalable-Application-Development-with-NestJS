import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async handleRequest(
    req: Request,
    res: Response,
    endpoint: string,
    method: 'get' | 'post' | 'put' | 'delete',
    serviceUrl: string,
  ) {
    const route = `${serviceUrl}/${endpoint}`;

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService[method](route, req.body),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res
        .status(error.response?.status ?? 500)
        .json(error.response?.data ?? error.message);
    }
  }
}
