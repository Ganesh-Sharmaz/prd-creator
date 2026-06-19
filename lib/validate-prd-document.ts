import { uid } from "./block-factory";
import {
    BrandMeta,
    CoverMeta,
    PRDDocument,
    Section,
    ChecklistColumn,
    ChecklistItem,
    CardItem,
    TableBlockData,
    TableRow,
    PillBlockData,
    TimelinePhase,
    MilestoneItem,
    PaymentBlockData,
    PaymentRow,
    MatrixBlockData,
    MatrixRow,
    SignatureBlockData,
} from "@/types/prd";
import { BlockData, BlockType } from "./block-factory";

export type ValidationResult =
    | { ok: true; doc: PRDDocument }
    | { ok: false; errors: string[] };

const BLOCK_TYPES: BlockType[] = [
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

// ── small helpers ───────────────────────────────────────────────────────
function isStr(v: unknown): v is string {
    return typeof v === "string";
}
function isBool(v: unknown): v is boolean {
    return typeof v === "boolean";
}
function isObj(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}
function isArr(v: unknown): v is unknown[] {
    return Array.isArray(v);
}

class Errors {
    list: string[] = [];
    push(path: string, msg: string) {
        this.list.push(`${path}: ${msg}`);
    }
}

// ── field-level checks (each returns a freshly-id'd value or undefined) ──

function checkChecklistItem(
    v: unknown,
    path: string,
    err: Errors,
): ChecklistItem | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isStr(v.text)) {
        err.push(`${path}.text`, "expected a string");
        return undefined;
    }
    if (!isBool(v.ok)) {
        err.push(`${path}.ok`, "expected a boolean");
        return undefined;
    }
    return { id: uid("i"), text: v.text, ok: v.ok };
}

function checkChecklistColumn(
    v: unknown,
    path: string,
    err: Errors,
): ChecklistColumn | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isArr(v.items)) {
        err.push(`${path}.items`, "expected an array");
        return undefined;
    }
    const items = v.items
        .map((it, i) => checkChecklistItem(it, `${path}.items[${i}]`, err))
        .filter((x): x is ChecklistItem => !!x);
    return {
        id: uid("col"),
        heading: isStr(v.heading) ? v.heading : undefined,
        items,
    };
}

function checkCardItem(
    v: unknown,
    path: string,
    err: Errors,
): CardItem | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isStr(v.title)) {
        err.push(`${path}.title`, "expected a string");
        return undefined;
    }
    if (!isStr(v.body)) {
        err.push(`${path}.body`, "expected a string");
        return undefined;
    }
    return {
        id: uid("c"),
        emoji: isStr(v.emoji) ? v.emoji : undefined,
        title: v.title,
        body: v.body,
    };
}

function checkTableRow(
    v: unknown,
    path: string,
    err: Errors,
): TableRow | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isArr(v.cells) || !v.cells.every(isStr)) {
        err.push(`${path}.cells`, "expected an array of strings");
        return undefined;
    }
    return { id: uid("r"), cells: v.cells as string[] };
}

function checkTableData(
    v: unknown,
    path: string,
    err: Errors,
): TableBlockData | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isArr(v.headers) || !v.headers.every(isStr)) {
        err.push(`${path}.headers`, "expected an array of strings");
        return undefined;
    }
    if (!isArr(v.rows)) {
        err.push(`${path}.rows`, "expected an array");
        return undefined;
    }
    const rows = v.rows
        .map((r, i) => checkTableRow(r, `${path}.rows[${i}]`, err))
        .filter((x): x is TableRow => !!x);
    return { headers: v.headers as string[], rows };
}

