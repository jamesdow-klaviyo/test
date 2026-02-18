import "./tailwind.css";
import "./index.scss";
import {
  Target,
  BarChart3,
  ArrowUpRight,
  Mail,
  MessageSquare,
  Bell,
} from "lucide-react";
import { AppChrome } from "./components/chrome/AppChrome";

export const title = "Fender dashboard";
export const description =
  "Recreation of the Klaviyo Fender dashboard (home) — greeting, conversions, flows, and recently sent.";

/* Mock data for dashboard */
const MOCK_CONVERSION = {
  totalCurrent: 2847,
  totalPrevious: 2612,
  attributedCurrent: 892,
  attributedPrevious: 834,
};

const MOCK_FLOWS = [
  { id: "1", name: "Welcome series", types: "Email", status: "Live", conversion: 312, trend: 12 },
  { id: "2", name: "Browse abandonment", types: "Email, SMS", status: "Live", conversion: 189, trend: -3 },
  { id: "3", name: "Post-purchase", types: "Email", status: "Live", conversion: 156, trend: 8 },
  { id: "4", name: "Win-back", types: "Email", status: "Manual", conversion: 98, trend: 0 },
  { id: "5", name: "SMS signup", types: "SMS", status: "Live", conversion: 67, trend: 15 },
];

const MOCK_RECENTLY_SENT = [
  { id: "1", name: "Weekly digest — Feb 17", type: "Email", sent: "Feb 17, 2026, 9:00 AM", conversion: 42 },
  { id: "2", name: "Flash sale reminder", type: "SMS", sent: "Feb 16, 2026, 2:30 PM", conversion: 28 },
  { id: "3", name: "New arrivals", type: "Email", sent: "Feb 16, 2026, 10:00 AM", conversion: 89 },
  { id: "4", name: "Cart reminder", type: "Email", sent: "Feb 15, 2026, 4:00 PM", conversion: 15 },
  { id: "5", name: "Push — product back in stock", type: "Push", sent: "Feb 15, 2026, 11:00 AM", conversion: 12 },
];

const MAX_WIDTH = 1150;
const MIN_WIDTH = 900;

function formatNum(n: number): string {
  return n.toLocaleString();
}

export default function FenderDashboard() {
  const conversionPct =
    MOCK_CONVERSION.totalPrevious > 0
      ? (((MOCK_CONVERSION.totalCurrent - MOCK_CONVERSION.totalPrevious) /
          MOCK_CONVERSION.totalPrevious) *
          100)
      : 0;
  const attributedPct =
    MOCK_CONVERSION.totalCurrent > 0
      ? (MOCK_CONVERSION.attributedCurrent / MOCK_CONVERSION.totalCurrent) * 100
      : 0;

  return (
    <AppChrome>
      <div
        className="min-h-full bg-background text-foreground"
        style={{ maxWidth: MAX_WIDTH, minWidth: MIN_WIDTH, margin: "0 auto" }}
      >
        <div className="px-4 py-6 sm:px-6">
          {/* Greeting */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back, James
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <span className="size-4 rounded-full border border-muted-foreground/50" />
            Customize your message name in{" "}
            <a
              href="#"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              account settings
            </a>
          </p>
        </header>

        {/* Selectors bar */}
        <section className="mb-6 flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Conversion metric
            </label>
            <select
              className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
              defaultValue="revenue"
            >
              <option value="revenue">Revenue</option>
              <option value="conversions">Conversions</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Time period
            </label>
            <select
              className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground"
              defaultValue="30"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </section>

        {/* Conversions card — matches design system Card (rounded-xl, border, shadow-sm) */}
        <section className="mb-6 rounded-xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-6 py-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Conversions
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Last 30 days
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Overview dashboard
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-secondary/50 p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Target size={18} strokeWidth={1.5} />
                  <span className="text-sm font-medium">Total</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {formatNum(MOCK_CONVERSION.totalCurrent)}
                </p>
                <p
                  className={`mt-1 text-sm ${conversionPct >= 0 ? "metric-up" : "text-muted-foreground"}`}
                >
                  {conversionPct >= 0 ? "+" : ""}
                  {conversionPct.toFixed(1)}% vs previous period
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/50 p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BarChart3 size={18} strokeWidth={1.5} />
                  <span className="text-sm font-medium">Attributed</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {formatNum(MOCK_CONVERSION.attributedCurrent)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {attributedPct.toFixed(0)}% of total
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Flows card */}
        <section className="mb-6 rounded-lg border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Flows</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Last 30 days · by conversion
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View flows
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3">Flow</th>
                  <th className="px-4 py-3">Types</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Conversion</th>
                  <th className="px-4 py-3 text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_FLOWS.map((row) => (
                  <tr key={row.id} className="transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.types}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          row.status === "Live"
                            ? "bg-success-muted text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatNum(row.conversion)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      <span
                        className={
                          row.trend > 0
                            ? "metric-up"
                            : row.trend < 0
                              ? "text-muted-foreground"
                              : ""
                        }
                      >
                        {row.trend > 0 ? "+" : ""}
                        {row.trend}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Recently sent card */}
        <section className="rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border px-4 py-3">
            <h2 className="text-sm font-semibold text-foreground">
              Recently sent
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Last 30 days
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3">Campaign</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Sent</th>
                  <th className="px-4 py-3 text-right">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_RECENTLY_SENT.map((row) => (
                  <tr key={row.id} className="transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        {row.type === "Email" && <Mail size={14} />}
                        {row.type === "SMS" && <MessageSquare size={14} />}
                        {row.type === "Push" && <Bell size={14} />}
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.sent}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">
                      {formatNum(row.conversion)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </div>
      </div>
    </AppChrome>
  );
}

export const routes = [{ path: "/", Component: () => null }];
