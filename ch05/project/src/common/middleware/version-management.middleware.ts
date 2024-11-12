import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class VersionManagementMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract the first segment of the path
    console.log('URL', req.url);
    const firstPathSegment = req.originalUrl
      .split('/')[1]
      ?.toString()
      ?.toLowerCase();

    // Check if the first segment is a version
    if (!firstPathSegment.startsWith('v')) {
      // If not, prepend 'v1' to the path
      req.url = '/v1' + req.url;
    } else if (!['v1', 'v2'].includes(firstPathSegment)) {
      // If an invalid version is detected, set to latest version ('v2' in this case)
      req.originalUrl = req.originalUrl.replace(firstPathSegment, 'v2');
    }

    next();
  }
}
