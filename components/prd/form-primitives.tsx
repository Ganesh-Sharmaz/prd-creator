"use client";

import { ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

export function Field({
  label,
  children,
}: Readonly<{
  label: string;
  children: ReactNode;
}>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-neutral-500">{label}</span>
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-400 placeholder:text-neutral-400";

export function TextInput(props: Readonly<React.InputHTMLAttributes<HTMLInputElement>>) {
  return <input {...props} className={inputBase + " " + (props.className ?? "")} />;
}

export function TextArea(props: Readonly<React.TextareaHTMLAttributes<HTMLTextAreaElement>>) {
  return (
    <textarea
      {...props}
      className={inputBase + " resize-none " + (props.className ?? "")}
    />
  );
}

export function IconButton({
  onClick,
  title,
  variant = "default",
  children,
}: Readonly<{
  onClick: () => void;
  title: string;
  variant?: "default" | "danger";
  children: ReactNode;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={
        "flex h-7 w-7 items-center justify-center rounded-md transition-colors " +
        (variant === "danger"
          ? "text-neutral-400 hover:bg-red-50 hover:text-red-500"
          : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700")
      }
    >
      {children}
    </button>
  );
}

export function AddRowButton({ onClick, label }: Readonly<{ onClick: () => void; label: string }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
    >
      <Plus size={13} />
      {label}
    </button>
  );
}

export function RemoveRowButton({ onClick }: Readonly<{ onClick: () => void }>) {
  return <IconButton onClick={onClick} title="Remove" variant="danger"><Trash2 size={13} /></IconButton>;
}