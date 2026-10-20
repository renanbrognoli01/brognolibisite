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
  children,
}: {
  title: string;
  description: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
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

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="editorial-section">
      <Container>
        <div className="mb-8 max-w-3xl space-y-4">
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
    <div className="content-panel">
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

export function HeroPortrait({
  src = "/media/renan 1.png",
}: {
  src?: string;
}) {
  return (
    <div className="relative mx-auto aspect-[0.82] w-full max-w-md overflow-hidden bg-[var(--surface-1)]">
      <Image
        src={src}
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
      className="action-primary"
    >
      {children}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="action-secondary"
    >
      {children}
    </Link>
  );
}
