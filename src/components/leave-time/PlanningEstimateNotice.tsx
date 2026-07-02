interface PlanningEstimateNoticeProps {
  finalSentence: string;
}

export default function PlanningEstimateNotice({ finalSentence }: PlanningEstimateNoticeProps) {
  return (
    <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-3">
      <p className="text-xs leading-relaxed text-zinc-500">
        <span className="font-semibold text-zinc-400">Planning estimate:</span>{" "}
        This calculator provides an estimated leave time based on available traffic, travel, and destination information.
        Actual conditions, including traffic, weather, security lines, parking availability, check-in requirements, and operational changes, may vary.
        Always allow additional time for important trips and {finalSentence}
      </p>
    </div>
  );
}
