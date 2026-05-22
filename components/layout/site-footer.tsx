import Link from "next/link";

import { SiteLogo } from "@/components/layout/site-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand px-5 py-8 sm:px-8 lg:px-10">
      <div className="grid gap-4 text-center md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="md:justify-self-start">
          <Link aria-label="Traffic Survey Analysis Inc." className="inline-flex items-center" href="/">
            <SiteLogo className="h-8 w-auto" />
          </Link>
        </div>
        <p className="text-xs text-ink/60">© 1999 Traffic Survey Analysis Inc. Traffic Monitoring &amp; Data Collection.</p>
        <Link
          className="font-ui text-xs font-semibold text-clay transition hover:opacity-80 md:justify-self-end"
          href="https://www.tsa-inc.ca"
          target="_blank"
        >
          tsa-inc.ca
        </Link>
      </div>
    </footer>
  );
}
