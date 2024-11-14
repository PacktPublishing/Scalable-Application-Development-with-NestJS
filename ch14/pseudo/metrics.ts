import { Injectable } from "@nestjs/common";
import { Gauge } from "prom-client";

@Injectable()
export class MetricsService {
  private readonly workflowDuration = new Gauge({
    name: "workflow_duration_seconds",
    help: "Duration of workflow execution in seconds",
  });

  recordWorkflowDuration(seconds: number) {
    this.workflowDuration.set(seconds);
  }
}
