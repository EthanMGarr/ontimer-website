interface PlanningEstimateNoticeProps {
  requirement: string;
}

export default function PlanningEstimateNotice({ requirement }: PlanningEstimateNoticeProps) {
  return (
    <div role="note" className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2.5">
      <p className="text-xs leading-relaxed text-zinc-400">
        <span className="font-semibold text-zinc-400">Planning estimate:</span>{" "}
        Conditions can change. Allow extra time and {requirement}
      </p>
    </div>
  );
}