function checkPillData(
    v: unknown,
    path: string,
    err: Errors,
): PillBlockData | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isArr(v.pills)) {
        err.push(`${path}.pills`, "expected an array");
        return undefined;
    }
    const pills: { id: string; text: string }[] = [];
    v.pills.forEach((p, i) => {
        if (!isObj(p) || !isStr(p.text)) {
            err.push(`${path}.pills[${i}]`, "expected { text: string }");
            return;
        }
        pills.push({ id: uid("p"), text: p.text });
    });
    return { pills, note: isStr(v.note) ? v.note : undefined };
}

function checkTimelinePhase(
    v: unknown,
    path: string,
    err: Errors,
): TimelinePhase | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isStr(v.label) || !isStr(v.days) || !isStr(v.items)) {
        err.push(path, "expected label, days, items as strings");
        return undefined;
    }
    return {
        id: uid("ph"),
        label: v.label,
        days: v.days,
        items: v.items,
        done: isBool(v.done) ? v.done : undefined,
    };
}

function checkMilestoneItem(
    v: unknown,
    path: string,
    err: Errors,
): MilestoneItem | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isStr(v.day) || !isStr(v.label)) {
        err.push(path, "expected day, label as strings");
        return undefined;
    }
    return {
        id: uid("m"),
        day: v.day,
        label: v.label,
        highlight: isBool(v.highlight) ? v.highlight : undefined,
    };
}

function checkPaymentRow(
    v: unknown,
    path: string,
    err: Errors,
): PaymentRow | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (
        !isStr(v.milestone) ||
        !isStr(v.trigger) ||
        !isStr(v.amount) ||
        !isStr(v.percentage)
    ) {
        err.push(
            path,
            "expected milestone, trigger, amount, percentage as strings",
        );
        return undefined;
    }
    return {
        id: uid("pr"),
        milestone: v.milestone,
        trigger: v.trigger,
        amount: v.amount,
        percentage: v.percentage,
    };
}

function checkPaymentData(
    v: unknown,
    path: string,
    err: Errors,
): PaymentBlockData | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isArr(v.rows)) {
        err.push(`${path}.rows`, "expected an array");
        return undefined;
    }
    if (!isStr(v.totalAmount) || !isStr(v.totalPercentage)) {
        err.push(path, "expected totalAmount, totalPercentage as strings");
        return undefined;
    }
    const rows = v.rows
        .map((r, i) => checkPaymentRow(r, `${path}.rows[${i}]`, err))
        .filter((x): x is PaymentRow => !!x);
    return {
        rows,
        totalAmount: v.totalAmount,
        totalPercentage: v.totalPercentage,
        note: isStr(v.note) ? v.note : undefined,
    };
}

function checkMatrixRow(
    v: unknown,
    path: string,
    err: Errors,
): MatrixRow | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isStr(v.item) || !isBool(v.partyA) || !isBool(v.partyB)) {
        err.push(path, "expected item: string, partyA/partyB: boolean");
        return undefined;
    }
    return { id: uid("mr"), item: v.item, partyA: v.partyA, partyB: v.partyB };
}

function checkMatrixData(
    v: unknown,
    path: string,
    err: Errors,
): MatrixBlockData | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isStr(v.partyALabel) || !isStr(v.partyBLabel)) {
        err.push(path, "expected partyALabel, partyBLabel as strings");
        return undefined;
    }
    if (!isArr(v.rows)) {
        err.push(`${path}.rows`, "expected an array");
        return undefined;
    }
    const rows = v.rows
        .map((r, i) => checkMatrixRow(r, `${path}.rows[${i}]`, err))
        .filter((x): x is MatrixRow => !!x);
    return { partyALabel: v.partyALabel, partyBLabel: v.partyBLabel, rows };
}

function checkSignatureData(
    v: unknown,
    path: string,
    err: Errors,
): SignatureBlockData | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    const keys = [
        "partyALabel",
        "partyAName",
        "partyASub",
        "partyBLabel",
        "partyBName",
        "partyBSub",
    ] as const;
    for (const k of keys) {
        if (!isStr(v[k])) {
            err.push(`${path}.${k}`, "expected a string");
            return undefined;
        }
    }
    return {
        partyALabel: v.partyALabel as string,
        partyAName: v.partyAName as string,
        partyASub: v.partyASub as string,
        partyBLabel: v.partyBLabel as string,
        partyBName: v.partyBName as string,
        partyBSub: v.partyBSub as string,
    };
}

