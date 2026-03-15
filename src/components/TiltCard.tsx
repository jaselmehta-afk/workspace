"use client";

import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // max degrees of tilt, default 7
}

export default function TiltCard({ children, className = "", intensity = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    ref.current.style.transition = "transform 0.08s ease-out";
    ref.current.style.transform =
      `perspective(900px) rotateX(${(-y * intensity).toFixed(2)}deg) rotateY(${(x * intensity).toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)";
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
