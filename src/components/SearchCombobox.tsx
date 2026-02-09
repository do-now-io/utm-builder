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
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            placeholder="Rechercher un lien..."
            displayValue={(link: NotionLink | null) => link?.name ?? ""}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
              className="h-5 w-5 text-gray-400"
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

        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5">
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-gray-500">Aucun lien trouvé.</div>
          ) : (
            filtered.map((link) => (
              <ComboboxOption
                key={link.id}
                value={link}
                className="cursor-pointer select-none px-4 py-3 data-[focus]:bg-blue-50"
              >
                <div className="font-medium text-gray-900">{link.name}</div>
                <div className="truncate text-xs text-gray-500">
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
