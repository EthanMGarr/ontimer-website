interface PlanningEstimateNoticeProps {
  requirement: string;
  locale?: "en" | "es";
}

export default function PlanningEstimateNotice({ requirement, locale = "en" }: PlanningEstimateNoticeProps) {
  return (
    <div role="note" className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2.5">
      <p className="text-xs leading-relaxed text-zinc-400">
        <span className="font-semibold text-zinc-400">
          {locale === "es" ? "Estimación orientativa:" : "Planning estimate:"}
        </span>{" "}
        {locale === "es" ? "Las condiciones pueden cambiar. Deja tiempo adicional y " : "Conditions can change. Allow extra time and "}
        {requirement}
      </p>
    </div>
  );
}
