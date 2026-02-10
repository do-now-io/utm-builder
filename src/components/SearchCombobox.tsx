import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import type { NotionLink } from "../lib/notionClient";

interface SearchComboboxProps {
  links: NotionLink[];
  selected: NotionLink | null;
  onSelect: (link: NotionLink | null) => void;
}

export function SearchCombobox({
  links,
  selected,
  onSelect,
}: SearchComboboxProps) {
  const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? links
      : links.filter(
          (link) =>
            link.name.toLowerCase().includes(query.toLowerCase()) ||
            link.url.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <Combobox value={selected} onChange={onSelect} onClose={() => setQuery("")} immediate>
      <div className="relative">
        <div className="relative">
          <ComboboxInput
            className="w-full rounded-xl border border-white/15 bg-white/10 py-3 pl-10 pr-10 text-sm text-white placeholder-white/40 outline-none transition-all focus:border-[#65FFB2]/50 focus:ring-2 focus:ring-[#65FFB2]/20"
            placeholder="Rechercher un lien..."
            displayValue={(link: NotionLink | null) => link?.name ?? ""}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-5 w-5 text-white/40"
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
        </div>

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-[#003d1f] p-1 text-sm shadow-xl">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-white/50">Aucun lien trouvé.</div>
          ) : (
            filtered.map((link) => (
              <ComboboxOption
                key={link.id}
                value={link}
                className="cursor-pointer select-none rounded-lg px-4 py-3 transition-colors data-[focus]:bg-white/10"
              >
                <div className="font-medium text-white">{link.name}</div>
                <div className="truncate text-xs text-white/40">
                  {link.url}
                </div>
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
