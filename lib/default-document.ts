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
        titleLine1: "Custom",
        titleLine2: "PDF Creator",
        subtitle:
            "A browser-based platform for schools, coaching institutes, and educational publishers to create, customize, and export professional examination papers with a single click.",
        docVersion: "v1.0 – June 2026",
        deliveryTimeline: "12 Working Days",
        preparedFor: "Earth KIK (Prince)",
        techStack: "Next.js (Full-Stack)",
        preparedBy: "Quantumtech Digital",
        projectValue: "₹10,000 (Fixed)",
    },
    footerDocLabel: "Custom PDF Creator PRD v1.0",
    sections: [
        s("01", "Section 01 – Product Overview", "Product Overview", {
            type: "text",
            text: "Custom PDF Creator is a modern browser-based web application built for schools, coaching institutes, educational publishers, and teachers. The platform enables users to select templates, apply institutional branding, manage questions, preview formatted papers in real-time, and export print-ready A4 PDF documents — all without repetitive manual formatting in Word or similar tools.",
        }),
        s("02", "Section 02 – Target Users", "Target Users", {
            type: "cards",
            columns: 2,
            cards: [
                {
                    id: uid("c"),
                    emoji: "🏫",
                    title: "Schools",
                    body: "Create standardized examination papers across departments with consistent formatting and institutional branding applied automatically.",
                },
                {
                    id: uid("c"),
                    emoji: "🎓",
                    title: "Coaching Institutes",
                    body: "Generate mock tests and practice papers rapidly for competitive exam preparation courses at scale.",
                },
                {
                    id: uid("c"),
                    emoji: "👩‍🏫",
                    title: "Teachers",
                    body: "Create professional question papers without knowledge of complex software or formatting tools.",
                },
                {
                    id: uid("c"),
                    emoji: "📚",
                    title: "Educational Publishers",
                    body: "Prepare and manage assessment papers in bulk with reusable question banks and section templates.",
                },
            ],
        }),
        s("03", "Section 03 – Business Benefits", "Key Business Benefits", {
            type: "checklist",
            columns: [
                {
                    id: uid("col"),
                    items: [
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Reduce paper creation time significantly",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Standardize examination paper formatting",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Eliminate repetitive MS Word formatting",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Maintain institute branding consistently",
                        },
                    ],
                },
                {
                    id: uid("col"),
                    items: [
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Generate professional PDFs instantly",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Support multilingual content (Hindi & English)",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Save and reuse previous papers",
                        },
                        {
                            id: uid("i"),
                            ok: true,
                            text: "Centralized paper management dashboard",
                        },
                    ],
                },
            ],
        }),
        s(
            "04",
            "Section 04 – User Roles & Permissions",
            "User Roles & Permissions",
            {
                type: "table",
                data: {
                    headers: ["Permission", "Super Admin", "PDF Creator"],
                    rows: [
                        { id: uid("r"), cells: ["Create Users", "✓", "—"] },
                        { id: uid("r"), cells: ["Remove Users", "✓", "—"] },
                        { id: uid("r"), cells: ["Manage Templates", "✓", "—"] },
                        { id: uid("r"), cells: ["Manage Branding", "✓", "—"] },
                        {
                            id: uid("r"),
                            cells: ["View All Papers", "✓", "Own Only"],
                        },
                        {
                            id: uid("r"),
                            cells: ["Edit Papers", "All", "Own Only"],
                        },
                        { id: uid("r"), cells: ["Export PDF", "✓", "✓"] },
                        { id: uid("r"), cells: ["Save Drafts", "✓", "✓"] },
                        { id: uid("r"), cells: ["Preview Papers", "✓", "✓"] },
                    ],
                },
            },
        ),
        s(
            "06",
            "Section 06 – Paper Customization Module",
            "Paper Customization Module",
            {
                type: "cards",
                columns: 2,
                cards: [
                    {
                        id: uid("c"),
                        emoji: "🎨",
                        title: "Template System",
                        body: "Multiple predefined templates — Formal, Minimal, Boxed, Institutional — with live template preview.",
                    },
                    {
                        id: uid("c"),
                        emoji: "🏷️",
                        title: "Branding Controls",
                        body: "Logo upload & positioning, institute name, contact info, custom header/footer, brand color palette.",
                    },
                    {
                        id: uid("c"),
                        emoji: "💧",
                        title: "Watermark System",
                        body: "Text or image-based watermark with opacity control (0–100%) and position control (center, tiled).",
                    },
                    {
                        id: uid("c"),
                        emoji: "🔤",
                        title: "Typography Controls",
                        body: "Font family & size selection, heading style presets, body text style presets.",
                    },
                ],
            },
        ),
        s(
            "07",
            "Section 07 – Question Management Module",
            "Question Management Module",
            {
                type: "checklist",
                columns: [
                    {
                        id: uid("col"),
                        heading: "Supported Question Types",
                        items: [
                            {
                                id: uid("i"),
                                ok: true,
                                text: "Multiple Choice Questions (MCQ)",
                            },
                            { id: uid("i"), ok: true, text: "True / False" },
                            {
                                id: uid("i"),
                                ok: true,
                                text: "Fill in the Blanks",
                            },
                            { id: uid("i"), ok: true, text: "Short Answer" },
                            { id: uid("i"), ok: true, text: "Long Answer" },
                        ],
                    },
                    {
                        id: uid("col"),
                        heading: "Question Features",
                        items: [
                            {
                                id: uid("i"),
                                ok: true,
                                text: "Auto Serial Numbering",
                            },
                            {
                                id: uid("i"),
                                ok: true,
                                text: "Question Duplication",
                            },
                            {
                                id: uid("i"),
                                ok: true,
                                text: "Question Reordering (drag & drop)",
                            },
                            {
                                id: uid("i"),
                                ok: true,
                                text: "Section Assignment",
                            },
                            {
                                id: uid("i"),
                                ok: true,
                                text: "Internal Choices (OR questions)",
                            },
                        ],
                    },
                ],
            },
        ),
        s("09", "Section 09 – Language Support", "Language Support", {
            type: "cards",
            columns: 3,
            cards: [
                {
                    id: uid("c"),
                    emoji: "🇮🇳",
                    title: "English",
                    body: "Full Unicode Latin support with all standard typographic controls.",
                },
                {
                    id: uid("c"),
                    emoji: "🕉️",
                    title: "Hindi",
                    body: "Devanagari Unicode rendering for complete Hindi-language question papers.",
                },
                {
                    id: uid("c"),
                    emoji: "🔀",
                    title: "Mixed Language",
                    body: "English & Hindi can appear side-by-side on the same paper with proper rendering.",
                },
            ],
        }),
        s("12", "Section 12 – Technology Stack", "Technology Stack", {
            type: "pills",
            data: {
                pills: [
                    { id: uid("p"), text: "Next.js (Full-Stack)" },
                    { id: uid("p"), text: "React" },
                    { id: uid("p"), text: "Node.js (API Routes)" },
                    { id: uid("p"), text: "Cloud Database" },
                    { id: uid("p"), text: "PDF Engine" },
                    { id: uid("p"), text: "Unicode / Devanagari" },
                    { id: uid("p"), text: "JWT Authentication" },
                    { id: uid("p"), text: "Responsive CSS" },
                ],
                note: "The application requires an active internet connection. Web application only — no desktop or mobile app is included in this scope.",
            },
        }),
        s("14", "Section 14 – Delivery Roadmap", "Delivery Roadmap (12 Days)", {
            type: "timeline",
            phases: [
                {
                    id: uid("ph"),
                    label: "Phase 1 – Foundation",
                    days: "Days 1 – 3",
                    items: "Project Setup · Database Setup · Authentication · User Management · Dashboard · Template System",
                },
                {
                    id: uid("ph"),
                    label: "Phase 2 – Paper Creation",
                    days: "Days 4 – 7",
                    items: "Exam Meta Information · Branding Controls · Watermark System · Question Management · Section Management · Live Preview",
                },
                {
                    id: uid("ph"),
                    label: "Phase 3 – Advanced Features",
                    days: "Days 8 – 9",
                    items: "Bulk Import · Mathematics Support · Image Support · PDF Rendering Engine",
                },
                {
                    id: uid("ph"),
                    label: "Phase 4 – QA & Delivery",
                    days: "Days 10 – 12",
                    items: "Testing · Bug Fixes · UAT · Deployment · Documentation · Handover",
                    done: true,
                },
            ],
        }),
        s("15", "Section 15 – Key Milestones", "Key Milestones", {
            type: "milestones",
            items: [
                {
                    id: uid("m"),
                    day: "Day 1",
                    label: "Authentication & User Management Complete",
                },
                {
                    id: uid("m"),
                    day: "Day 3",
                    label: "Dashboard & Templates Complete",
                },
                {
                    id: uid("m"),
                    day: "Day 7",
                    label: "Paper Creation Module Complete",
                },
                { id: uid("m"), day: "Day 9", label: "Bulk Import Complete" },
                { id: uid("m"), day: "Day 10", label: "PDF Export Complete" },
                {
                    id: uid("m"),
                    day: "Day 12",
                    label: "Production Deployment & Handover",
                    highlight: true,
                },
            ],
        }),
        s("19", "Section 19 – Payment Terms", "Payment Terms", {
            type: "payment",
            data: {
                rows: [
                    {
                        id: uid("pr"),
                        milestone: "Kickoff Payment",
                        trigger: "Document signed, project initiated",
                        amount: "₹2,000",
                        percentage: "20%",
                    },
                    {
                        id: uid("pr"),
                        milestone: "Midway Payment",
                        trigger: "Phase 2 complete (Paper Creation Module)",
                        amount: "₹4,000",
                        percentage: "40%",
                    },
                    {
                        id: uid("pr"),
                        milestone: "Final Payment",
                        trigger:
                            "UAT complete, deployment done, handover delivered",
                        amount: "₹4,000",
                        percentage: "40%",
                    },
                ],
                totalAmount: "₹10,000",
                totalPercentage: "100%",
                note: "All source code, databases, and project assets become the property of the client upon receipt of full payment. Taxes applicable as per government norms.",
            },
        }),
        s(
            "20",
            "Section 20 – Responsibilities & Ownership",
            "Responsibilities & Ownership Matrix",
            {
                type: "matrix",
                data: {
                    partyALabel: "Client",
                    partyBLabel: "Quantumtech Digital",
                    rows: [
                        {
                            id: uid("mr"),
                            item: "Domain Registration",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "Hosting / Server",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "Branding Assets (Logo, Colors)",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "Application Development",
                            partyA: false,
                            partyB: true,
                        },
                        {
                            id: uid("mr"),
                            item: "Testing & QA",
                            partyA: false,
                            partyB: true,
                        },
                        {
                            id: uid("mr"),
                            item: "Deployment Support",
                            partyA: false,
                            partyB: true,
                        },
                        {
                            id: uid("mr"),
                            item: "UAT Sign-off",
                            partyA: true,
                            partyB: false,
                        },
                        {
                            id: uid("mr"),
                            item: "Source Code Ownership (post-payment)",
                            partyA: true,
                            partyB: false,
                        },
                    ],
                },
            },
        ),
        s(
            "24",
            "Section 24 – Approval & Signature",
            "Approval & Signature Page",
            {
                type: "signature",
                data: {
                    partyALabel: "Client",
                    partyAName: "Prince",
                    partyASub: "Owner, Earth KIK",
                    partyBLabel: "Service Provider",
                    partyBName: "Quantumtech Digital",
                    partyBSub: "Software & Technology Solutions",
                },
            },
        ),
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
