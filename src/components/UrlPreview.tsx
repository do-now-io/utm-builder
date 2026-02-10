interface UrlPreviewProps {
  url: string | null;
}

function ColorizedUrl({ url }: { url: string }) {
  try {
    const parsed = new URL(url);
    const baseUrl = `${parsed.origin}${parsed.pathname}`;
    const params = Array.from(parsed.searchParams.entries());

    return (
      <>
        <span className="text-[#65FFB2]">{baseUrl}</span>
        {params.map(([key, value], i) => (
          <span key={key}>
            <span className="text-white/40">{i === 0 ? "?" : "&"}</span>
            <span className="text-white/40">{key}=</span>
            <span className="text-[#65FFB2]">{value}</span>
          </span>
        ))}
      </>
    );
  } catch {
    return <span className="text-white">{url}</span>;
  }
}

export function UrlPreview({ url }: UrlPreviewProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="mb-2 text-xs font-medium tracking-wide text-white/50 uppercase">
        Aperçu
      </p>
      {url ? (
        <p className="break-all text-sm font-mono text-white">
          <ColorizedUrl url={url} />
        </p>
      ) : (
        <p className="text-sm text-white/30 italic">
          Sélectionnez un lien pour voir l'aperçu.
        </p>
      )}
    </div>
  );
}