function checkBlock(
    v: unknown,
    path: string,
    err: Errors,
): BlockData | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    const type = v.type;
    if (!isStr(type) || !BLOCK_TYPES.includes(type as BlockType)) {
        err.push(`${path}.type`, `expected one of ${BLOCK_TYPES.join(", ")}`);
        return undefined;
    }

    switch (type as BlockType) {
        case "text": {
            if (!isStr(v.text)) {
                err.push(`${path}.text`, "expected a string");
                return undefined;
            }
            return { type: "text", text: v.text };
        }
        case "checklist": {
            if (!isArr(v.columns)) {
                err.push(`${path}.columns`, "expected an array");
                return undefined;
            }
            const columns = v.columns
                .map((c, i) =>
                    checkChecklistColumn(c, `${path}.columns[${i}]`, err),
                )
                .filter((x): x is ChecklistColumn => !!x);
            return { type: "checklist", columns };
        }
        case "cards": {
            if (![2, 3, 4].includes(v.columns as number)) {
                err.push(`${path}.columns`, "expected 2, 3, or 4");
                return undefined;
            }
            if (!isArr(v.cards)) {
                err.push(`${path}.cards`, "expected an array");
                return undefined;
            }
            const cards = v.cards
                .map((c, i) => checkCardItem(c, `${path}.cards[${i}]`, err))
                .filter((x): x is CardItem => !!x);
            return { type: "cards", columns: v.columns as 2 | 3 | 4, cards };
        }
        case "table": {
            const data = checkTableData(v.data, `${path}.data`, err);
            if (!data) return undefined;
            return { type: "table", data };
        }
        case "pills": {
            const data = checkPillData(v.data, `${path}.data`, err);
            if (!data) return undefined;
            return { type: "pills", data };
        }
        case "timeline": {
            if (!isArr(v.phases)) {
                err.push(`${path}.phases`, "expected an array");
                return undefined;
            }
            const phases = v.phases
                .map((p, i) =>
                    checkTimelinePhase(p, `${path}.phases[${i}]`, err),
                )
                .filter((x): x is TimelinePhase => !!x);
            return { type: "timeline", phases };
        }
        case "milestones": {
            if (!isArr(v.items)) {
                err.push(`${path}.items`, "expected an array");
                return undefined;
            }
            const items = v.items
                .map((m, i) =>
                    checkMilestoneItem(m, `${path}.items[${i}]`, err),
                )
                .filter((x): x is MilestoneItem => !!x);
            return { type: "milestones", items };
        }
        case "payment": {
            const data = checkPaymentData(v.data, `${path}.data`, err);
            if (!data) return undefined;
            return { type: "payment", data };
        }
        case "matrix": {
            const data = checkMatrixData(v.data, `${path}.data`, err);
            if (!data) return undefined;
            return { type: "matrix", data };
        }
        case "signature": {
            const data = checkSignatureData(v.data, `${path}.data`, err);
            if (!data) return undefined;
            return { type: "signature", data };
        }
    }
    return undefined;
}

function checkSection(
    v: unknown,
    path: string,
    err: Errors,
): Section | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    if (!isStr(v.number) || !isStr(v.eyebrow) || !isStr(v.title)) {
        err.push(path, "expected number, eyebrow, title as strings");
        return undefined;
    }
    const block = checkBlock(v.block, `${path}.block`, err);
    if (!block) return undefined;
    return {
        id: uid("sec"),
        number: v.number,
        eyebrow: v.eyebrow,
        title: v.title,
        block,
    };
}

