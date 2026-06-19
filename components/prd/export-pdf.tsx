"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const A4_WIDTH_MM = 210;

export async function exportPreviewToPdf(
  container: HTMLElement,
  filename: string
) {
  const pageNodes = Array.from(
    container.querySelectorAll<HTMLElement>("[data-pdf-page]")
  );
  if (pageNodes.length === 0) {
    throw new Error("No pages found to export.");
  }

  // ── Patch elements for export ────────────────────────────────────────
  const pills = Array.from(
    container.querySelectorAll<HTMLElement>("[class*='pill']")
  );
  const coverConfidential = Array.from(
    container.querySelectorAll<HTMLElement>("[class*='coverConfidential']")
  );
  const secNums = Array.from(
    container.querySelectorAll<HTMLElement>("[class*='secNum']")
  );
  const secH2s = Array.from(
    container.querySelectorAll<HTMLElement>("[class*='secHeading'] h2")
  );

  const origPillPaddingBottom = pills.map((el) => el.style.paddingBottom);
  const origCoverConfidentialPaddingBottom = coverConfidential.map((el) => el.style.paddingBottom);
  const origSecNumMarginTop = secNums.map((el) => el.style.marginTop);
  const origSecNumPaddingTop = secNums.map((el) => el.style.paddingTop); // ← was paddingBottom
  const origSecNumAlign = secNums.map((el) => el.style.alignItems);
  const origH2MarginBottom = secH2s.map((el) => el.style.marginBottom);

  pills.forEach((el) => (el.style.paddingBottom = "12px"));
  coverConfidential.forEach((el) => (el.style.paddingBottom = "12px"));
  secNums.forEach((el) => {
    el.style.marginTop = "10px";
    el.style.paddingTop = "-5px"; // ✅ this lifts the number UP
    el.style.alignItems = "start"; // ✅ this aligns the number to the top of the section title
  });
  secH2s.forEach((el) => (el.style.marginBottom = "5px"));
  // ────────────────────────────────────────────────────────────────────

  const SCALE = 3;
  let pdf: InstanceType<typeof jsPDF> | null = null;

  try {
    for (let i = 0; i < pageNodes.length; i++) {
      const node = pageNodes[i];

      const canvas = await html2canvas(node, {
        scale: SCALE,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: node.scrollWidth,
        windowHeight: node.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);

      const naturalWidthPx = node.scrollWidth;
      const naturalHeightPx = node.scrollHeight;
      const pageHeightMM = (naturalHeightPx / naturalWidthPx) * A4_WIDTH_MM;

      if (i === 0) {
        pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: [A4_WIDTH_MM, pageHeightMM],
          compress: true,
        });
      } else {
        pdf!.addPage([A4_WIDTH_MM, pageHeightMM], "portrait");
      }

      pdf!.addImage(
        imgData,
        "JPEG",
        0,
        0,
        A4_WIDTH_MM,
        pageHeightMM,
        undefined,
        "FAST"
      );
    }
  } finally {
    // ── Always restore, even if export threw ─────────────────────────
    pills.forEach((el, i) => (el.style.paddingBottom = origPillPaddingBottom[i]));
    coverConfidential.forEach((el, i) => (el.style.paddingBottom = origCoverConfidentialPaddingBottom[i]));
    secNums.forEach((el, i) => {
      el.style.marginTop = origSecNumMarginTop[i];
      el.style.paddingTop = origSecNumPaddingTop[i];
      el.style.alignItems = origSecNumAlign[i];
    });
    secH2s.forEach((el, i) => (el.style.marginBottom = origH2MarginBottom[i]));
    // ─────────────────────────────────────────────────────────────────
  }

  if (!pdf) return;
  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}