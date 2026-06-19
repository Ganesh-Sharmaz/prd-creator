"use client";


import { CardItem, ChecklistColumn, MatrixRow, MilestoneItem, PaymentRow, TableRow, TimelinePhase, } from "@/types/prd";
import { Field, TextArea, TextInput, RemoveRowButton, AddRowButton } from "./form-primitives";
import { BlockData, uid } from "@/lib/block-factory";


export function BlockEditor({
  block,
  onChange,
}: Readonly<{
  block: BlockData;
  onChange: (b: BlockData) => void;
}>) {
  switch (block.type) {
    case "text":
      return <TextBlockEditor text={block.text} onChange={(text) => onChange({ ...block, text })} />;
    case "checklist":
      return (
        <ChecklistEditor
          columns={block.columns}
          onChange={(columns) => onChange({ ...block, columns })}
        />
      );
    case "cards":
      return (
        <CardsEditor
          cards={block.cards}
          columns={block.columns}
          onChange={(cards) => onChange({ ...block, cards })}
          onColumnsChange={(columns) => onChange({ ...block, columns })}
        />
      );
    case "table":
      return (
        <TableEditor
          headers={block.data.headers}
          rows={block.data.rows}
          onChange={(headers, rows) => onChange({ ...block, data: { headers, rows } })}
        />
      );
    case "pills":
      return (
        <PillsEditor
          pills={block.data.pills}
          note={block.data.note}
          onChange={(pills, note) => onChange({ ...block, data: { pills, note } })}
        />
      );
    case "timeline":
      return (
        <TimelineEditor phases={block.phases} onChange={(phases) => onChange({ ...block, phases })} />
      );
    case "milestones":
      return (
        <MilestonesEditor items={block.items} onChange={(items) => onChange({ ...block, items })} />
      );
    case "payment":
      return (
        <PaymentEditor
          rows={block.data.rows}
          totalAmount={block.data.totalAmount}
          totalPercentage={block.data.totalPercentage}
          note={block.data.note}
          onChange={(data) => onChange({ ...block, data })}
        />
      );
    case "matrix":
      return (
        <MatrixEditor
          partyALabel={block.data.partyALabel}
          partyBLabel={block.data.partyBLabel}
          rows={block.data.rows}
          onChange={(data) => onChange({ ...block, data })}
        />
      );
    case "signature":
      return (
        <SignatureEditor
          data={block.data}
          onChange={(data) => onChange({ ...block, data })}
        />
      );
    default:
      return null;
  }
}

/* ─── Text ──────────────────────────────────────────────────────────── */
function TextBlockEditor({ text, onChange }: Readonly<{ text: string; onChange: (t: string) => void }>) {
  return (
    <Field label="Description">
      <TextArea rows={4} value={text} onChange={(e) => onChange(e.target.value)} />
    </Field>
  );
}

