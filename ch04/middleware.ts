import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] Request made to: ${req.path}`);
    next();
  }
}

import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class HeaderCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers["x-custom-header"]) {
      console.log("Header is present");
      next();
    } else {
      res.status(400).send("Missing custom header");
    }
  }
}

// main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggingMiddleware } from "./logging.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggingMiddleware().use);
  await app.listen(3000);
}
bootstrap();
