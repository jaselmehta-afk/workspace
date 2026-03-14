import { notFound } from "next/navigation";
import { spaces } from "@/data/spaces";
import SpaceDetailClient from "./SpaceDetailClient";

export async function generateStaticParams() {
  return spaces.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const space = spaces.find((s) => s.slug === slug);
  if (!space) return {};
  return {
    title: `${space.name} — ${space.neighbourhood} | Workspace`,
    description: space.description,
  };
}

export default async function SpaceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const space = spaces.find((s) => s.slug === slug);
  if (!space) notFound();
  const similar = spaces.filter((s) => s.id !== space.id && (s.area === space.area || s.type.some((t) => space.type.includes(t)))).slice(0, 3);
  return <SpaceDetailClient space={space} similar={similar} />;
}
