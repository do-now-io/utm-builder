import { useCallback, useState } from "react";

interface CopyButtonProps {
  url: string | null;
}

export function CopyButton({ url }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  return (
    <button
      onClick={handleCopy}
      disabled={!url}
      className="w-full cursor-pointer rounded-xl bg-[#65FFB2] px-6 py-3 text-sm font-bold text-[#004F28] shadow-sm transition-all hover:bg-[#7dffbf] hover:shadow-[0_0_20px_rgba(101,255,178,0.25)] focus:ring-2 focus:ring-[#65FFB2]/30 focus:outline-none disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/30 disabled:shadow-none"
    >
      {copied ? "Copié !" : "Copier le lien"}
    </button>
  );
}
