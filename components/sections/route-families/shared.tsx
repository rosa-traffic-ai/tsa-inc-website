import type { ReactNode } from "react";

import { OrnamentField } from "@/components/sections/ornament-field";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import type { ResolvedRouteLayout } from "@/lib/layout-orchestration";
import type { HeroBlock } from "@/lib/types";
import type { ToneVariant } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function RouteHeader({
  hero,
  tone,
  className,
  align = "left",
  sideContent,
  layout,
  eyebrowClassName,
  heroAccentClassName,
}: {
  hero: HeroBlock;
  tone: ToneVariant;
  className?: string;
  align?: "left" | "center";
  sideContent?: ReactNode;
  layout: ResolvedRouteLayout;
  eyebrowClassName?: string;
  heroAccentClassName?: string;
}) {
  const centered = align === "center";

  return (
    <section className={cn("relative overflow-hidden px-5 pb-14 pt-34 sm:px-8 lg:px-10", className)}>
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", tone.accentGradient)} />
      <div className="pointer-events-none absolute right-0 top-0 h-60 w-60 rounded-full bg-paper/60 blur-3xl" />
      <OrnamentField
        className="opacity-80"
        motionPreset={layout.motionPreset}
        placement={layout.motionConfig.assetPlacement}
        preset={layout.motionConfig.ornamentPreset}
      />
      <div className={cn("relative z-10 mx-auto max-w-6xl", centered ? "text-center" : "") }>
        <div className={cn("grid gap-10", sideContent ? "lg:grid-cols-[1.08fr_0.92fr] lg:items-end" : "") }>
          <div>
            <Reveal>
              <p className={cn("font-ui text-xs font-semibold uppercase tracking-[0.16em]", tone.accentText, eyebrowClassName)}>
                {hero.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <Heading
                as="h1"
                className={cn(
                  "mt-4 text-[clamp(2.3rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]",
                  centered ? "mx-auto max-w-4xl" : "max-w-3xl",
                )}
              >
                {hero.lines.map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {hero.italicLineIndexes?.includes(index) ? (
                      <em className={cn("font-body not-italic", tone.accentText, heroAccentClassName)}>{line}</em>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </Heading>
            </Reveal>
            <Reveal delay={0.09}>
              <p className={cn("mt-5 text-base leading-8 text-ink/75", centered ? "mx-auto max-w-2xl" : "max-w-2xl")}>
                {hero.subtext}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div
                className={cn(
                  "mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-[30rem] sm:flex-row sm:items-center sm:gap-3.5",
                  centered ? "mx-auto justify-center" : "justify-start",
                )}
              >
                <Button
                  className="w-full sm:min-w-[12.75rem]"
                  href={hero.primaryCta.href}
                  external={hero.primaryCta.external}
                  size="lg"
                  variant="primary"
                >
                  {hero.primaryCta.label}
                </Button>
                {hero.secondaryCta ? (
                  <Button
                    className="w-full sm:min-w-[11.5rem]"
                    href={hero.secondaryCta.href}
                    external={hero.secondaryCta.external}
                    size="lg"
                    variant="ghost"
                  >
                    {hero.secondaryCta.label}
                  </Button>
                ) : null}
              </div>
            </Reveal>
          </div>

          {sideContent ? <Reveal delay={0.14}>{sideContent}</Reveal> : null}
        </div>
      </div>
    </section>
  );
}
