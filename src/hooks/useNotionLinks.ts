import { useCallback, useEffect, useState } from "react";
import { fetchNotionLinks, type NotionLink } from "../lib/notionClient";

export function useNotionLinks() {
  const [links, setLinks] = useState<NotionLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNotionLinks();
      setLinks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { links, loading, error, retry: load };
}
