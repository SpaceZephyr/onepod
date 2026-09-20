"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/lib/types";
import NewsMarkdown from "./NewsMarkdown";
import styles from "./news.module.css";

function formatTime(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function dateCode(iso?: string) {
  if (!iso) return "----";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "----";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const mo = parts.find((p) => p.type === "month")?.value || "00";
  const da = parts.find((p) => p.type === "day")?.value || "00";
  return `${mo}${da}`;
}

function previewText(md: string, max = 180) {
  const plain = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[#>*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, max).replace(/[，、；：:,.。\s]+$/g, "") + "…";
}

export default function NewsFeed({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.top}>
          <div>
            <h1 className={styles.brand}>OnePod 日报</h1>
          </div>
        </header>

        {items.length === 0 && <div className={styles.state}>暂无条目</div>}

        <section className={styles.grid}>
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={styles.card}
              style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
              onClick={() => setActive(item)}
            >
              <article className={styles.cardInner}>
                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <span className={styles.channel}>
                      {item.source || "未知来源"}
                    </span>
                    <span className={styles.dateCode}>{dateCode(item.time)}</span>
                  </div>
                  {item.category ? (
                    <span className={`${styles.catBadge} ${styles.catBadgeInline}`}>
                      {item.category}
                    </span>
                  ) : null}
                  <h2 className={styles.title}>{item.title}</h2>
                  <p className={styles.authorLine}>
                    {item.author && item.author !== item.source
                      ? `${item.author} · ${formatTime(item.time)}`
                      : formatTime(item.time)}
                  </p>
                  <p className={styles.preview}>{previewText(item.body || "")}</p>
                </div>
              </article>
            </button>
          ))}
        </section>
      </div>

      {active && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-detail-title"
          onClick={() => setActive(null)}
        >
          <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.close}
              type="button"
              onClick={() => setActive(null)}
              aria-label="关闭"
            >
              ×
            </button>
            <div className={styles.sheetHead}>
              {active.category ? (
                <span className={`${styles.catBadge} ${styles.catBadgeSolid}`}>
                  {active.category}
                </span>
              ) : null}
              <h2 id="news-detail-title">{active.title}</h2>
              <p className={styles.sheetMeta}>
                <span>{formatTime(active.time)}</span>
                <span className={styles.dot}>·</span>
                <span>{active.source}</span>
                {active.author ? (
                  <>
                    <span className={styles.dot}>·</span>
                    <span>{active.author}</span>
                  </>
                ) : null}
              </p>
              {active.url ? (
                <a
                  className={styles.origin}
                  href={active.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  打开原文 ↗
                </a>
              ) : null}
            </div>
            <div className={styles.sheetBody}>
              <NewsMarkdown source={active.body || ""} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
