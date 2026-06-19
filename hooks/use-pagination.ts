"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/types/prd";

// A4 body usable height in px at 96dpi-equivalent CSS px, matching
// .pageBody's box: 297mm page - 14mm header - 10mm footer - ~14mm padding
// We measure in mm-converted px (96px/in, 25.4mm/in -> 3.7795 px/mm).
const MM_TO_PX = 3.7795275591;
const PAGE_HEIGHT_MM = 297;
const HEADER_MM = 14;
const FOOTER_MM = 10;
const BODY_PAD_MM = 8 + 6; // top+bottom padding inside .pageBody
const USABLE_HEIGHT_PX =
    (PAGE_HEIGHT_MM - HEADER_MM - FOOTER_MM - BODY_PAD_MM) * MM_TO_PX;

export interface PageOfSections {
    sections: Section[];
}

/**
 * Measures each section's rendered height off-screen, then greedily fills
 * A4 pages so content never visually overflows a page boundary.
 * Falls back to one-section-per-page chunking until measurement completes.
 */
export function usePagination(sections: Section[]) {
    const measureRef = useRef<HTMLDivElement>(null);
    const [pages, setPages] = useState<PageOfSections[]>(
        sections.length ? [{ sections }] : [],
    );
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            const container = measureRef.current;
            if (!container) return;

            const nodes = Array.from(
                container.querySelectorAll<HTMLElement>("[data-measure-id]"),
            );
            const heights = new Map<string, number>();
            nodes.forEach((node) => {
                const id = node.getAttribute("data-measure-id")!;
                heights.set(id, node.getBoundingClientRect().height);
            });

            const result: PageOfSections[] = [];
            let current: Section[] = [];
            let currentHeight = 0;
            const GAP = 24; // approx hr + spacing between sections, px

            for (const sec of sections) {
                const h = heights.get(sec.id) ?? 120;
                const additional = current.length === 0 ? h : h + GAP;

                if (
                    currentHeight + additional > USABLE_HEIGHT_PX &&
                    current.length > 0
                ) {
                    result.push({ sections: current });
                    current = [sec];
                    currentHeight = h;
                } else {
                    current.push(sec);
                    currentHeight += additional;
                }
            }
            if (current.length > 0) result.push({ sections: current });

            setPages(result.length ? result : [{ sections: [] }]);
            setReady(true);
        });

        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(sections)]);

    return { pages, measureRef, ready };
}
