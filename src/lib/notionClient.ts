export interface NotionLink {
  id: string;
  name: string;
  url: string;
}

interface NotionRichText {
  plain_text: string;
}

interface NotionPage {
  id: string;
  properties: Record<
    string,
    {
      type: string;
      title?: NotionRichText[];
      url?: string | null;
      rich_text?: NotionRichText[];
    }
  >;
}

interface NotionQueryResponse {
  results: NotionPage[];
}

export async function fetchNotionLinks(): Promise<NotionLink[]> {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("VITE_NOTION_DATABASE_ID is not configured");
  }

  const response = await fetch("/api/notion-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ databaseId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Notion data: ${response.status}`);
  }

  const data: NotionQueryResponse = await response.json();

  return data.results
    .map((page) => {
      const nameProperty = Object.values(page.properties).find(
        (p) => p.type === "title"
      );
      const urlProperty = Object.values(page.properties).find(
        (p) => p.type === "url"
      );

      const name =
        nameProperty?.title?.map((t) => t.plain_text).join("") ?? "";
      const url = urlProperty?.url ?? "";

      return { id: page.id, name, url };
    })
    .filter((link) => link.url !== "");
}