function checkBrand(
    v: unknown,
    path: string,
    err: Errors,
): BrandMeta | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    const required = [
        "companyName",
        "tagline",
        "email",
        "phone",
        "primaryColor",
        "accentColor",
    ] as const;
    for (const k of required) {
        if (!isStr(v[k])) {
            err.push(`${path}.${k}`, "expected a string");
            return undefined;
        }
    }
    return {
        companyName: v.companyName as string,
        tagline: v.tagline as string,
        email: v.email as string,
        phone: v.phone as string,
        gstin: isStr(v.gstin) ? v.gstin : "",
        primaryColor: v.primaryColor as string,
        accentColor: v.accentColor as string,
        // logoDataUrl intentionally ignored even if present — we never trust
        // an externally-supplied data URL into the document silently.
    };
}

function checkCover(
    v: unknown,
    path: string,
    err: Errors,
): CoverMeta | undefined {
    if (!isObj(v)) {
        err.push(path, "expected an object");
        return undefined;
    }
    const required = [
        "kicker",
        "titleLine1",
        "titleLine2",
        "subtitle",
        "docVersion",
        "deliveryTimeline",
        "preparedFor",
        "techStack",
        "preparedBy",
        "projectValue",
    ] as const;
    for (const k of required) {
        if (!isStr(v[k])) {
            err.push(`${path}.${k}`, "expected a string");
            return undefined;
        }
    }
    return {
        kicker: v.kicker as string,
        titleLine1: v.titleLine1 as string,
        titleLine2: v.titleLine2 as string,
        subtitle: v.subtitle as string,
        docVersion: v.docVersion as string,
        deliveryTimeline: v.deliveryTimeline as string,
        preparedFor: v.preparedFor as string,
        techStack: v.techStack as string,
        preparedBy: v.preparedBy as string,
        projectValue: v.projectValue as string,
    };
}

// ── entry point ──────────────────────────────────────────────────────────
// Parses raw pasted text as JSON, then structurally validates + rebuilds it
// into a PRDDocument with fresh unique ids throughout (never trust ids
// coming from an LLM — duplicates will break React keys & pagination).
export function parseAndValidatePrdDocument(raw: string): ValidationResult {
    const err = new Errors();

    let parsed: unknown;
    try {
        // Strip accidental markdown code fences if the model added them anyway.
        const cleaned = raw
            .trim()
            .replace(/^```(?:json)?/i, "")
            .replace(/```$/, "")
            .trim();
        parsed = JSON.parse(cleaned);
    } catch {
        return {
            ok: false,
            errors: [
                "That doesn't look like valid JSON. Make sure you pasted the full object, starting with { and ending with }.",
            ],
        };
    }

    if (!isObj(parsed)) {
        return {
            ok: false,
            errors: ["Expected a JSON object at the top level."],
        };
    }

    const brand = checkBrand(parsed.brand, "brand", err);
    const cover = checkCover(parsed.cover, "cover", err);
    const footerDocLabel = isStr(parsed.footerDocLabel)
        ? parsed.footerDocLabel
        : undefined;
    if (!footerDocLabel) err.push("footerDocLabel", "expected a string");

    if (!isArr(parsed.sections)) {
        err.push("sections", "expected an array");
    }

    if (!brand || !cover || !footerDocLabel || !isArr(parsed.sections)) {
        return {
            ok: false,
            errors: err.list.length
                ? err.list
                : ["Document is missing required fields."],
        };
    }

    const sections = parsed.sections
        .map((s, i) => checkSection(s, `sections[${i}]`, err))
        .filter((x): x is Section => !!x);

    if (sections.length === 0) {
        err.push("sections", "must contain at least one valid section");
    }

    if (err.list.length > 0) {
        return { ok: false, errors: err.list };
    }

    const doc: PRDDocument = {
        id: uid("doc"),
        brand,
        cover,
        sections,
        footerDocLabel,
    };

    return { ok: true, doc };
}
