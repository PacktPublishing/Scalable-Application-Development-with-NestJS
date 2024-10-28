// pseudo code

// cat.service.ts
import { Injectable } from "@nestjs/common";
import { DogService } from "./dog.service";

@Injectable()
export class CatService {
  constructor(private dogService: DogService) {}
}

// dog.service.ts
import { Injectable } from "@nestjs/common";
import { CatService } from "./cat.service";

@Injectable()
export class DogService {
  constructor(private catService: CatService) {}
}
