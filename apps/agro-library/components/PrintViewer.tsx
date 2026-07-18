"use client";

import { useEffect, useState } from "react";
import styles from "./PrintViewer.module.css";

export function PrintViewer({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <button type="button" className={styles.trigger} onClick={() => setOpen(true)} aria-label={`Expand ${alt}`}>
        <img src={src} alt={alt} />
        <span>Expand print</span>
      </button>
      {open ? (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <div className={styles.lightboxContent} onClick={(event) => event.stopPropagation()}>
            <img src={src} alt={alt} />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close expanded print">Close</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