/* ─── Checklist ─────────────────────────────────────────────────────── */
function ChecklistEditor({
  columns,
  onChange,
}: Readonly<{
  columns: ChecklistColumn[];
  onChange: (c: ChecklistColumn[]) => void;
}>) {
  const update = (next: ChecklistColumn[]) => onChange(next);

  return (
    <div className="flex flex-col gap-4">
      {columns.map((col, ci) => (
        <div key={col.id} className="rounded-lg border border-neutral-200 p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <TextInput
              placeholder="Column heading (optional)"
              value={col.heading ?? ""}
              onChange={(e) => {
                const next = [...columns];
                next[ci] = { ...col, heading: e.target.value };
                update(next);
              }}
            />
            {columns.length > 1 && (
              <RemoveRowButton onClick={() => update(columns.filter((c) => c.id !== col.id))} />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            {col.items.map((item, ii) => (
              <div key={item.id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = [...columns];
                    const items = [...col.items];
                    items[ii] = { ...item, ok: !item.ok };
                    next[ci] = { ...col, items };
                    update(next);
                  }}
                  title={item.ok ? "Shown as ✓ — click for ✗" : "Shown as ✗ — click for ✓"}
                  className={
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold " +
                    (item.ok ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500")
                  }
                >
                  {item.ok ? "✓" : "✗"}
                </button>
                <TextInput
                  value={item.text}
                  onChange={(e) => {
                    const next = [...columns];
                    const items = [...col.items];
                    items[ii] = { ...item, text: e.target.value };
                    next[ci] = { ...col, items };
                    update(next);
                  }}
                />
                <RemoveRowButton
                  onClick={() => {
                    const next = [...columns];
                    next[ci] = { ...col, items: col.items.filter((it) => it.id !== item.id) };
                    update(next);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2">
            <AddRowButton
              label="Add item"
              onClick={() => {
                const next = [...columns];
                next[ci] = { ...col, items: [...col.items, { id: uid("i"), ok: true, text: "" }] };
                update(next);
              }}
            />
          </div>
        </div>
      ))}
      {columns.length < 2 && (
        <AddRowButton
          label="Add column"
          onClick={() => update([...columns, { id: uid("col"), items: [{ id: uid("i"), ok: true, text: "" }] }])}
        />
      )}
    </div>
  );
}

/* ─── Cards ─────────────────────────────────────────────────────────── */
function CardsEditor({
  cards,
  columns,
  onChange,
  onColumnsChange,
}: Readonly<{
  cards: CardItem[];
  columns: 2 | 3 | 4;
  onChange: (c: CardItem[]) => void;
  onColumnsChange: (n: 2 | 3 | 4) => void;
}>) {
  return (
    <div className="flex flex-col gap-3">
      <Field label="Columns per row">
        <div className="flex gap-1.5">
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => onColumnsChange(n as 2 | 3 | 4)}
              className={
                "h-7 w-7 rounded-md text-xs font-medium transition-colors " +
                (columns === n ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200")
              }
            >
              {n}
            </button>
          ))}
        </div>
      </Field>

      <div className="flex flex-col gap-2">
        {cards.map((card, i) => (
          <div key={card.id} className="rounded-lg border border-neutral-200 p-3">
            <div className="flex items-center gap-2">
              <TextInput
                placeholder="🎯"
                value={card.emoji ?? ""}
                onChange={(e) => {
                  const next = [...cards];
                  next[i] = { ...card, emoji: e.target.value };
                  onChange(next);
                }}
                className="w-12 text-center"
              />
              <TextInput
                placeholder="Title"
                value={card.title}
                onChange={(e) => {
                  const next = [...cards];
                  next[i] = { ...card, title: e.target.value };
                  onChange(next);
                }}
              />
              <RemoveRowButton onClick={() => onChange(cards.filter((c) => c.id !== card.id))} />
            </div>
            <TextArea
              className="mt-2"
              rows={2}
              placeholder="Short description"
              value={card.body}
              onChange={(e) => {
                const next = [...cards];
                next[i] = { ...card, body: e.target.value };
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
      <AddRowButton
        label="Add card"
        onClick={() => onChange([...cards, { id: uid("c"), title: "", body: "" }])}
      />
    </div>
  );
}

/* ─── Table ─────────────────────────────────────────────────────────── */
function TableEditor({
  headers,
  rows,
  onChange,
}: Readonly<{
  headers: string[];
  rows: TableRow[];
  onChange: (headers: string[], rows: TableRow[]) => void;
}>) {
  return (
    <div className="flex flex-col gap-3">
      <Field label="Columns">
        <div className="flex flex-col gap-1.5">
          {headers.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <TextInput
                value={h}
                onChange={(e) => {
                  const nextHeaders = [...headers];
                  nextHeaders[i] = e.target.value;
                  onChange(nextHeaders, rows);
                }}
              />
              {headers.length > 1 && (
                <RemoveRowButton
                  onClick={() => {
                    const nextHeaders = headers.filter((_, hi) => hi !== i);
                    const nextRows = rows.map((r) => ({
                      ...r,
                      cells: r.cells.filter((_, ci) => ci !== i),
                    }));
                    onChange(nextHeaders, nextRows);
                  }}
                />
              )}
            </div>
          ))}
          <AddRowButton
            label="Add column"
            onClick={() => {
              const nextHeaders = [...headers, "Column"];
              const nextRows = rows.map((r) => ({ ...r, cells: [...r.cells, ""] }));
              onChange(nextHeaders, nextRows);
            }}
          />
        </div>
      </Field>

      <Field label="Rows">
        <div className="flex flex-col gap-1.5">
          {rows.map((row, ri) => (
            <div key={row.id} className="flex items-center gap-2">
              {row.cells.map((cell, ci) => (
                <TextInput
                  key={ci}
                  value={cell}
                  placeholder={headers[ci]}
                  onChange={(e) => {
                    const nextRows = [...rows];
                    const cells = [...row.cells];
                    cells[ci] = e.target.value;
                    nextRows[ri] = { ...row, cells };
                    onChange(headers, nextRows);
                  }}
                />
              ))}
              <RemoveRowButton onClick={() => onChange(headers, rows.filter((r) => r.id !== row.id))} />
            </div>
          ))}
          <AddRowButton
            label="Add row"
            onClick={() =>
              onChange(headers, [...rows, { id: uid("r"), cells: headers.map(() => "") }])
            }
          />
        </div>
      </Field>
    </div>
  );
}

/* ─── Pills ─────────────────────────────────────────────────────────── */
function PillsEditor({
  pills,
  note,
  onChange,
}: Readonly<{
  pills: { id: string; text: string }[];
  note?: string;
  onChange: (pills: { id: string; text: string }[], note?: string) => void;
}>) {
  return (
    <div className="flex flex-col gap-3">
      <Field label="Tags">
        <div className="flex flex-wrap gap-1.5">
          {pills.map((p, i) => (
            <div key={p.id} className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 pl-2.5 pr-1 py-1">
              <input
                value={p.text}
                onChange={(e) => {
                  const next = [...pills];
                  next[i] = { ...p, text: e.target.value };
                  onChange(next, note);
                }}
                className="w-24 bg-transparent text-xs outline-none"
              />
              <RemoveRowButton onClick={() => onChange(pills.filter((x) => x.id !== p.id), note)} />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <AddRowButton label="Add tag" onClick={() => onChange([...pills, { id: uid("p"), text: "" }], note)} />
        </div>
      </Field>
      <Field label="Note (optional)">
        <TextArea rows={2} value={note ?? ""} onChange={(e) => onChange(pills, e.target.value)} />
      </Field>
    </div>
  );
}

/* ─── Timeline ──────────────────────────────────────────────────────── */
function TimelineEditor({
  phases,
  onChange,
}: Readonly<{
  phases: TimelinePhase[];
  onChange: (p: TimelinePhase[]) => void;
}>) {
  return (
    <div className="flex flex-col gap-2">
      {phases.map((phase, i) => (
        <div key={phase.id} className="rounded-lg border border-neutral-200 p-3">
          <div className="flex gap-2">
            <TextInput
              placeholder="Phase label"
              value={phase.label}
              onChange={(e) => {
                const next = [...phases];
                next[i] = { ...phase, label: e.target.value };
                onChange(next);
              }}
            />
            <TextInput
              placeholder="Days 1–3"
              value={phase.days}
              onChange={(e) => {
                const next = [...phases];
                next[i] = { ...phase, days: e.target.value };
                onChange(next);
              }}
              className="w-32"
            />
            <RemoveRowButton onClick={() => onChange(phases.filter((p) => p.id !== phase.id))} />
          </div>
          <TextArea
            className="mt-2"
            rows={2}
            placeholder="Tasks separated by · "
            value={phase.items}
            onChange={(e) => {
              const next = [...phases];
              next[i] = { ...phase, items: e.target.value };
              onChange(next);
            }}
          />
          <label className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
            <input
              type="checkbox"
              checked={!!phase.done}
              onChange={(e) => {
                const next = [...phases];
                next[i] = { ...phase, done: e.target.checked };
                onChange(next);
              }}
            />
            Mark as final / completed phase (green dot)
          </label>
        </div>
      ))}
      <AddRowButton
        label="Add phase"
        onClick={() => onChange([...phases, { id: uid("ph"), label: "", days: "", items: "" }])}
      />
    </div>
  );
}

/* ─── Milestones ────────────────────────────────────────────────────── */
function MilestonesEditor({
  items,
  onChange,
}: Readonly<{
  items: MilestoneItem[];
  onChange: (i: MilestoneItem[]) => void;
}>) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={item.id} className="flex items-center gap-2">
          <TextInput
            placeholder="Day 1"
            value={item.day}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, day: e.target.value };
              onChange(next);
            }}
            className="w-24"
          />
          <TextInput
            placeholder="Milestone label"
            value={item.label}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...item, label: e.target.value };
              onChange(next);
            }}
          />
          <label className="flex shrink-0 items-center gap-1 text-xs text-neutral-500">
            <input
              type="checkbox"
              checked={!!item.highlight}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...item, highlight: e.target.checked };
                onChange(next);
              }}
            />
            Final
          </label>
          <RemoveRowButton onClick={() => onChange(items.filter((x) => x.id !== item.id))} />
        </div>
      ))}
      <AddRowButton label="Add milestone" onClick={() => onChange([...items, { id: uid("m"), day: "", label: "" }])} />
    </div>
  );
}

