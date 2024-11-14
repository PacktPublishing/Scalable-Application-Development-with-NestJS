import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);

  logWorkflowStart(workflowId: string) {
    this.logger.log(`Workflow ${workflowId} started`);
  }

  logWorkflowError(workflowId: string, error: Error) {
    this.logger.error(`Workflow ${workflowId} error: ${error.message}`);
  }

  logWorkflowCompletion(workflowId: string) {
    this.logger.log(`Workflow ${workflowId} completed`);
  }
}
