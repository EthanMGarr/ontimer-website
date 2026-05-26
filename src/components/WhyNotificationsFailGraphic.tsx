import Image from "next/image";

interface Props {
  className?: string;
  priority?: boolean;
  caption?: string;
}

export function WhyNotificationsFailGraphic({ className, priority = false, caption }: Props) {
  return (
    <figure className={className}>
      <Image
        src="/images/why-notifications-fail-framework.png"
        alt="Behavioral framework showing why standard notifications fail while interruptive alarms drive action and follow-through."
        width={1376}
        height={768}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
        className="w-full rounded-2xl"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-zinc-500">{caption}</figcaption>
      )}
    </figure>
  );
}
