import type { LeaveTimePlugin, PlanningRequest, PlanningResult } from "../domain/types";

export class LeaveTimePlanner {
  plan<Context>(
    request: PlanningRequest<Context>,
    plugin: LeaveTimePlugin<Context>
  ): PlanningResult | null {
    return plugin.plan(request);
  }
}

export const leaveTimePlanner = new LeaveTimePlanner();
