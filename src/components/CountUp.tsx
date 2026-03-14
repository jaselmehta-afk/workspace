"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function CountUp({ to, suffix = "", prefix = "", duration = 1800 }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const steps = 60;
    const increment = to / steps;
    let current = 0;
    const interval = duration / steps;
    const timer = setInterval(() => {
      current = Math.min(current + increment, to);
      setCount(Math.floor(current));
      if (current >= to) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}{inView ? count.toLocaleString() : 0}{suffix}
    </span>
  );
}
