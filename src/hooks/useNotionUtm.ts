import { useCallback, useEffect, useState } from "react";
import { fetchUtmOptions } from "../lib/notionClient";

const emptyOptions: Record<string, string[]> = {
  utm_source: [],
  utm_medium: [],
  utm_campaign: [],
  utm_content: [],
  utm_term: [],
};

export function useNotionUtm() {
  const [utmOptions, setUtmOptions] = useState<Record<string, string[]>>(emptyOptions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUtmOptions();
      setUtmOptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { utmOptions, loading, error, retry: load };
}
