interface UrlPreviewProps {
  url: string | null;
}

export function UrlPreview({ url }: UrlPreviewProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
        Aperçu
      </p>
      {url ? (
        <p className="break-all text-sm font-mono text-gray-800">{url}</p>
      ) : (
        <p className="text-sm text-gray-400 italic">
          Sélectionnez un lien pour voir l'aperçu.
        </p>
      )}
    </div>
  );
}
