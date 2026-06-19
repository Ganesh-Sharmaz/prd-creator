// ─────────────────────────────────────────────────────────────────────────
// Core data model for the PRD Generator.
// One PRDDocument = cover meta + an ordered list of Section blocks.
// Each Section has a `type` that maps to a renderer + a small editor.
// ─────────────────────────────────────────────────────────────────────────

export interface ChecklistItem {
    id: string;
    text: string;
    ok: boolean; // true = ✓ (check-list), false = ✗ (cross-list)
}

export interface ChecklistColumn {
    id: string;
    heading?: string;
    items: ChecklistItem[];
}

export interface CardItem {
    id: string;
    emoji?: string;
    title: string;
    body: string;
}

export interface TableRow {
    id: string;
    cells: string[];
}

export interface TableBlockData {
    headers: string[];
    rows: TableRow[];
}

export interface PillBlockData {
    pills: { id: string; text: string }[];
    note?: string;
}

export interface TimelinePhase {
    id: string;
    label: string; // e.g. "Phase 1 – Foundation"
    days: string; // e.g. "Days 1 – 3"
    items: string; // dot-separated summary line
    done?: boolean; // success-colored dot
}

export interface MilestoneItem {
    id: string;
    day: string;
    label: string;
    highlight?: boolean;
}

export interface PaymentRow {
    id: string;
    milestone: string;
    trigger: string;
    amount: string;
    percentage: string;
}

export interface PaymentBlockData {
    rows: PaymentRow[];
    totalAmount: string;
    totalPercentage: string;
    note?: string;
}

export interface MatrixRow {
    id: string;
    item: string;
    partyA: boolean;
    partyB: boolean;
}

export interface MatrixBlockData {
    partyALabel: string;
    partyBLabel: string;
    rows: MatrixRow[];
}

export interface SignatureBlockData {
    partyALabel: string;
    partyAName: string;
    partyASub: string;
    partyBLabel: string;
    partyBName: string;
    partyBSub: string;
}

export interface Section {
    id: string;
    number: string; // "01", "02" ... shown in the numbered badge
    eyebrow: string; // small uppercase kicker, e.g. "Section 01 – Product Overview"
    title: string; // H2 heading
    block: BlockData;
}

export interface CoverMeta {
    kicker: string;
    titleLine1: string;
    titleLine2: string; // accent-colored second line
    subtitle: string;
    docVersion: string;
    deliveryTimeline: string;
    preparedFor: string;
    techStack: string;
    preparedBy: string;
    projectValue: string;
}

export interface BrandMeta {
    companyName: string;
    tagline: string;
    email: string;
    phone: string;
    gstin: string;
    logoDataUrl?: string; // base64 image, optional
    primaryColor: string; // hex
    accentColor: string; // hex
}

export interface PRDDocument {
    id: string;
    brand: BrandMeta;
    cover: CoverMeta;
    sections: Section[];
    footerDocLabel: string; // e.g. "Custom PDF Creator PRD v1.0"
}
