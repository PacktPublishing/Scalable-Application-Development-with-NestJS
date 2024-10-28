// Caching a response in a Nest.js service

import { Injectable, CACHE_MANAGER, Inject, CacheStore } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore) {}

  async cacheThis(): Promise<string> {
    let value = await this.cacheManager.get("my-key");
    if (value) {
      return `From cache: ${value}`;
    }

    value = "some expensive operation result";
    await this.cacheManager.set("my-key", value, { ttl: 600 });
    return `Processed: ${value}`;
  }
}
