import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6">{children}</div>;
}

export function PageHero({
  title,
  description,
  eyebrow,
  children,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-white/10">
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            {eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#f6b23c]">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/72">{description}</p>
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}

export function Section({ eyebrow, title, description, children }: SectionProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 max-w-3xl space-y-4">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#13766e]">{eyebrow}</p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
          {description ? <p className="text-base leading-7 text-white/70">{description}</p> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function GlassCard({
  title,
  description,
  children,
  href,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  href?: string;
}) {
  const content = (
    <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:border-white/16">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {description ? <p className="text-sm leading-7 text-white/72">{description}</p> : null}
        {children}
      </div>
    </div>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}

export function HeroPortrait() {
  return (
    <div className="relative mx-auto aspect-[0.82] w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0f1118] via-[#141722] to-[#12141d] shadow-[0_40px_120px_rgba(0,0,0,0.32)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(246,178,60,0.22),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(19,118,110,0.22),_transparent_30%)]" />
      <Image
        src="/media/renan 1.png"
        alt="Renan Brognoli"
        fill
        className="object-contain object-bottom"
        priority
      />
    </div>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-[#f6b23c] px-6 py-3 text-sm font-semibold text-[#151618] transition hover:scale-[1.02]"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
    >
      {children}
    </Link>
  );
}
