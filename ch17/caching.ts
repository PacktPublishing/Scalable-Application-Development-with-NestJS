import { CacheModule, Module } from '@nestjs/common'; 
import { APP_INTERCEPTOR } from '@nestjs/core'; 
import { CacheInterceptor } from '@nestjs/common'; 
 
@Module({ 
  imports: [ 
    CacheModule.register({ 
      ttl: 5, // seconds 
      max: 100, // maximum number of items in cache 
    }), 
  ], 
  providers: [ 
    { 
      provide: APP_INTERCEPTOR, 
      useClass: CacheInterceptor, 
    }, 
  ], 
}) 
export class AppModule {}

// distributed cache

import { CacheModule, Module } from '@nestjs/common'; 
import * as redisStore from 'cache-manager-redis-store'; 
 
@Module({ 
  imports: [ 
    CacheModule.register({ 
      store: redisStore, 
      host: 'localhost', 
      port: 6379, 
      ttl: 600, // 10 minutes 
    }), 
  ], 
}) 
export class AppModule {} 

// http cache

import { Controller, Get } from '@nestjs/common'; 
import { CacheKey, CacheTTL } from '@nestjs/common'; 
 
@Controller('data') 
export class DataController { 
  @Get() 
  @CacheKey('my-custom-key') 
  @CacheTTL(300) 
  findAll() { 
    return this.dataService.findAll(); 
  } 
} 

// cache busting

import { CacheService } from '@nestjs/common'; 
 
@Injectable() 
export class MyService { 
  constructor(private cacheManager: CacheService) {} 
 
  async updateData() { 
    // Update data logic 
    await this.cacheManager.del('my-custom-key'); 
  } 
} 