/* ─── Payment ───────────────────────────────────────────────────────── */
function PaymentEditor({
  rows,
  totalAmount,
  totalPercentage,
  note,
  onChange,
}: Readonly<{
  rows: PaymentRow[];
  totalAmount: string;
  totalPercentage: string;
  note?: string;
  onChange: (data: { rows: PaymentRow[]; totalAmount: string; totalPercentage: string; note?: string }) => void;
}>) {
  const update = (patch: Partial<{ rows: PaymentRow[]; totalAmount: string; totalPercentage: string; note?: string }>) =>
    onChange({ rows, totalAmount, totalPercentage, note, ...patch });

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, i) => (
        <div key={row.id} className="rounded-lg border border-neutral-200 p-3">
          <div className="flex gap-2">
            <TextInput
              placeholder="Milestone name"
              value={row.milestone}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...row, milestone: e.target.value };
                update({ rows: next });
              }}
            />
            <RemoveRowButton onClick={() => update({ rows: rows.filter((r) => r.id !== row.id) })} />
          </div>
          <TextInput
            className="mt-2"
            placeholder="Trigger event"
            value={row.trigger}
            onChange={(e) => {
              const next = [...rows];
              next[i] = { ...row, trigger: e.target.value };
              update({ rows: next });
            }}
          />
          <div className="mt-2 flex gap-2">
            <TextInput
              placeholder="₹2,000"
              value={row.amount}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...row, amount: e.target.value };
                update({ rows: next });
              }}
            />
            <TextInput
              placeholder="20%"
              value={row.percentage}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...row, percentage: e.target.value };
                update({ rows: next });
              }}
            />
          </div>
        </div>
      ))}
      <AddRowButton
        label="Add payment milestone"
        onClick={() => update({ rows: [...rows, { id: uid("pr"), milestone: "", trigger: "", amount: "", percentage: "" }] })}
      />
      <div className="flex gap-2 border-t border-neutral-200 pt-3">
        <Field label="Total amount">
          <TextInput value={totalAmount} onChange={(e) => update({ totalAmount: e.target.value })} />
        </Field>
        <Field label="Total %">
          <TextInput value={totalPercentage} onChange={(e) => update({ totalPercentage: e.target.value })} />
        </Field>
      </div>
      <Field label="Note (optional)">
        <TextArea rows={2} value={note ?? ""} onChange={(e) => update({ note: e.target.value })} />
      </Field>
    </div>
  );
}

