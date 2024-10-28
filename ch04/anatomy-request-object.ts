import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express"; // if you use Fastify, import from 'fastify'

@Controller("info")
export class InfoController {
  @Get()
  extractReqInfo(@Req() request: Request) {
    return {
      method: request.method,
      url: request.url,
      headers: request.headers,
    };
  }
}
