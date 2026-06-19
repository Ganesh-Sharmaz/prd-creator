"use client";


import { BrandMeta, CoverMeta, Section } from "@/types/prd";
import { SectionHeading, BlockRenderer } from "./block-renderer";
import styles from "@/styles/prd-theme.module.css";
import { FileText } from "lucide-react";

function themeVars(brand: BrandMeta): React.CSSProperties {
  return {
    "--primary": brand.primaryColor,
    "--accent": brand.accentColor,
  } as React.CSSProperties;
}

export function CoverPage({
  brand,
  cover,
}: Readonly<{
  brand: BrandMeta;
  cover: CoverMeta;
}>) {
  return (
    <div className={styles.page} style={themeVars(brand)} data-pdf-page>
      <div className={styles.coverTop}>
        <div className={styles.coverStripe} />
        <div className={styles.coverMain}>
          <div className={styles.coverLogoArea}>
            <div className={styles.coverLogoMark}>
              {brand.logoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={brand.logoDataUrl} alt={`${brand.companyName} logo`} />
              ) : (
                <FileText size={24} color="#fff" />
              )}
            </div>
            <div className={styles.coverLogoText}>
              <div className={styles.coverLogoBrand}>{brand.companyName.toUpperCase()}</div>
              <div className={styles.coverLogoSub}>{brand.tagline}</div>
            </div>
          </div>

          <div className={styles.coverHero}>
            <div className={styles.coverKicker}>{cover.kicker}</div>
            <div className={styles.coverTitle}>
              {cover.titleLine1}
              <br />
              <span>{cover.titleLine2}</span>
            </div>
            <div className={styles.coverSubtitle}>{cover.subtitle}</div>

            <div className={styles.coverMetaGrid}>
              <MetaItem label="Document Version" value={cover.docVersion} />
              <MetaItem label="Delivery Timeline" value={cover.deliveryTimeline} />
              <MetaItem label="Prepared For" value={cover.preparedFor} />
              <MetaItem label="Technology Stack" value={cover.techStack} />
              <MetaItem label="Prepared By" value={cover.preparedBy} />
              <MetaItem label="Project Value" value={cover.projectValue} />
            </div>
          </div>
        </div>

        <div className={styles.coverBottom}>
          <div className={styles.coverBottomLeft}>
            <p>
              <strong>{brand.companyName}</strong> &nbsp;·&nbsp; {brand.email}
            </p>
            <p>
              {brand.phone}
              {brand.gstin ? ` \u00A0·\u00A0 GSTIN: ${brand.gstin}` : ""}
            </p>
          </div>
          <div className={styles.coverConfidential}>Confidential</div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }: Readonly<{ label: string; value: string }>) {
  return (
    <div className={styles.coverMetaItem}>
      <div className={styles.coverMetaKey}>{label}</div>
      <div className={styles.coverMetaVal}>{value}</div>
    </div>
  );
}

export function ContentPage({
  brand,
  docTitle,
  docVersion,
  footerDocLabel,
  sections,
  pageNumber,
  totalPages,
}: Readonly<{
  brand: BrandMeta;
  docTitle: string;
  docVersion: string;
  footerDocLabel: string;
  sections: Section[];
  pageNumber: number;
  totalPages: number;
}>) {
  return (
    <div className={styles.page} style={themeVars(brand)} data-pdf-page>
      <div className={styles.pageHeader}>
        <div className={styles.headerLogo}>
          <div className={styles.logoMark}>
            {brand.logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={brand.logoDataUrl} alt={`${brand.companyName} logo`} />
            ) : (
              <FileText size={16} color="var(--primary)" />
            )}
          </div>
          <div className={styles.logoText}>
            <div className={styles.logoBrand}>{brand.companyName.toUpperCase()}</div>
            <div className={styles.logoSub}>{brand.email}</div>
          </div>
        </div>
        <div className={styles.headerMeta}>
          <div className={styles.headerDocTitle}>{docTitle}</div>
          <div className={styles.headerDocVer}>{docVersion}</div>
        </div>
      </div>

      <div className={styles.pageBody}>
        {sections.map((section, idx) => (
          <div key={section.id}>
            <SectionHeading section={section} />
            <BlockRenderer section={section} />
            {idx < sections.length - 1 && <hr className={styles.dividerThick} />}
          </div>
        ))}
      </div>

      <div className={styles.pageFooter}>
        <div className={styles.footerLeft}>
          {brand.companyName} &nbsp;·&nbsp; {brand.email} &nbsp;·&nbsp; {brand.phone}
        </div>
        <div className={styles.footerMid}>{footerDocLabel}</div>
        <div className={styles.footerRight}>
          Page <span className={styles.pageNum}>{pageNumber}</span> of {totalPages} &nbsp;|&nbsp; Confidential
        </div>
      </div>
    </div>
  );
}