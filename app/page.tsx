"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileStack, Layers, Loader2, FileText, X, Sparkles } from "lucide-react";

import { CoverEditor } from "@/components/prd/cover-editor";
import { SectionListEditor } from "@/components/prd/section-list-editor";
import { PRDPreview } from "@/components/prd/prd-preview";
import { exportPreviewToPdf } from "@/components/prd/export-pdf";
import { PRDDocument } from "@/types/prd";
import { defaultDocument, emptyDocument } from "@/lib/default-document";
import { ImportModal } from "@/components/prd/import-modal";

type Tab = "cover" | "sections";

const SUFFIX = "_PRD_BY_QUANTUMTECH_DIGITAL";

// ── Filename modal ────────────────────────────────────────────────────────────
function FilenameModal({
  onConfirm,
  onCancel,
}: Readonly<{
  onConfirm: (name: string) => void;
  onCancel: () => void;
}>) {
  const [raw, setRaw] = useState("");

  const uppercased = raw.toUpperCase().replace(/[^A-Z0-9_\- ]/g, "");
  const sanitized = uppercased.trim().replace(/\s+/g, "_");
  const preview = sanitized ? `${sanitized}${SUFFIX}.pdf` : `YOUR_FILE_NAME${SUFFIX}.pdf`;

  function handleConfirm() {
    const finalName = sanitized || "PRD";
    onConfirm(`${finalName}${SUFFIX}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") onCancel();
  }

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="relative mx-4 w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl"
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
            <FileText size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">Save as PDF</h2>
            <p className="text-xs text-neutral-400">Enter a name for your document</p>
          </div>
        </div>

        {/* Input */}
        <div className="mb-3">
          <label className="mb-1.5 block text-xs font-medium text-neutral-600">
            File name
          </label>
          <input
            autoFocus
            type="text"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. CUSTOM PDF CREATOR"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-mono text-neutral-900 placeholder-neutral-300 outline-none ring-0 transition focus:border-neutral-400 focus:bg-white uppercase tracking-wide"
            spellCheck={false}
          />
        </div>

        {/* Live preview */}
        <div className="mb-5 rounded-lg border border-dashed border-neutral-200 bg-neutral-50 px-3 py-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 mb-0.5">Final filename</p>
          <p className="truncate text-xs font-mono text-neutral-700 leading-relaxed">
            {sanitized ? (
              <>
                <span className="text-neutral-900 font-semibold">{sanitized}</span>
                <span className="text-neutral-400">{SUFFIX}</span>
                <span className="text-neutral-400">.pdf</span>
              </>
            ) : (
              <span className="text-neutral-300 italic">{preview}</span>
            )}
          </p>
        </div>

        {/* Actions */}
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
            onClick={handleConfirm}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors"
          >
            <Download size={14} />
            Save PDF
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [doc, setDoc] = useState<PRDDocument>(defaultDocument);
  const [tab, setTab] = useState<Tab>("cover");
  const [showModal, setShowModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  async function handleExport(filename: string) {
    if (!previewRef.current) return;
    setShowModal(false);
    setExporting(true);
    try {
      await exportPreviewToPdf(previewRef.current, filename);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while generating the PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {showImportModal && (
          <ImportModal
            onCancel={() => setShowImportModal(false)}
            onImport={(importedDoc) => {
              setDoc(importedDoc);
              setShowImportModal(false);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <FilenameModal
            onConfirm={handleExport}
            onCancel={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && (
          <FilenameModal
            onConfirm={handleExport}
            onCancel={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex h-screen w-full overflow-hidden bg-neutral-50">
        {/* ── Left: Editor panel ──────────────────────────────────────────── */}
        <div className="flex w-[500px] shrink-0 flex-col border-r border-neutral-200 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <div>
              <h1 className="text-sm font-semibold text-neutral-900">PRD Generator</h1>
              <p className="text-xs text-neutral-400">Fill in details, preview updates live</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowImportModal(true)}
                className="group flex items-center gap-2 rounded-md bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              >
                <Sparkles
                  size={14}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
                Generate with AI
              </button>

              <button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      "Start a new blank document? Unsaved changes will be lost."
                    )
                  ) {
                    setDoc(emptyDocument());
                  }
                }}
                className="text-xs font-medium text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                New
              </button>
            </div>
          </div>

          <div className="flex gap-1 border-b border-neutral-100 px-5 pt-3">
            <TabButton active={tab === "cover"} onClick={() => setTab("cover")} icon={<FileStack size={13} />} label="Cover & Brand" />
            <TabButton active={tab === "sections"} onClick={() => setTab("sections")} icon={<Layers size={13} />} label="Sections" />
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {tab === "cover" ? (
              <CoverEditor doc={doc} onChange={setDoc} />
            ) : (
              <SectionListEditor doc={doc} onChange={setDoc} />
            )}
          </div>

          <div className="border-t border-neutral-100 p-4">
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              disabled={exporting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
            >
              {exporting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Generating PDF…
                </>
              ) : (
                <>
                  <Download size={15} />
                  Save as PDF
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* ── Right: Live A4 preview ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-center px-8 py-10">
            <div ref={previewRef}>
              <PRDPreview doc={doc} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: Readonly<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors " +
        (active ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600")
      }
    >
      {icon}
      {label}
      {active && (
        <motion.div
          layoutId="tab-underline"
          className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-neutral-900"
        />
      )}
    </button>
  );
}