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
  const response = await fetch("/api/notion-proxy", { method: "POST" });

  if (!response.ok) {
    throw new Error(`Failed to fetch Notion data: ${response.status}`);
  }

  const data: NotionQueryResponse = await response.json();

  return data.results
    .map((page) => {
      const titreProperty = page.properties["Titre"];
      const urlProperty = Object.values(page.properties).find(
        (p) => p.type === "url"
      );

      const name =
        titreProperty?.rich_text?.map((t) => t.plain_text).join("") ?? "";
      const url = urlProperty?.url ?? "https://example.com";

      return { id: page.id, name, url };
    })
    .filter((link) => link.name !== "");
}

export interface UtmEntry {
  name: string;
  utmType: string;
}

export async function fetchUtmOptions(): Promise<Record<string, string[]>> {
  const response = await fetch("/api/notion-utm", { method: "POST" });

  if (!response.ok) {
    throw new Error(`Failed to fetch UTM options: ${response.status}`);
  }

  const data: NotionQueryResponse = await response.json();

  const grouped: Record<string, string[]> = {
    utm_source: [],
    utm_medium: [],
    utm_campaign: [],
    utm_content: [],
    utm_term: [],
  };

  for (const page of data.results) {
    const props = page.properties;

    const nomProp = props["Nom"];
    const name =
      nomProp?.title?.map((t) => t.plain_text).join("") ?? "";

    const utmTypeProp = props["UTM-Type"] as { type: string; select?: { name: string } | null };
    const utmType = utmTypeProp?.select?.name ?? "";

    if (name && utmType && utmType in grouped) {
      grouped[utmType].push(name);
    }
  }

  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => a.localeCompare(b));
  }

  return grouped;
}
