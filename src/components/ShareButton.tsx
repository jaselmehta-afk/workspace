"use client";

import { useState } from "react";
import { Share2, Check, Link as LinkIcon } from "lucide-react";

interface ShareData {
  title: string;
  text?: string;
  slug: string;
}

interface Props {
  data: ShareData;
  variant?: "icon" | "ghost";
  className?: string;
}

export default function ShareButton({ data, variant = "icon", className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const share = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/spaces/${data.slug}`;
    const sharePayload = { title: data.title, text: data.text || data.title, url };

    if (typeof navigator.share === "function" && navigator.canShare?.(sharePayload)) {
      try { await navigator.share(sharePayload); return; } catch {}
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  const Icon = copied ? Check : Share2;

  if (variant === "ghost") {
    return (
      <button
        onClick={share}
        aria-label="Share this space"
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors
          ${copied ? "text-[#7B9E87]" : "text-white/40 hover:text-white"}
          ${className}`}
      >
        <Icon size={13} />
        <span>{copied ? "Copied!" : "Share"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={share}
      aria-label="Share this space"
      title={copied ? "Link copied!" : "Share this space"}
      className={`flex items-center justify-center w-8 h-8 rounded-full
        bg-black/30 backdrop-blur-sm text-white/60 hover:bg-white/20 hover:text-white
        transition-all duration-200 ${copied ? "text-[#7B9E87]" : ""} ${className}`}
    >
      {copied ? <Check size={13} /> : <LinkIcon size={13} />}
    </button>
  );
}
