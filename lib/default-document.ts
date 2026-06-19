import { PRDDocument, Section } from "@/types/prd";
import { uid } from "./block-factory";

const s = (
    number: string,
    eyebrow: string,
    title: string,
    block: Section["block"],
): Section => ({ id: uid("sec"), number, eyebrow, title, block });

export const defaultDocument: PRDDocument = {
    id: uid("doc"),
    brand: {
        companyName: "Quantumtech Digital",
        tagline: "Software & Technology Solutions",
        email: "connect@quantumtechdigital.com",
        phone: "+91 79820 82271",
        gstin: "10DFWPR9849A1ZZ",
        primaryColor: "#1b2a6b",
        accentColor: "#3d5afe",
    },
    cover: {
        kicker: "Product Requirements Document",
        titleLine1: "PRD",
        titleLine2: "Creator",
        subtitle:
            "A browser-based document generator that lets you fill in project details, preview a live A4-formatted PRD, and export a pixel-perfect PDF — all in one sitting, without touching Word or Figma.",
        docVersion: "v1.0 – June 2026",
        deliveryTimeline: "Instant Export",
        preparedFor: "Ganesh Sharma",
        techStack: "Next.js (Full-Stack)",
        preparedBy: "Quantumtech Digital",
        projectValue: "₹ 1,00,00,000",
    },
    footerDocLabel: "PRD Creator – Product Overview v1.0",
    sections: [
        s("01", "Section 01 – Product Overview", "Product Overview", {
            type: "text",
            text: "PRD Creator is a browser-based internal tool built by Quantumtech Digital to eliminate the time spent manually formatting project requirement documents. You fill in the Cover details and Sections on the left panel, watch a live A4 preview update in real-time on the right, then export a professionally formatted PDF with a single click — complete with your brand colors, logo, company details, and a consistent typographic system across every page.",
        }),
        s("02", "Section 02 – Who It's For", "Who It's For", {
            type: "cards",
            columns: 2,
            cards: [
                {
                    id: uid("c"),
                    emoji: "🏢",
                    title: "Project Managers",
                    body: "Produce client-ready PRDs in minutes instead of hours. No design skills needed — the layout, typography, and brand treatment are handled automatically.",
                },
                {
                    id: uid("c"),
                    emoji: "💼",
                    title: "Sales & BD Teams",
                    body: "Send polished scope documents to prospects the same day. Consistent formatting across every proposal builds trust before a single line of code is written.",
                },
                {
                    id: uid("c"),
                    emoji: "👨‍💻",
                    title: "Developers & Tech Leads",
                    body: "Capture tech stack, delivery roadmap, and milestone details in structured blocks that are easy to fill and even easier for clients to read.",
                },
                {
                    id: uid("c"),
                    emoji: "🎨",
                    title: "Designers & Strategists",
                    body: "Focus on content, not layout. The tool enforces a clean A4 grid with correct margins, heading scales, and color usage derived from the brand palette you set.",
                },
            ],
        }),
        s("03", "Section 03 – Core Benefits", "Core Benefits", {
            type: "checklist",
            columns: [
                {
                    id: uid("col"),
                    items: [
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Live A4 preview updates as you type",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "No Word, Figma, or design tools required",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Brand colors and logo applied automatically",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "10 structured block types for any content",
                        },
                    ],
                },
                {
                    id: uid("col"),
                    items: [
                        {
                            id: uid("i"),
                            ok: true,
                            text: "One-click PDF export with custom filename",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Drag-and-drop section reordering",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Multi-page pagination handled automatically",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Pixel-perfect output — same on screen and print",
                        },
                    ],
                },
            ],
        }),
        s(
            "04",
            "Section 04 – Section Block Types",
            "Available Section Block Types",
            {
                type: "table",
                data: {
                    headers: ["Block Type", "Best Used For", "Editable Fields"],
                    rows: [
                        {
                            id: uid("r"),
                            cells: [
                                "Text Card",
                                "Overview, summaries, scope notes",
                                "Rich paragraph text",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Card Grid",
                                "Features, user roles, modules",
                                "Emoji, title, description per card",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Checklist",
                                "Benefits, inclusions, exclusions",
                                "✓ / ✗ toggle per item, column headings",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Table",
                                "Permissions, comparisons, specs",
                                "Custom headers and unlimited rows",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Pill Tags",
                                "Tech stack, tools, integrations",
                                "Tag labels and optional note",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Timeline",
                                "Delivery phases, sprints",
                                "Phase label, day range, task list",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Milestones",
                                "Key delivery dates",
                                "Day label, milestone description",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Payment Terms",
                                "Billing milestones, totals",
                                "Milestone, trigger, amount, percentage",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Responsibility Matrix",
                                "Client vs provider ownership",
                                "Item, Party A ✓, Party B ✓",
                            ],
                        },
                        {
                            id: uid("r"),
                            cells: [
                                "Signature Block",
                                "Approval and sign-off page",
                                "Party names, roles, signature lines",
                            ],
                        },
                    ],
                },
            },
        ),
        s("06", "Section 06 – Editor Features", "Editor Features", {
            type: "cards",
            columns: 2,
            cards: [
                {
                    id: uid("c"),
                    emoji: "👁️",
                    title: "Live Preview",
                    body: "Every keystroke updates the A4 preview panel in real-time. What you see on screen is exactly what gets exported to PDF.",
                },
                {
                    id: uid("c"),
                    emoji: "🎨",
                    title: "Brand Controls",
                    body: "Set your company name, tagline, email, phone, GSTIN, logo, primary color, and accent color once — they propagate across every page header, footer, and cover automatically.",
                },
                {
                    id: uid("c"),
                    emoji: "↕️",
                    title: "Drag & Drop Sections",
                    body: "Reorder sections by dragging the grip handle. The preview and PDF output always reflect the current section order.",
                },
                {
                    id: uid("c"),
                    emoji: "📄",
                    title: "Smart Pagination",
                    body: "Sections are measured off-screen and packed into A4 pages automatically. No manual page breaks — content never overflows a page boundary.",
                },
            ],
        }),
        s("07", "Section 07 – Cover Page Fields", "Cover Page Fields", {
            type: "checklist",
            columns: [
                {
                    id: uid("col"),
                    heading: "Document Identity",
                    items: [
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Kicker label (e.g. Product Requirements Document)",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Title Line 1 & Title Line 2 (accent-colored)",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Subtitle — one or two sentence product description",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Document version string",
                        },
                    ],
                },
                {
                    id: uid("col"),
                    heading: "Project Meta",
                    items: [
                        { id: uid("i"), ok: true, text: "Delivery timeline" },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Prepared for (client name)",
                        },
                        { id: uid("i"), ok: true, text: "Technology stack" },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Prepared by (your company)",
                        },
                        { id: uid("i"), ok: true, text: "Project value" },
                    ],
                },
            ],
        }),
        s("09", "Section 09 – Export System", "Export System", {
            type: "cards",
            columns: 3,
            cards: [
                {
                    id: uid("c"),
                    emoji: "✏️",
                    title: "Custom Filename",
                    body: "A modal prompts for a filename before export. Input is auto-uppercased and the suffix _PRD_BY_QUANTUMTECH_DIGITAL is appended automatically.",
                },
                {
                    id: uid("c"),
                    emoji: "🖨️",
                    title: "Print-Quality Output",
                    body: "html2canvas captures each page at 3× scale and jsPDF assembles them into a multi-page PDF sized to the exact content height — no squishing, no stretching.",
                },
                {
                    id: uid("c"),
                    emoji: "📐",
                    title: "True A4 Layout",
                    body: "Pages are rendered at 210mm wide with accurate header, footer, and body margins. The exported PDF opens print-ready in any PDF viewer.",
                },
            ],
        }),
        s("12", "Section 12 – Technology Stack", "Technology Stack", {
            type: "pills",
            data: {
                pills: [
                    { id: uid("p"), text: "Next.js 14 (App Router)" },
                    { id: uid("p"), text: "React 18" },
                    { id: uid("p"), text: "TypeScript" },
                    { id: uid("p"), text: "Tailwind CSS" },
                    { id: uid("p"), text: "Framer Motion" },
                    { id: uid("p"), text: "html2canvas" },
                    { id: uid("p"), text: "jsPDF" },
                    { id: uid("p"), text: "CSS Modules" },
                    { id: uid("p"), text: "@hello-pangea/dnd" },
                    { id: uid("p"), text: "Lucide React" },
                ],
                note: "Fully client-side — no backend, no database, no authentication required. The tool runs entirely in the browser and exports PDFs locally without any server round-trip.",
            },
        }),
        s("14", "Section 14 – How To Use It", "How To Use It (3 Steps)", {
            type: "timeline",
            phases: [
                {
                    id: uid("ph"),
                    label: "Step 1 – Fill in Cover & Brand",
                    days: "Cover & Brand Tab",
                    items: "Set company name · Upload logo · Choose brand colors · Fill in cover title, subtitle, client name, tech stack, project value and version",
                },
                {
                    id: uid("ph"),
                    label: "Step 2 – Build Your Sections",
                    days: "Sections Tab",
                    items: "Add sections using the block type menu · Drag to reorder · Edit content inline · Watch the A4 preview update live on the right panel",
                },
                {
                    id: uid("ph"),
                    label: "Step 3 – Export as PDF",
                    days: "Save as PDF Button",
                    items: "Click Save as PDF · Enter a custom filename in the modal · Click Save PDF — your document downloads instantly to your device",
                    done: true,
                },
            ],
        }),
        s(
            "15",
            "Section 15 – Key Capabilities",
            "Key Capabilities at a Glance",
            {
                type: "milestones",
                items: [
                    {
                        id: uid("m"),
                        day: "10 Blocks",
                        label: "Structured content block types available",
                    },
                    {
                        id: uid("m"),
                        day: "Live A4",
                        label: "Real-time preview synced with every edit",
                    },
                    {
                        id: uid("m"),
                        day: "3× Scale",
                        label: "Print-quality PDF rendering via html2canvas",
                    },
                    {
                        id: uid("m"),
                        day: "Auto-page",
                        label: "Smart pagination with no overflow",
                    },
                    {
                        id: uid("m"),
                        day: "0 Backend",
                        label: "Fully client-side, no server required",
                    },
                    {
                        id: uid("m"),
                        day: "1 Click",
                        label: "Complete PDF export with custom filename",
                        highlight: true,
                    },
                ],
            },
        ),
        s(
            "19",
            "Section 19 – Customization Options",
            "What You Can Customize",
            {
                type: "payment",
                data: {
                    rows: [
                        {
                            id: uid("pr"),
                            milestone: "Brand Identity",
                            trigger:
                                "Logo, company name, tagline, email, phone, GSTIN",
                            amount: "₹ 20,00,000",
                            percentage: "20%",
                        },
                        {
                            id: uid("pr"),
                            milestone: "Color Palette",
                            trigger:
                                "Primary color and accent color via hex picker",
                            amount: "₹ 40,00,000",
                            percentage: "40%",
                        },
                        {
                            id: uid("pr"),
                            milestone: "Cover Content",
                            trigger:
                                "Title, subtitle, kicker, version, client, tech stack, value",
                            amount: "₹ 40,00,000",
                            percentage: "40%",
                        },
                    ],
                    totalAmount: "₹ 1,00,00,000",
                    totalPercentage: "100%",
                    note: "Every visual element on the cover and content pages is driven by the values you enter in the editor. Change the brand colors and the entire document updates instantly in the live preview.",
                },
            },
        ),
        s(
            "20",
            "Section 20 – What's Included vs Out of Scope",
            "Included vs Out of Scope",
            {
                type: "matrix",
                data: {
                    partyALabel: "Included",
                    partyBLabel: "Out of Scope",
                    rows: [
                        {
                            id: uid("mr"),
                            item: "Live A4 preview editor",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "PDF export with custom filename",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "10 section block types",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "Brand color + logo customization",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "Drag-and-drop section reordering",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "Cloud save / document history",
                            partyA: false,
                            partyB: true,
                        },
                        {
                            id: uid("mr"),
                            item: "Multi-user collaboration",
                            partyA: false,
                            partyB: true,
                        },
                        {
                            id: uid("mr"),
                            item: "Template library / presets",
                            partyA: false,
                            partyB: true,
                        },
                    ],
                },
            },
        ),
        s("24", "Section 24 – Built By", "Built By Quantumtech Digital", {
            type: "signature",
            data: {
                partyALabel: "Tool",
                partyAName: "PRD Creator",
                partyASub: "Internal Productivity Tool",
                partyBLabel: "Built By",
                partyBName: "Quantumtech Digital",
                partyBSub: "Software & Technology Solutions",
            },
        }),
    ],
};

export function emptyDocument(): PRDDocument {
    return {
        id: uid("doc"),
        brand: {
            companyName: "Your Company",
            tagline: "Software & Technology Solutions",
            email: "hello@yourcompany.com",
            phone: "+91 00000 00000",
            gstin: "",
            primaryColor: "#1b2a6b",
            accentColor: "#3d5afe",
        },
        cover: {
            kicker: "Product Requirements Document",
            titleLine1: "Project",
            titleLine2: "Name",
            subtitle:
                "A short one or two sentence description of what this product does and who it's for.",
            docVersion: "v1.0",
            deliveryTimeline: "— Working Days",
            preparedFor: "Client Name",
            techStack: "Next.js",
            preparedBy: "Your Company",
            projectValue: "₹0",
        },
        footerDocLabel: "Project PRD v1.0",
        sections: [
            s("01", "Section 01 – Overview", "Product Overview", {
                type: "text",
                text: "Describe the product here.",
            }),
        ],
    };
}
