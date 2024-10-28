import { Controller, Get } from "@nestjs/common";
import { Observable } from "rxjs";
import { createReadStream } from "fs";
import { join } from "path";
import { map } from "rxjs/operators";

@Controller("data")
export class DataController {
  @Get("observable-stream")
  streamWithObservable(): Observable<any> {
    const filePath = join(__dirname, "large-dataset.csv");
    const stream = createReadStream(filePath);

    return new Observable((observer) => {
      stream.on("data", (chunk) => observer.next(chunk));
      stream.on("error", (err) => observer.error(err));
      stream.on("end", () => observer.complete());
    }).pipe(map((chunk) => ({ data: chunk.toString() })));
  }
}
