import Image from "next/image";

interface Props {
  className?: string;
  priority?: boolean;
  caption?: string;
  variant?: "full" | "condensed";
}

const variants = {
  full: {
    src: "/images/why-notifications-fail-framework.png",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px",
  },
  condensed: {
    src: "/images/why-notifications-fail-framework-condensed.png",
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 700px",
  },
};

export function WhyNotificationsFailGraphic({
  className,
  priority = false,
  caption,
  variant = "full",
}: Props) {
  const { src, sizes } = variants[variant];
  return (
    <figure className={className}>
      <Image
        src={src}
        alt="Behavioral framework showing why standard notifications fail while interruptive alarms drive action and follow-through."
        width={1376}
        height={768}
        priority={priority}
        sizes={sizes}
        className="w-full rounded-2xl"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-zinc-500">{caption}</figcaption>
      )}
    </figure>
  );
}
