@Pipe({ name: "myPipe" })
export class MyPipe {
  constructor(private readonly logger: Logger) {}

  transform(value: any) {
    this.logger.log("The value is: " + value);
    return value;
  }
}
