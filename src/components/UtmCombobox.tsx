import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

const tooltips: Record<string, string> = {
  utm_source: "L'origine : identifie la source d'origine du clic (ex: linkedin, emailing, offline). C'est la base de vos rapports d'acquisition.",
  utm_medium: "Le vecteur : définit la nature technique du lien (ex: social, email, qr). Attention : GA4 utilise ce champ pour classer le trafic. Une erreur (ex: mail au lieu de email) rend la donnée illisible.",
  utm_campaign: "L'intention : regroupe les clics sous un objectif stratégique (2026-02_k8s_dd). Permet de mesurer le succès d'une opération/campagne sur plusieurs canaux.",
  utm_content: "Le déclencheur : identifie l'élément précis cliqué (comment, signature, mail_n1). Utile pour l'A/B testing et l'optimisation.",
  utm_term: "Le mot-clé : réservé exclusivement au Search Payant (Ads). Ne jamais utiliser pour du contenu organique ou des emails.",
};

interface UtmComboboxProps {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export function UtmCombobox({
  label,
  options,
  value,
  onChange,
}: UtmComboboxProps) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <label className="flex w-36 shrink-0 items-center gap-1.5 text-sm font-medium text-white">
        {label}
        <span className="group relative cursor-help text-white/40 hover:text-white/70 transition-colors">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="pointer-events-none absolute bottom-full left-0 mb-2 w-64 rounded-lg bg-[#7253FF] px-3 py-2 text-xs leading-relaxed text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-20">
            {tooltips[label]}
          </span>
        </span>
      </label>
      <Combobox
        value={value}
        onChange={(v) => onChange(v ?? "")}
        onClose={() => setQuery("")}
        immediate
      >
        <div className="relative flex-1">
          <ComboboxInput
            className="w-full rounded-xl border border-white/15 bg-white/10 py-2 pl-3 pr-8 text-sm text-white placeholder-white/40 outline-none transition-all focus:border-[#65FFB2]/50 focus:ring-2 focus:ring-[#65FFB2]/20"
            placeholder={`Choisir ${label}...`}
            displayValue={(v: string) => v}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-4 w-4 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </ComboboxButton>

          <ComboboxOptions className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-white/10 bg-[#003d1f] p-1 text-sm shadow-xl">
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-white/50">Aucune option.</div>
            ) : (
              filtered.map((opt) => (
                <ComboboxOption
                  key={opt}
                  value={opt}
                  className="cursor-pointer select-none rounded-lg px-3 py-2 text-white transition-colors data-[focus]:bg-white/10"
                >
                  {opt}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
