import { useState } from "react";
import { SearchCombobox } from "./components/SearchCombobox";
import { UtmCombobox } from "./components/UtmCombobox";
import { UrlPreview } from "./components/UrlPreview";
import { CopyButton } from "./components/CopyButton";
import { useNotionLinks } from "./hooks/useNotionLinks";
import { utmOptions, type UtmKey } from "./config/utmOptions";
import { buildUtmUrl } from "./lib/buildUrl";
import type { NotionLink } from "./lib/notionClient";

const utmKeys: UtmKey[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

function App() {
  const { links, loading, error, retry } = useNotionLinks();
  const [selectedLink, setSelectedLink] = useState<NotionLink | null>(null);
  const [utmValues, setUtmValues] = useState<Record<UtmKey, string>>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  const finalUrl =
    selectedLink?.url
      ? buildUtmUrl(selectedLink.url, utmValues)
      : null;

  const handleUtmChange = (key: UtmKey, value: string) => {
    setUtmValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
          UTM Builder
        </h1>

        <div className="space-y-6 rounded-xl bg-white p-6 shadow-sm sm:p-8">
          {/* Search section */}
          <section>
            <h2 className="mb-3 text-sm font-medium text-gray-700">
              Lien de destination
            </h2>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                <span className="ml-3 text-sm text-gray-500">
                  Chargement des liens...
                </span>
              </div>
            ) : error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                <p className="mb-2 text-sm text-red-700">{error}</p>
                <button
                  onClick={retry}
                  className="cursor-pointer text-sm font-medium text-red-600 underline hover:text-red-800"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <SearchCombobox
                links={links}
                selected={selectedLink}
                onSelect={setSelectedLink}
              />
            )}
          </section>

          {/* UTM Parameters */}
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-gray-700">
              Paramètres UTM
            </h2>
            {utmKeys.map((key) => (
              <UtmCombobox
                key={key}
                label={key}
                options={utmOptions[key]}
                value={utmValues[key]}
                onChange={(v) => handleUtmChange(key, v)}
              />
            ))}
          </section>

          {/* Preview */}
          <section>
            <UrlPreview url={finalUrl} />
          </section>

          {/* Copy button */}
          <section>
            <CopyButton url={finalUrl} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
