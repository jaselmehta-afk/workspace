import SpacesClient from "./SpacesClient";

export const metadata = {
  title: "Find Office Space in London | Workspace",
  description: "Browse 60+ flexible office spaces, coworking spaces and studios across London. Filter by location, team size and amenities.",
};

export default function SpacesPage() {
  return <SpacesClient />;
}
