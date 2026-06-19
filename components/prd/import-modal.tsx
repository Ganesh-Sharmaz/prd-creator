"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ClipboardCopy, FileJson, Sparkles, X, AlertTriangle, ArrowLeft } from "lucide-react";
import { buildAiImportPrompt } from "@/lib/ai-prompt-template";
import { parseAndValidatePrdDocument } from "@/lib/validate-prd-document";
import { PRDDocument } from "@/types/prd";

type Step = "prompt" | "paste";

export function ImportModal({
  onImport,
  onCancel,
}: Readonly<{
  onImport: (doc: PRDDocument) => void;
  onCancel: () => void;
}>) {
  const [step, setStep] = useState<Step>("prompt");
  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const prompt = buildAiImportPrompt();

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
        setStep("paste");
      }, 800);
    } catch {
      // Clipboard API can fail (permissions, insecure context). Fall back
      // silently — the textarea below is still selectable/copyable by hand.
    }
  }

  function handleValidate() {
    if (!pasted.trim()) {
      setErrors(["Paste the JSON the AI gave you first."]);
      return;
    }
    const result = parseAndValidatePrdDocument(pasted);
    if (!result.ok) {
      setErrors(result.ok === false ? result.errors : []);
      return;
    }
    setErrors([]);
    onImport(result.doc);
    setPasted("");
    setErrors([]);
  }

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative mx-4 flex max-h-[85vh] w-full max-w-lg flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors"
        >
          <X size={15} />
        </button>

        {/* Icon + heading */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">
              {step === "prompt" ? "Import with AI" : "Paste your JSON"}
            </h2>
            <p className="text-xs text-neutral-400">
              {step === "prompt"
                ? "Generate a document by describing your project to Claude or ChatGPT"
                : "Paste the JSON the AI returned"}
            </p>
          </div>
        </div>

        {step === "prompt" ? (
          <>
            <div className="mb-3 flex flex-col gap-2 text-xs text-neutral-500">
              <Step n={1} text="Copy the prompt below." />
              <Step n={2} text="Paste it into Claude or ChatGPT, then describe your project — company, what you're building, who it's for, budget, timeline. Give as much or as little as you know." />
              <Step n={3} text="Copy the JSON it returns and paste it back here." />
            </div>

            <div className="relative mb-4 flex-1 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
              <textarea
                readOnly
                value={prompt}
                className="h-56 w-full resize-none bg-transparent p-3 font-mono text-[10.5px] leading-relaxed text-neutral-600 outline-none"
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  <>
                    <ClipboardCopy size={14} /> Copy prompt
                  </>
                )}
              </motion.button>
            </div>

            <button
              type="button"
              onClick={() => setStep("paste")}
              className="mt-3 text-center text-xs font-medium text-neutral-400 hover:text-neutral-700"
            >
              I already have the JSON →
            </button>
          </>
        ) : (
          <>
            <div className="mb-3">
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                <FileJson size={13} />
                Paste the JSON here
              </label>
              <textarea
                autoFocus
                value={pasted}
                onChange={(e) => {
                  setPasted(e.target.value);
                  if (errors.length) setErrors([]);
                }}
                placeholder='{ "id": "...", "brand": { ... }, "cover": { ... }, "sections": [ ... ] }'
                className="h-56 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-3 font-mono text-[10.5px] leading-relaxed text-neutral-800 outline-none transition focus:border-neutral-400 focus:bg-white"
                spellCheck={false}
              />
            </div>

            <AnimatePresence>
              {errors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 overflow-hidden rounded-xl border border-red-200 bg-red-50 p-3"
                >
                  <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                    <AlertTriangle size={13} />
                    Couldn&apos;t import this JSON
                  </div>
                  <ul className="ml-1 list-disc space-y-0.5 pl-3 text-[11px] leading-relaxed text-red-500">
                    {errors.slice(0, 6).map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                    {errors.length > 6 && (
                      <li>...and {errors.length - 6} more issue(s)</li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep("prompt")}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={handleValidate}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
              >
                <Check size={14} />
                Import document
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Step({ n, text }: Readonly<{ n: number; text: string }>) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-bold text-white">
        {n}
      </span>
      <span>{text}</span>
    </div>
  );
}