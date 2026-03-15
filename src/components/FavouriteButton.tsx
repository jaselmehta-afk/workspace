"use client";

import { Heart } from "lucide-react";
import { useFavourites } from "@/context/FavouritesContext";

interface Props {
  spaceId: string;
  className?: string;
}

export default function FavouriteButton({ spaceId, className = "" }: Props) {
  const { isFav, toggle } = useFavourites();
  const active = isFav(spaceId);

  return (
    <button
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(spaceId); }}
      aria-label={active ? "Remove from saved" : "Save this space"}
      title={active ? "Remove from saved" : "Save this space"}
      className={`group flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200
        ${active
          ? "bg-[#E8622A] text-white shadow-[0_0_16px_rgba(232,98,42,0.5)]"
          : "bg-black/30 backdrop-blur-sm text-white/60 hover:bg-[#E8622A]/80 hover:text-white"
        } ${className}`}
    >
      <Heart
        size={14}
        fill={active ? "currentColor" : "none"}
        className={`transition-transform duration-150 ${active ? "scale-110" : "group-hover:scale-110"}`}
      />
    </button>
  );
}
