import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLoggingInterceptor } from './common/interceptors/response-logging.interceptor';
import { VersionManagementMiddleware } from './common/middleware/version-management.middleware';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseLoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware, VersionManagementMiddleware)
      .forRoutes('*'); // apply for all routes
  }
}
