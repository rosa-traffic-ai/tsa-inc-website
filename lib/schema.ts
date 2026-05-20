import { z } from "zod";

const ctaLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
});

const heroSchema = z.object({
  eyebrow: z.string().min(1),
  lines: z.array(z.string().min(1)).min(1),
  italicLineIndexes: z.array(z.number().int().nonnegative()).optional(),
  subtext: z.string().min(1),
  primaryCta: ctaLinkSchema,
  secondaryCta: ctaLinkSchema.optional(),
});

const metricSchema = z.object({
  label: z.string().min(1),
  value: z.number().nonnegative(),
  suffix: z.string().optional(),
  durationMs: z.number().positive().optional(),
  displayText: z.string().optional(),
});

const serviceItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().startsWith("/"),
});

const serviceGroupSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  items: z.array(serviceItemSchema).min(1),
});

const pillarSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const approachSchema = z.object({
  tag: z.string().min(1),
  title: z.string().min(1),
  quote: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  pillars: z.array(pillarSchema).min(1),
});

const audienceSchema = z.object({
  tag: z.string().min(1),
  title: z.string().min(1),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .min(1),
});

const faqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

const detailSchema = z.object({
  title: z.string().min(1),
  intro: z.string().min(1),
  keyPoints: z.array(z.string().min(1)).min(1),
  whenToUse: z.array(z.string().min(1)).min(1),
  deliverables: z.array(z.string().min(1)).min(1),
  faqs: z.array(faqSchema).min(1),
});

const methodProfileSchema = z.object({
  objective: z.string().min(1),
  tools: z.array(z.string().min(1)).min(1),
  processSteps: z
    .array(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .min(1),
  capturedData: z.array(z.string().min(1)).min(1),
  analysisOutputs: z.array(z.string().min(1)).min(1),
  standards: z.array(z.string().min(1)).min(1),
  durationRules: z.array(z.string().min(1)).min(1),
  serviceHref: z.string().startsWith("/"),
});

const contactSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  submitLabel: z.string().min(1),
  endpointEnvVar: z.string().min(1),
  topics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .min(1),
  contactInfo: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        href: z.string().optional(),
      }),
    )
    .min(1),
});

export const frontmatterSchema = z.object({
  route: z.string().startsWith("/"),
  meta: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    canonical: z.string().url(),
    navLabel: z.string().optional(),
    template: z.enum(["home", "category", "detail", "contact", "custom"]),
  }),
  layoutFamily: z
    .enum(["services_hub", "services_detail", "contact"])
    .optional(),
  layoutTone: z.enum(["clay", "amber", "teal", "slate", "indigo"]).optional(),
  motionPreset: z.enum(["bold", "medium", "reduced"]).optional(),
  mediaMode: z.enum(["footage", "abstract", "hybrid"]).optional(),
  hero: heroSchema.optional(),
  statement: z
    .object({
      tag: z.string().min(1),
      text: z.string().min(1),
    })
    .optional(),
  metrics: z.array(metricSchema).optional(),
  serviceGroups: z.array(serviceGroupSchema).optional(),
  approach: approachSchema.optional(),
  audiences: audienceSchema.optional(),
  detail: detailSchema.optional(),
  methodProfile: methodProfileSchema.optional(),
  contact: contactSchema.optional(),
  relatedLinks: z.array(ctaLinkSchema).optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
