import { Injectable } from "@nestjs/common";

@Injectable()
export class ErrorHandlingService {
  async retryTask(task: Function, retries: number) {
    let attempts = 0;
    while (attempts < retries) {
      try {
        await task();
        break;
      } catch (error) {
        attempts++;
        if (attempts === retries) {
          throw new Error("Task failed after maximum retries");
        }
      }
    }
  }
}
