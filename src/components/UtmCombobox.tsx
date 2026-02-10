import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

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
      <label className="w-32 shrink-0 text-sm font-medium text-white">
        {label}
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
