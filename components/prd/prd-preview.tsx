"use client";


import { usePagination } from "@/hooks/use-pagination";
import styles from "@/styles/prd-theme.module.css";
import { PRDDocument } from "@/types/prd";
import { SectionHeading, BlockRenderer } from "./block-renderer";
import { CoverPage, ContentPage } from "./prd-pages";

/**
 * Off-screen measuring pass: renders every section full-width, identical
 * markup to the real page, so usePagination can read true heights before
 * committing to a page layout. Kept visually hidden but laid out (not
 * display:none) so getBoundingClientRect returns real numbers.
 */
function MeasureLayer({
  doc,
  measureRef,
}: Readonly<{
  doc: PRDDocument;
  measureRef: React.RefObject<HTMLDivElement | null>;
}>) {
  return (
    <div
      ref={measureRef}
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: -99999,
        width: "210mm",
        visibility: "hidden",
        pointerEvents: "none",
      }}
    >
      <div className={styles.page} style={{ boxShadow: "none", minHeight: 0 }}>
        <div style={{ padding: "0 14mm" }}>
          {doc.sections.map((section) => (
            <div key={section.id} data-measure-id={section.id}>
              <SectionHeading section={section} />
              <BlockRenderer section={section} />
              <hr className={styles.dividerThick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PRDPreview({ doc }: Readonly<{ doc: PRDDocument }>) {
  const { pages, measureRef } = usePagination(doc.sections);
  const totalPages = pages.length + 1; // +1 for cover

  return (
    <div className="flex flex-col items-center gap-8">
      <MeasureLayer doc={doc} measureRef={measureRef} />

      <CoverPage brand={doc.brand} cover={doc.cover} />

      {pages.map((page, idx) => (
        <ContentPage
          key={idx}
          brand={doc.brand}
          docTitle={`${doc.cover.titleLine1} ${doc.cover.titleLine2} – PRD`}
          docVersion={`Version ${doc.cover.docVersion} \u00A0|\u00A0 ${doc.cover.preparedFor}`}
          footerDocLabel={doc.footerDocLabel}
          sections={page.sections}
          pageNumber={idx + 2}
          totalPages={totalPages}
        />
      ))}
    </div>
  );
}