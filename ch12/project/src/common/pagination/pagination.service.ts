import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {
  getPaginationMeta(page: number, limit: number, totalItems: number) {
    const totalPages = Math.ceil(totalItems / limit);
    return {
      page,
      limit,
      totalPages,
    };
  }
}
