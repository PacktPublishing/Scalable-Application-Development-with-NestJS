import { Injectable, NestMiddleware } from "@nestjs/common";
import * as rateLimit from "express-rate-limit";

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })(req, res, next);
  }
}
