import { Injectable, OnModuleInit } from "@nestjs/common";
import { register as promRegister, Counter } from "prom-client";

@Injectable()
export class MetricsService implements OnModuleInit {
  private readonly httpRequestsTotal: Counter<string>;

  onModuleInit() {
    this.httpRequestsTotal = new Counter({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "status"],
    });

    promRegister.registerMetric(this.httpRequestsTotal);
  }

  incrementHttpRequestCount(method: string, status: string) {
    this.httpRequestsTotal.inc({ method, status });
  }
}
