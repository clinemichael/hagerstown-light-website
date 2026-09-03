"use client";

export function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm";

export function TextInput({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      className={inputClass}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 2,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      className={inputClass}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Select({
  value,
  onChange,
  options,
  placeholder = "— select —",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      className={inputClass}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function CheckboxChips({
  options,
  selected,
  onChange,
}: {
  options: string[] | { code: string; label: string }[];
  selected: string[];
  onChange: (keys: string[]) => void;
}) {
  const normalized = options.map((o) =>
    typeof o === "string" ? { code: o, label: o } : o
  );

  const toggle = (code: string) => {
    if (selected.includes(code)) {
      onChange(selected.filter((k) => k !== code));
    } else {
      onChange([...selected, code]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {normalized.map((o) => {
        const active = selected.includes(o.code);
        return (
          <button
            key={o.code}
            type="button"
            onClick={() => toggle(o.code)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${
              active
                ? "bg-brand-blue text-white border-brand-blue"
                : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold text-brand-blue mb-4">
      {title}
    </h2>
  );
}

export function withDefaults<T extends Record<string, unknown>>(
  base: T,
  override?: Partial<{ [K in keyof T]: T[K] | null }> | null
): T {
  const result = { ...base } as Record<string, unknown>;
  if (override) {
    for (const key of Object.keys(base)) {
      const value = (override as Record<string, unknown>)[key];
      if (value !== null && value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result as T;
}

export function FaultRow({
  faultLabel = "Was Driver at Fault?",
  fault,
  onFault,
  preventableLabel = "Was Accident Preventable?",
  preventable,
  onPreventable,
}: {
  faultLabel?: string;
  fault: string;
  onFault: (v: string) => void;
  preventableLabel?: string;
  preventable: string;
  onPreventable: (v: string) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label={faultLabel}>
        <Select value={fault} onChange={onFault} options={["Yes", "No", "Undetermined"]} />
      </Field>
      <Field label={preventableLabel}>
        <Select
          value={preventable}
          onChange={onPreventable}
          options={["Yes", "No", "Undetermined"]}
        />
      </Field>
    </div>
  );
}

export function SignOffRow({
  signature,
  onSignature,
  date,
  onDate,
  signatureLabel = "Signature",
  dateLabel = "Date",
}: {
  signature: string;
  onSignature: (v: string) => void;
  date: string;
  onDate: (v: string) => void;
  signatureLabel?: string;
  dateLabel?: string;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field label={`${signatureLabel} (type name to confirm)`}>
        <TextInput value={signature} onChange={onSignature} />
      </Field>
      <Field label={dateLabel}>
        <TextInput type="date" value={date} onChange={onDate} />
      </Field>
    </div>
  );
}
