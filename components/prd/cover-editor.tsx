"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { BrandMeta, CoverMeta, PRDDocument } from "@/types/prd";
import { Field, TextInput, TextArea } from "./form-primitives";

export function CoverEditor({
  doc,
  onChange,
}: Readonly<{
  doc: PRDDocument;
  onChange: (doc: PRDDocument) => void;
}>) {
  const fileRef = useRef<HTMLInputElement>(null);

  const updateCover = (patch: Partial<CoverMeta>) => onChange({ ...doc, cover: { ...doc.cover, ...patch } });
  const updateBrand = (patch: Partial<BrandMeta>) => onChange({ ...doc, brand: { ...doc.brand, ...patch } });

  function handleLogoUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => updateBrand({ logoDataUrl: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Brand</h3>

        <Field label="Logo">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
              {doc.brand.logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={doc.brand.logoDataUrl} alt="Logo" className="h-full w-full object-contain" />
              ) : (
                <ImagePlus size={16} className="text-neutral-300" />
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Upload
            </button>
            {doc.brand.logoDataUrl && (
              <button
                type="button"
                onClick={() => updateBrand({ logoDataUrl: undefined })}
                className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-red-50 hover:text-red-500"
              >
                <X size={14} />
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(file);
              }}
            />
          </div>
        </Field>

        <div className="flex gap-2">
          <Field label="Company name">
            <TextInput value={doc.brand.companyName} onChange={(e) => updateBrand({ companyName: e.target.value })} />
          </Field>
        </div>
        <Field label="Tagline">
          <TextInput value={doc.brand.tagline} onChange={(e) => updateBrand({ tagline: e.target.value })} />
        </Field>
        <div className="flex gap-2">
          <Field label="Email">
            <TextInput value={doc.brand.email} onChange={(e) => updateBrand({ email: e.target.value })} />
          </Field>
          <Field label="Phone">
            <TextInput value={doc.brand.phone} onChange={(e) => updateBrand({ phone: e.target.value })} />
          </Field>
        </div>
        <Field label="GSTIN (optional)">
          <TextInput value={doc.brand.gstin} onChange={(e) => updateBrand({ gstin: e.target.value })} />
        </Field>

        <div className="flex gap-2">
          <Field label="Primary color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={doc.brand.primaryColor}
                onChange={(e) => updateBrand({ primaryColor: e.target.value })}
                className="h-8 w-8 cursor-pointer rounded border border-neutral-200 bg-transparent p-0.5"
              />
              <TextInput value={doc.brand.primaryColor} onChange={(e) => updateBrand({ primaryColor: e.target.value })} />
            </div>
          </Field>
          <Field label="Accent color">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={doc.brand.accentColor}
                onChange={(e) => updateBrand({ accentColor: e.target.value })}
                className="h-8 w-8 cursor-pointer rounded border border-neutral-200 bg-transparent p-0.5"
              />
              <TextInput value={doc.brand.accentColor} onChange={(e) => updateBrand({ accentColor: e.target.value })} />
            </div>
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Cover Page</h3>

        <Field label="Kicker">
          <TextInput value={doc.cover.kicker} onChange={(e) => updateCover({ kicker: e.target.value })} />
        </Field>
        <div className="flex gap-2">
          <Field label="Title line 1">
            <TextInput value={doc.cover.titleLine1} onChange={(e) => updateCover({ titleLine1: e.target.value })} />
          </Field>
          <Field label="Title line 2 (accent)">
            <TextInput value={doc.cover.titleLine2} onChange={(e) => updateCover({ titleLine2: e.target.value })} />
          </Field>
        </div>
        <Field label="Subtitle">
          <TextArea rows={3} value={doc.cover.subtitle} onChange={(e) => updateCover({ subtitle: e.target.value })} />
        </Field>

        <div className="grid grid-cols-2 gap-2">
          <Field label="Document version">
            <TextInput value={doc.cover.docVersion} onChange={(e) => updateCover({ docVersion: e.target.value })} />
          </Field>
          <Field label="Delivery timeline">
            <TextInput value={doc.cover.deliveryTimeline} onChange={(e) => updateCover({ deliveryTimeline: e.target.value })} />
          </Field>
          <Field label="Prepared for">
            <TextInput value={doc.cover.preparedFor} onChange={(e) => updateCover({ preparedFor: e.target.value })} />
          </Field>
          <Field label="Technology stack">
            <TextInput value={doc.cover.techStack} onChange={(e) => updateCover({ techStack: e.target.value })} />
          </Field>
          <Field label="Prepared by">
            <TextInput value={doc.cover.preparedBy} onChange={(e) => updateCover({ preparedBy: e.target.value })} />
          </Field>
          <Field label="Project value">
            <TextInput value={doc.cover.projectValue} onChange={(e) => updateCover({ projectValue: e.target.value })} />
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-3 border-t border-neutral-100 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Footer</h3>
        <Field label="Footer document label">
          <TextInput value={doc.footerDocLabel} onChange={(e) => onChange({ ...doc, footerDocLabel: e.target.value })} />
        </Field>
      </section>
    </div>
  );
}