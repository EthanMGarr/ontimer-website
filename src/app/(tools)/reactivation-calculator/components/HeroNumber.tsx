'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroNumberProps {
  value: number;
  format?: 'currency' | 'integer';
  className?: string;
}

export default function HeroNumber({ value, format = 'integer', className = '' }: HeroNumberProps) {
  const [displayed, setDisplayed] = useState(0);
  const prevValue = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const duration = 900;
    const startTime = performance.now();

    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplayed(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevValue.current = end;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, [value]);

  const formatted =
    format === 'currency'
      ? `$${displayed.toLocaleString()}`
      : displayed.toLocaleString();

  return <span className={className}>{formatted}</span>;
}