/* ─── Matrix ────────────────────────────────────────────────────────── */
function MatrixEditor({
  partyALabel,
  partyBLabel,
  rows,
  onChange,
}: Readonly<{
  partyALabel: string;
  partyBLabel: string;
  rows: MatrixRow[];
  onChange: (data: { partyALabel: string; partyBLabel: string; rows: MatrixRow[] }) => void;
}>) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Field label="Party A">
          <TextInput value={partyALabel} onChange={(e) => onChange({ partyALabel: e.target.value, partyBLabel, rows })} />
        </Field>
        <Field label="Party B">
          <TextInput value={partyBLabel} onChange={(e) => onChange({ partyALabel, partyBLabel: e.target.value, rows })} />
        </Field>
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((row, i) => (
          <div key={row.id} className="flex items-center gap-2">
            <TextInput
              value={row.item}
              onChange={(e) => {
                const next = [...rows];
                next[i] = { ...row, item: e.target.value };
                onChange({ partyALabel, partyBLabel, rows: next });
              }}
            />
            <label className="flex shrink-0 items-center gap-1 text-xs text-neutral-500">
              <input
                type="checkbox"
                checked={row.partyA}
                onChange={(e) => {
                  const next = [...rows];
                  next[i] = { ...row, partyA: e.target.checked };
                  onChange({ partyALabel, partyBLabel, rows: next });
                }}
              />
              A
            </label>
            <label className="flex shrink-0 items-center gap-1 text-xs text-neutral-500">
              <input
                type="checkbox"
                checked={row.partyB}
                onChange={(e) => {
                  const next = [...rows];
                  next[i] = { ...row, partyB: e.target.checked };
                  onChange({ partyALabel, partyBLabel, rows: next });
                }}
              />
              B
            </label>
            <RemoveRowButton onClick={() => onChange({ partyALabel, partyBLabel, rows: rows.filter((r) => r.id !== row.id) })} />
          </div>
        ))}
      </div>
      <AddRowButton
        label="Add row"
        onClick={() =>
          onChange({ partyALabel, partyBLabel, rows: [...rows, { id: uid("mr"), item: "", partyA: false, partyB: false }] })
        }
      />
    </div>
  );
}

/* ─── Signature ─────────────────────────────────────────────────────── */
function SignatureEditor({
  data,
  onChange,
}: Readonly<{
  data: { partyALabel: string; partyAName: string; partyASub: string; partyBLabel: string; partyBName: string; partyBSub: string };
  onChange: (d: typeof data) => void;
}>) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3">
        <Field label="Party A label">
          <TextInput value={data.partyALabel} onChange={(e) => onChange({ ...data, partyALabel: e.target.value })} />
        </Field>
        <Field label="Name">
          <TextInput value={data.partyAName} onChange={(e) => onChange({ ...data, partyAName: e.target.value })} />
        </Field>
        <Field label="Subtitle">
          <TextInput value={data.partyASub} onChange={(e) => onChange({ ...data, partyASub: e.target.value })} />
        </Field>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3">
        <Field label="Party B label">
          <TextInput value={data.partyBLabel} onChange={(e) => onChange({ ...data, partyBLabel: e.target.value })} />
        </Field>
        <Field label="Name">
          <TextInput value={data.partyBName} onChange={(e) => onChange({ ...data, partyBName: e.target.value })} />
        </Field>
        <Field label="Subtitle">
          <TextInput value={data.partyBSub} onChange={(e) => onChange({ ...data, partyBSub: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}