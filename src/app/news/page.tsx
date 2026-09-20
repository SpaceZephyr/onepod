import { getAllNewsItems } from "@/lib/news";
import NewsFeed from "./NewsFeed";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewsPage() {
  const items = await getAllNewsItems();
  return <NewsFeed items={items} />;
}
