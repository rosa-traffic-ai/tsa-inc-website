import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { surfacePanel } from "@/components/ui/patterns";
import type { ToneVariant } from "@/lib/theme";
import type { MethodProcessStep } from "@/lib/types";
import { cn } from "@/lib/utils";

const SECTION_TITLE_CLASS = "text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.06] tracking-[-0.03em]";
const EYEBROW_CLASS = "font-ui text-xs font-semibold uppercase tracking-[0.13em] text-clay";
const MICRO_LABEL_CLASS = "font-ui text-[10px] font-semibold uppercase tracking-[0.12em] text-clay";

interface ToolingGridProps {
  tone: ToneVariant;
  tools: string[];
}

interface ProcessStepsPanelProps {
  tone: ToneVariant;
  steps: MethodProcessStep[];
}

interface OutputMatrixProps {
  tone: ToneVariant;
  capturedData: string[];
  analysisOutputs: string[];
}

function BulletList({ items, tone }: { items: string[]; tone: ToneVariant }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-7 text-ink/75">
          <span className={cn("mt-[0.58rem] inline-block h-1.5 w-1.5 shrink-0 rounded-full", tone.accentDot)} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ToolingGrid({ tone, tools }: ToolingGridProps) {
  return (
    <div className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)} data-testid="method-tooling-grid">
      <p className={EYEBROW_CLASS}>Tooling stack</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {tools.map((tool) => (
          <p key={tool} className="rounded-xl border border-line/75 bg-paper/92 px-3 py-2.5 text-sm text-ink/75">
            {tool}
          </p>
        ))}
      </div>
    </div>
  );
}

export function ProcessStepsPanel({ tone, steps }: ProcessStepsPanelProps) {
  return (
    <section className="px-5 py-14 sm:px-8 lg:px-10" data-testid="method-process-steps">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h2" className={SECTION_TITLE_CLASS}>
            Process sequence
          </Heading>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.04}>
              <article className={cn(surfacePanel({ padding: "md" }), tone.accentBorder, "h-full")}>
                <p className={MICRO_LABEL_CLASS}>Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ink/75">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OutputMatrix({ tone, capturedData, analysisOutputs }: OutputMatrixProps) {
  return (
    <section className="bg-sand px-5 py-16 sm:px-8 lg:px-10" data-testid="method-output-matrix">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading as="h2" className={SECTION_TITLE_CLASS}>
            Captured data and outputs
          </Heading>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
              <p className={EYEBROW_CLASS}>Captured data</p>
              <BulletList items={capturedData} tone={tone} />
            </article>
          </Reveal>
          <Reveal delay={0.05}>
            <article className={cn(surfacePanel({ padding: "lg" }), tone.accentBorder)}>
              <p className={EYEBROW_CLASS}>Analysis outputs</p>
              <BulletList items={analysisOutputs} tone={tone} />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
