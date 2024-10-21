import { Controller, Get } from "@nestjs/common";

@Controller("stateless")
export class StatelessController {
  @Get()
  statelessEndpoint(): string {
    return "Hello, anonymous human! Enjoy your stateless interaction.";
  }
}
