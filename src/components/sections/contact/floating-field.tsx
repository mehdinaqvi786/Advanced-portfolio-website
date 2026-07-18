"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

type FloatingFieldProps = {
  id?: string;
  name: string;
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
};

/**
 * Floating-label field prepared for future form libraries / Supabase payloads.
 */
export function FloatingField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required,
  autoComplete,
  multiline = false,
  rows = 5,
  disabled = false,
}: FloatingFieldProps) {
  const reactId = useId();
  const fieldId = id ?? `${name}-${reactId}`;
  const errorId = `${fieldId}-error`;
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const fieldClassName = cn(
    "peer w-full rounded-2xl border bg-background/40 px-4 pt-6 pb-2 text-sm text-foreground shadow-sm backdrop-blur-md outline-none transition-all",
    "placeholder:text-transparent",
    "focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-primary/20",
    "disabled:cursor-not-allowed disabled:opacity-60",
    error
      ? "border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20"
      : "border-border/60 hover:border-primary/30"
  );

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={fieldId}
          name={name}
          rows={rows}
          value={value}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldClassName, "min-h-36 resize-y")}
          placeholder={label}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={fieldClassName}
          placeholder={label}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
        />
      )}

      <label
        htmlFor={fieldId}
        className={cn(
          "pointer-events-none absolute left-4 text-muted-foreground transition-all duration-200",
          floated
            ? "top-2 text-[0.68rem] font-medium tracking-wide text-primary"
            : "top-1/2 -translate-y-1/2 text-sm",
          multiline && !floated && "top-5 translate-y-0"
        )}
      >
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 text-xs font-medium text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
