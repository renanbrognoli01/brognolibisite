"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ScreenshotGalleryItem = {
  src: string;
  title: string;
};

type ScreenshotGalleryProps = {
  items: ScreenshotGalleryItem[];
};

export function ScreenshotGallery({ items }: ScreenshotGalleryProps) {
  const [active, setActive] = useState<ScreenshotGalleryItem | null>(null);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActive(item)}
            className="group text-left"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] transition duration-200 group-hover:-translate-y-1 group-hover:border-white/20">
              <Image src={item.src} alt={item.title} fill className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--background)] via-[color:rgba(7,21,33,0.7)] to-transparent p-4">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">Clique para ampliar</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color:rgba(4,17,28,0.88)] p-6 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[var(--surface-1)] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-xl text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close preview"
            >
              ×
            </button>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#061521]">
              <Image src={active.src} alt={active.title} fill className="object-contain" />
            </div>
            <div className="px-2 pb-2 pt-5">
              <p className="text-lg font-semibold text-white">{active.title}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
