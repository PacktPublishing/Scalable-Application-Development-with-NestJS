// cat.module.ts
import { Module } from "@nestjs/common";
import { DogModule } from "./dog.module";

@Module({
  imports: [DogModule],
})
export class CatModule {}

// dog.module.ts
import { Module } from "@nestjs/common";
import { CatModule } from "./cat.module";

@Module({
  imports: [CatModule],
})
export class DogModule {}
