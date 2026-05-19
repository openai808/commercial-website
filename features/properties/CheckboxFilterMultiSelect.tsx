"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export type FilterOptionCount = {
  value: string;
  label: string;
  count: number;
};

const fieldLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-[#000759]";

const underlineFieldClass = "relative w-full border-b border-[#000759]";

const triggerButtonClass =
  "flex w-full items-center justify-between gap-2 border-0 bg-transparent pb-2.5 pt-1 text-left text-base text-[#000759] outline-none";

const fieldIconClass =
  "pointer-events-none shrink-0 translate-y-px text-[#000759]";

function ChevronIcon({
  direction,
  className,
}: {
  direction: "up" | "down";
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d={direction === "down" ? "M6 9l6 6 6-6" : "M6 15l6-6 6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function slugify(value: string): string {
  return value.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
}

function getTriggerLabel(
  placeholder: string,
  selectedValues: string[],
  multipleLabel: string,
  labelsByValue: Map<string, string>,
): string {
  if (selectedValues.length === 0) return placeholder;
  if (selectedValues.length === 1) {
    const value = selectedValues[0]!;
    return labelsByValue.get(value) ?? value;
  }
  return `${selectedValues.length} ${multipleLabel}`;
}

type CheckboxFilterMultiSelectProps = {
  label: string;
  placeholder: string;
  emptyMessage: string;
  inputName: string;
  multipleLabel: string;
  options: FilterOptionCount[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
};

export default function CheckboxFilterMultiSelect({
  label,
  placeholder,
  emptyMessage,
  inputName,
  multipleLabel,
  options,
  selectedValues,
  onChange,
}: CheckboxFilterMultiSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedSet = new Set(selectedValues);
  const labelsByValue = useMemo(
    () => new Map(options.map((option) => [option.value, option.label])),
    [options],
  );
  const triggerLabel = getTriggerLabel(
    placeholder,
    selectedValues,
    multipleLabel,
    labelsByValue,
  );

  const toggleValue = (value: string) => {
    if (selectedSet.has(value)) {
      onChange(selectedValues.filter((item) => item !== value));
      return;
    }
    onChange([...selectedValues, value]);
  };

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
    if (event.key === "Escape") setOpen(false);
  };

  return (
    <div ref={rootRef} className="flex min-w-0 flex-col gap-1.5">
      <span className={fieldLabelClass}>{label}</span>
      <div className={underlineFieldClass}>
        <button
          type="button"
          className={triggerButtonClass}
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          onClick={() => setOpen((value) => !value)}
          onKeyDown={handleTriggerKeyDown}
        >
          <span>{triggerLabel}</span>
          <span className={fieldIconClass} aria-hidden>
            <ChevronIcon
              direction={open ? "up" : "down"}
              className="h-5 w-5"
            />
          </span>
        </button>

        {open ? (
          <ul
            id={listboxId}
            className="absolute left-0 right-0 top-full z-20 mt-0 max-h-64 overflow-y-auto border border-[#000759] bg-white py-1 shadow-sm"
          >
            {options.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[#000759]/70">
                {emptyMessage}
              </li>
            ) : (
              options.map(({ value, label: optionLabel, count }) => {
                const checked = selectedSet.has(value);
                const optionId = `${listboxId}-${slugify(value)}`;
                return (
                  <li key={value}>
                    <label
                      htmlFor={optionId}
                      className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-base text-[#000759] hover:bg-[#000759]/5"
                    >
                      <input
                        id={optionId}
                        type="checkbox"
                        name={inputName}
                        value={value}
                        checked={checked}
                        onChange={() => toggleValue(value)}
                        className="h-4 w-4 shrink-0 rounded-none border border-[#000759] accent-[#000759]"
                      />
                      <span>
                        {optionLabel}{" "}
                        <span className="text-[#000759]">({count})</span>
                      </span>
                    </label>
                  </li>
                );
              })
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
