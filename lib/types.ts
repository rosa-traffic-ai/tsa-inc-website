export type PageTemplate = "home" | "category" | "detail" | "contact" | "custom";
export type LayoutFamily = "services_hub" | "services_detail" | "contact";
export type LayoutTone = "clay" | "amber" | "teal" | "slate" | "indigo";
export type MotionPreset = "bold" | "medium" | "reduced";
export type MediaMode = "footage" | "abstract" | "hybrid";
export type RouteInteractionStyle = "chapter" | "compact" | "restrained";
export type OrnamentPreset =
  | "services_hub"
  | "counts_flow"
  | "surveys_matrix"
  | "studies_signal"
  | "detail_counts"
  | "detail_surveys"
  | "detail_studies"
  | "custom_builder"
  | "contact_timeline";
export type AssetPlacement = "left" | "right" | "center";
export type PanelHeight = "short" | "medium" | "tall";

export interface RouteMotionConfig {
  interactionStyle: RouteInteractionStyle;
  ornamentPreset: OrnamentPreset;
  assetPlacement: AssetPlacement;
  panelHeight: PanelHeight;
  scrubStrength: number;
}

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  navLabel?: string;
  template: PageTemplate;
}

export interface CtaLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface HeroBlock {
  eyebrow: string;
  lines: string[];
  italicLineIndexes?: number[];
  subtext: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

export interface StatementBlock {
  tag: string;
  text: string;
}

export interface MetricItem {
  label: string;
  value: number;
  suffix?: string;
  durationMs?: number;
  displayText?: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
}

export interface ServiceGroupBlock {
  id: string;
  label: string;
  description: string;
  items: ServiceItem[];
}

export interface PillarItem {
  title: string;
  description: string;
}

export interface ApproachBlock {
  tag: string;
  title: string;
  quote: string;
  paragraphs: string[];
  pillars: PillarItem[];
}

export interface AudienceItem {
  title: string;
  description: string;
}

export interface AudienceBlock {
  tag: string;
  title: string;
  items: AudienceItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DetailSectionBlock {
  title: string;
  intro: string;
  keyPoints: string[];
  whenToUse: string[];
  deliverables: string[];
  faqs: FAQItem[];
}

export interface MethodProcessStep {
  title: string;
  description: string;
}

export interface MethodProfileBlock {
  objective: string;
  tools: string[];
  processSteps: MethodProcessStep[];
  capturedData: string[];
  analysisOutputs: string[];
  standards: string[];
  durationRules: string[];
  serviceHref: string;
}

export interface ContactTopic {
  label: string;
  value: string;
}

export interface ContactInfoItem {
  label: string;
  value: string;
  href?: string;
}

export interface CTAFormBlock {
  title: string;
  subtitle: string;
  submitLabel: string;
  endpointEnvVar: string;
  topics: ContactTopic[];
  contactInfo: ContactInfoItem[];
}

export interface PageContent {
  route: string;
  meta: PageMeta;
  layoutFamily?: LayoutFamily;
  layoutTone?: LayoutTone;
  motionPreset?: MotionPreset;
  mediaMode?: MediaMode;
  hero?: HeroBlock;
  statement?: StatementBlock;
  metrics?: MetricItem[];
  serviceGroups?: ServiceGroupBlock[];
  approach?: ApproachBlock;
  audiences?: AudienceBlock;
  detail?: DetailSectionBlock;
  methodProfile?: MethodProfileBlock;
  contact?: CTAFormBlock;
  relatedLinks?: CtaLink[];
  body?: string;
}

export interface NavItem {
  href: string;
  label: string;
}
