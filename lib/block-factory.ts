import {
    CardItem,
    ChecklistColumn,
    MatrixBlockData,
    MilestoneItem,
    PaymentBlockData,
    PillBlockData,
    Section,
    SignatureBlockData,
    TableBlockData,
    TimelinePhase,
} from "@/types/prd";

export type BlockData =
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

export type BlockType =
    | "text" // a single prose card (e.g. "Project Summary")
    | "checklist" // 1-2 column ✓ / ✗ list
    | "cards" // grid of small labeled cards (2-4 cols)
    | "table" // simple header + rows table
    | "pills" // wrapped pill/tag row
    | "timeline" // vertical phase timeline (dot + line)
    | "milestones" // row of milestone cards (day + label)
    | "payment" // payment terms table with total row
    | "matrix" // two-party responsibility matrix (✓ per column)
    | "signature"; // two-party signature block

// ─── id helper ──────────────────────────────────────────────────────────
// ─── id helper ──────────────────────────────────────────────────────────
let _counter = 0;
export function uid(prefix = "id"): string {
    return `${prefix}_${++_counter}_${Date.now().toString(36)}`;
}

export const BLOCK_LABELS: Record<BlockType, string> = {
    text: "Text Card",
    checklist: "Checklist",
    cards: "Card Grid",
    table: "Table",
    pills: "Pill Tags",
    timeline: "Timeline",
    milestones: "Milestones",
    payment: "Payment Terms",
    matrix: "Responsibility Matrix",
    signature: "Signature Block",
};

export const BLOCK_ORDER: BlockType[] = [
    "text",
    "checklist",
    "cards",
    "table",
    "pills",
    "timeline",
    "milestones",
    "payment",
    "matrix",
    "signature",
];

export function createBlock(type: BlockType): BlockData {
    switch (type) {
        case "text":
            return { type: "text", text: "Write a short description here." };
        case "checklist":
            return {
                type: "checklist",
                columns: [
                    {
                        id: uid("col"),
                        items: [{ id: uid("i"), ok: true, text: "New point" }],
                    },
                ],
            };
        case "cards":
            return {
                type: "cards",
                columns: 2,
                cards: [
                    {
                        id: uid("c"),
                        emoji: "✨",
                        title: "Card Title",
                        body: "Short description.",
                    },
                ],
            };
        case "table":
            return {
                type: "table",
                data: {
                    headers: ["Column A", "Column B"],
                    rows: [{ id: uid("r"), cells: ["Value", "Value"] }],
                },
            };
        case "pills":
            return {
                type: "pills",
                data: { pills: [{ id: uid("p"), text: "Tag" }] },
            };
        case "timeline":
            return {
                type: "timeline",
                phases: [
                    {
                        id: uid("ph"),
                        label: "Phase 1",
                        days: "Days 1 – 2",
                        items: "Task · Task · Task",
                    },
                ],
            };
        case "milestones":
            return {
                type: "milestones",
                items: [
                    { id: uid("m"), day: "Day 1", label: "Milestone label" },
                ],
            };
        case "payment":
            return {
                type: "payment",
                data: {
                    rows: [
                        {
                            id: uid("pr"),
                            milestone: "Kickoff",
                            trigger: "Project start",
                            amount: "₹0",
                            percentage: "0%",
                        },
                    ],
                    totalAmount: "₹0",
                    totalPercentage: "100%",
                },
            };
        case "matrix":
            return {
                type: "matrix",
                data: {
                    partyALabel: "Client",
                    partyBLabel: "Provider",
                    rows: [
                        {
                            id: uid("mr"),
                            item: "Item",
                            partyA: true,
                            partyB: false,
                        },
                    ],
                },
            };
        case "signature":
            return {
                type: "signature",
                data: {
                    partyALabel: "Client",
                    partyAName: "",
                    partyASub: "",
                    partyBLabel: "Service Provider",
                    partyBName: "",
                    partyBSub: "",
                },
            };
    }
}

export function createSection(type: BlockType, number: string): Section {
    return {
        id: uid("sec"),
        number,
        eyebrow: `Section ${number} – ${BLOCK_LABELS[type]}`,
        title: BLOCK_LABELS[type],
        block: createBlock(type),
    };
}
