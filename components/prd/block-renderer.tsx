"use client";


import { Section } from "@/types/prd";
import styles from "@/styles/prd-theme.module.css";
import clsx from "clsx";

export function SectionHeading({ section }: Readonly<{ section: Section }>) {
  return (
    <>
      <div className={styles.secEyebrow}>{section.eyebrow}</div>
      <div className={styles.secHeading}>
        <div className={styles.secNum}>{section.number}</div>
        <h2>{section.title}</h2>
      </div>
    </>
  );
}

export function BlockRenderer({ section }: Readonly<{ section: Section }>) {
  const block = section.block;

  switch (block.type) {
    case "text":
      return (
        <div className={clsx(styles.card, styles.cardBlue, styles.mb8)}>
          <p style={{ marginBottom: 0, whiteSpace: "pre-wrap" }}>{block.text}</p>
        </div>
      );

    case "checklist":
      return (
        <div
          className={styles.mb8}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(block.columns.length, 2) || 1}, 1fr)`,
            gap: 8,
          }}
        >
          {block.columns.map((col) => {
            const checks = col.items.filter((i) => i.ok);
            const crosses = col.items.filter((i) => !i.ok);
            return (
              <div key={col.id}>
                {col.heading && <p className={clsx(styles.small, styles.bold, styles.mb6)}>{col.heading}</p>}
                {checks.length > 0 && (
                  <ul className={styles.checkList}>
                    {checks.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                )}
                {crosses.length > 0 && (
                  <ul className={clsx(styles.crossList, checks.length > 0 && styles.mt6)}>
                    {crosses.map((item) => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      );

    case "cards":
      return (
        <div
          className={styles.mb8}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${block.columns}, 1fr)`,
            gap: 8,
          }}
        >
          {block.cards.map((card) => (
            <div key={card.id} className={styles.card}>
              <h4>
                {card.emoji ? `${card.emoji}\u00A0\u00A0` : ""}
                {card.title}
              </h4>
              <p className={clsx(styles.small, styles.mt4)} style={{ marginBottom: 0 }}>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <table className={styles.prdTable}>
          <thead>
            <tr>
              {block.data.headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.data.rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "pills":
      return (
        <div className={clsx(styles.card, styles.mb8)}>
          <div className={styles.pillRow} style={{ marginTop: 0 }}>
            {block.data.pills.map((p) => (
              <span key={p.id} className={styles.pill}>
                {p.text}
              </span>
            ))}
          </div>
          {block.data.note && (
            <p className={clsx(styles.small, "muted", styles.mt6)} style={{ marginBottom: 0, color: "var(--muted)" }}>
              {block.data.note}
            </p>
          )}
        </div>
      );

    case "timeline":
      return (
        <div className={clsx(styles.timeline, styles.mb8)}>
          {block.phases.map((phase, idx) => (
            <div key={phase.id} className={styles.tlPhase}>
              <div className={styles.tlLeft}>
                <div className={clsx(styles.tlDot, phase.done && styles.done)} />
                {idx < block.phases.length - 1 && <div className={styles.tlLine} />}
              </div>
              <div className={styles.tlContent}>
                <div className={styles.tlPhaseLabel}>{phase.label}</div>
                <div className={styles.tlPhaseDays}>{phase.days}</div>
                <div className={styles.tlPhaseItems}>{phase.items}</div>
              </div>
            </div>
          ))}
        </div>
      );

    case "milestones":
      return (
        <div className={styles.milestoneRow}>
          {block.items.map((m) => (
            <div key={m.id} className={clsx(styles.milestoneCard, m.highlight && styles.highlight)}>
              <div className={styles.milestoneDay}>{m.day}</div>
              <div className={styles.milestoneLabel}>{m.label}</div>
            </div>
          ))}
        </div>
      );

    case "payment":
      return (
        <div>
          <table className={clsx(styles.prdTable, styles.payTable, styles.mb8)}>
            <thead>
              <tr>
                <th>Milestone</th>
                <th>Trigger Event</th>
                <th>Amount</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {block.data.rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <strong>{row.milestone}</strong>
                  </td>
                  <td>{row.trigger}</td>
                  <td>{row.amount}</td>
                  <td>{row.percentage}</td>
                </tr>
              ))}
              <tr className={styles.payTotal}>
                <td colSpan={2}>
                  <strong>Total Project Cost</strong>
                </td>
                <td>
                  <strong>{block.data.totalAmount}</strong>
                </td>
                <td>
                  <strong>{block.data.totalPercentage}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          {block.data.note && (
            <div className={clsx(styles.card, styles.cardBlue, styles.mb8)}>
              <p className={styles.small} style={{ marginBottom: 0 }}>
                {block.data.note}
              </p>
            </div>
          )}
        </div>
      );

    case "matrix":
      return (
        <table className={clsx(styles.prdTable, styles.respTable)}>
          <thead>
            <tr>
              <th>Item</th>
              <th style={{ textAlign: "center" }}>{block.data.partyALabel}</th>
              <th style={{ textAlign: "center" }}>{block.data.partyBLabel}</th>
            </tr>
          </thead>
          <tbody>
            {block.data.rows.map((row) => (
              <tr key={row.id}>
                <td>{row.item}</td>
                <td style={{ textAlign: "center" }}>
                  {row.partyA ? <span className={styles.matrixCheck}>✓</span> : "—"}
                </td>
                <td style={{ textAlign: "center" }}>
                  {row.partyB ? <span className={styles.matrixCheck}>✓</span> : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "signature":
      return (
        <div className={styles.sigBlock}>
          <div className={styles.sigBox}>
            <div className={styles.sigLabel}>{block.data.partyALabel}</div>
            <div className={styles.sigName}>{block.data.partyAName || "\u00A0"}</div>
            <div className={styles.sigSub}>{block.data.partyASub || "\u00A0"}</div>
            <div className={styles.sigLine} />
            <div className={styles.sigField}>Authorized Signature</div>
            <div style={{ height: 14 }} />
            <div className={styles.sigLine} style={{ marginTop: 8 }} />
            <div className={styles.sigField}>Date</div>
          </div>
          <div className={styles.sigBox}>
            <div className={styles.sigLabel}>{block.data.partyBLabel}</div>
            <div className={styles.sigName}>{block.data.partyBName || "\u00A0"}</div>
            <div className={styles.sigSub}>{block.data.partyBSub || "\u00A0"}</div>
            <div className={styles.sigLine} />
            <div className={styles.sigField}>Authorized Signature</div>
            <div style={{ height: 14 }} />
            <div className={styles.sigLine} style={{ marginTop: 8 }} />
            <div className={styles.sigField}>Date</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}