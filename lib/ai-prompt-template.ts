export function buildAiImportPrompt(): string {
    return `You are generating a JSON object that strictly matches the TypeScript interfaces below. This JSON will be pasted directly into a tool and parsed — it must be valid JSON (no comments, no trailing commas, no markdown code fences, no explanation text before or after).

I will describe a project. Based on that description, fill in EVERY field of the JSON. If I haven't given you enough detail for a field (e.g. exact phone number, GSTIN, exact pricing breakdown, exact timeline days), invent a plausible, realistic value that fits the project — do not leave placeholders like "TBD", "N/A", "[insert here]", or empty strings, and do not ask me follow-up questions. Just produce your best realistic guess so the document is ready to use immediately.

Return ONLY the raw JSON object. Nothing else.

─────────────────────────────────────────
TYPESCRIPT SCHEMA (the JSON must conform to this exactly)
─────────────────────────────────────────

interface ChecklistItem {
  id: string;
  text: string;
  ok: boolean; // true = shown with a checkmark, false = shown with an X
}

interface ChecklistColumn {
  id: string;
  heading?: string;
  items: ChecklistItem[];
}

interface CardItem {
  id: string;
  emoji?: string; // a single emoji character
  title: string;
  body: string;
}

interface TableRow {
  id: string;
  cells: string[]; // must have the same length as the table's headers array
}

interface TableBlockData {
  headers: string[];
  rows: TableRow[];
}

interface PillBlockData {
  pills: { id: string; text: string }[];
  note?: string;
}

interface TimelinePhase {
  id: string;
  label: string; // e.g. "Phase 1 - Foundation"
  days: string; // e.g. "Days 1 - 3"
  items: string; // short dot-separated summary, e.g. "Task A · Task B · Task C"
  done?: boolean;
}

interface MilestoneItem {
  id: string;
  day: string; // short label, e.g. "Day 5" or "Week 2"
  label: string;
  highlight?: boolean;
}

interface PaymentRow {
  id: string;
  milestone: string;
  trigger: string;
  amount: string; // include currency symbol, e.g. "₹50,000"
  percentage: string; // e.g. "25%"
}

interface PaymentBlockData {
  rows: PaymentRow[]; // percentages across all rows should add up to 100%
  totalAmount: string;
  totalPercentage: string; // should be "100%"
  note?: string;
}

interface MatrixRow {
  id: string;
  item: string;
  partyA: boolean;
  partyB: boolean;
}

interface MatrixBlockData {
  partyALabel: string;
  partyBLabel: string;
  rows: MatrixRow[];
}

interface SignatureBlockData {
  partyALabel: string;
  partyAName: string;
  partyASub: string;
  partyBLabel: string;
  partyBName: string;
  partyBSub: string;
}

// A Section's "block" field must be EXACTLY ONE of these shapes,
// discriminated by the "type" key. Do not mix fields from different types.
type BlockData =
  | { type: "text"; text: string }
  | { type: "checklist"; columns: ChecklistColumn[] }
  | { type: "cards"; columns: 2 | 3 | 4; cards: CardItem[] }
  | { type: "table"; data: TableBlockData }
  | { type: "pills"; data: PillBlockData }
  | { type: "timeline"; phases: TimelinePhase[] }
  | { type: "milestones"; items: MilestoneItem[] }
  | { type: "payment"; data: PaymentBlockData }
  | { type: "matrix"; data: MatrixBlockData }
  | { type: "signature"; data: SignatureBlockData };

interface Section {
  id: string;
  number: string; // two-digit string, e.g. "01", "02"
  eyebrow: string; // small uppercase kicker, e.g. "Section 01 - Product Overview"
  title: string; // section heading
  block: BlockData;
}

interface CoverMeta {
  kicker: string; // e.g. "Product Requirements Document"
  titleLine1: string;
  titleLine2: string; // shown in the accent color, second line of the title
  subtitle: string; // one to two sentence product description
  docVersion: string; // e.g. "v1.0 - June 2026"
  deliveryTimeline: string; // e.g. "6 Weeks"
  preparedFor: string; // client name
  techStack: string; // short summary, e.g. "Next.js (Full-Stack)"
  preparedBy: string; // the company building the project
  projectValue: string; // include currency symbol, e.g. "₹25,00,000"
}

interface BrandMeta {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  gstin: string; // can be an empty string if not applicable
  primaryColor: string; // hex color, e.g. "#1b2a6b"
  accentColor: string; // hex color, e.g. "#3d5afe"
  // do NOT include a logoDataUrl field
}

interface PRDDocument {
  id: string;
  brand: BrandMeta;
  cover: CoverMeta;
  sections: Section[]; // include 8 to 14 sections covering the project well
  footerDocLabel: string; // e.g. "Project Name - PRD v1.0"
}

─────────────────────────────────────────
RULES
─────────────────────────────────────────
1. For every "id" field anywhere in the document, use any short unique string (e.g. "sec_1", "i_3", "c_7") — exact values don't matter, they just need to be unique within the document.
2. Use a good variety of section block types across the document (not all "text" or all "cards") so the PRD looks well-rounded — mix in checklist, cards, table, pills, timeline, milestones, payment, matrix, and signature sections where they make sense for the project.
3. Include exactly one "signature" type section, and make it the LAST section in the array.
4. Numbers in "percentage" fields across a payment block's rows must add up to 100%.
5. Keep table rows' "cells" array length equal to the table's "headers" array length.
6. primaryColor should be a dark/deep hex tone and accentColor a brighter complementary hex tone, suited to the project's industry.
7. Output ONLY the JSON object — no markdown fences, no commentary, starting with { and ending with }.

─────────────────────────────────────────
MY PROJECT
─────────────────────────────────────────
[Describe your project here: what it is, who it's for, rough budget/timeline if known, your company name if known, tech stack if known. Give as much or as little detail as you have — invent anything missing.]
`;
}
