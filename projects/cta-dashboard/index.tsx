import "./tailwind.css";
import "./index.scss";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { MousePointerClick, Eye, TrendingUp, Target } from "lucide-react";

export const title = "CTA Performance";
export const description =
  "Dashboard for call-to-action performance across the new website — impressions, clicks, CTR, and conversions.";

export type CtaPerformance = {
  id: string;
  ctaLabel: string;
  page: string;
  section: string;
  impressions: number;
  clicks: number;
  conversions: number;
};

const MOCK_CTA_DATA: CtaPerformance[] = [
  { id: "1", ctaLabel: "Get started", page: "Homepage", section: "Hero", impressions: 12400, clicks: 892, conversions: 124 },
  { id: "2", ctaLabel: "Watch demo", page: "Homepage", section: "Hero", impressions: 12400, clicks: 445, conversions: 89 },
  { id: "3", ctaLabel: "Start free trial", page: "Pricing", section: "Plans", impressions: 8200, clicks: 1196, conversions: 312 },
  { id: "4", ctaLabel: "Sign in", page: "Global", section: "Nav", impressions: 24000, clicks: 1800, conversions: 0 },
  { id: "5", ctaLabel: "Contact sales", page: "Homepage", section: "Footer", impressions: 3100, clicks: 186, conversions: 42 },
  { id: "6", ctaLabel: "Learn more", page: "Features", section: "Overview", impressions: 6200, clicks: 434, conversions: 67 },
  { id: "7", ctaLabel: "Book a demo", page: "Pricing", section: "Enterprise", impressions: 2800, clicks: 392, conversions: 98 },
  { id: "8", ctaLabel: "Download guide", page: "Resources", section: "Lead magnet", impressions: 5100, clicks: 612, conversions: 510 },
  { id: "9", ctaLabel: "Try for free", page: "Homepage", section: "Social proof", impressions: 9200, clicks: 736, conversions: 184 },
  { id: "10", ctaLabel: "See pricing", page: "Homepage", section: "Hero", impressions: 12400, clicks: 620, conversions: 93 },
];

function formatNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

function ctr(clicks: number, impressions: number): number {
  return impressions > 0 ? (clicks / impressions) * 100 : 0;
}

function convRate(conversions: number, clicks: number): number {
  return clicks > 0 ? (conversions / clicks) * 100 : 0;
}

export default function CtaDashboard() {
  const totals = useMemo(() => {
    const impressions = MOCK_CTA_DATA.reduce((s, r) => s + r.impressions, 0);
    const clicks = MOCK_CTA_DATA.reduce((s, r) => s + r.clicks, 0);
    const conversions = MOCK_CTA_DATA.reduce((s, r) => s + r.conversions, 0);
    return {
      impressions,
      clicks,
      conversions,
      avgCtr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      avgConvRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
    };
  }, []);

  const topByCtr = useMemo(() => {
    return [...MOCK_CTA_DATA]
      .sort((a, b) => ctr(b.clicks, b.impressions) - ctr(a.clicks, a.impressions))[0];
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <nav className="mb-6 flex items-center border-b border-border pb-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All projects
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            CTA performance
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Call-to-action metrics across the new website. Mock data for design.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">Impressions</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {formatNum(totals.impressions)}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MousePointerClick size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">Clicks</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {formatNum(totals.clicks)}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">Avg. CTR</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {totals.avgCtr.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target size={18} strokeWidth={1.5} />
              <span className="text-sm font-medium">Conversions</span>
            </div>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {formatNum(totals.conversions)}
            </p>
          </div>
        </section>

        {topByCtr && (
          <div className="mb-6 rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm">
            <span className="text-muted-foreground">Top CTR: </span>
            <span className="font-medium text-foreground">“{topByCtr.ctaLabel}”</span>
            <span className="text-muted-foreground">
              {" "}on {topByCtr.page} ({topByCtr.section}) — {ctr(topByCtr.clicks, topByCtr.impressions).toFixed(1)}%
            </span>
          </div>
        )}

        <section className="rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">By CTA</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Performance by button/link across pages and sections
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3">CTA</th>
                  <th className="px-4 py-3">Page</th>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3 text-right">Impressions</th>
                  <th className="px-4 py-3 text-right">Clicks</th>
                  <th className="px-4 py-3 text-right">CTR</th>
                  <th className="px-4 py-3 text-right">Conversions</th>
                  <th className="px-4 py-3 text-right">Conv. rate</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CTA_DATA.map((row) => (
                  <tr key={row.id} className="transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {row.ctaLabel}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.page}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.section}</td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatNum(row.impressions)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatNum(row.clicks)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {ctr(row.clicks, row.impressions).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatNum(row.conversions)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {row.clicks > 0
                        ? `${convRate(row.conversions, row.clicks).toFixed(1)}%`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export const routes = [{ path: "/", Component: () => null }];
