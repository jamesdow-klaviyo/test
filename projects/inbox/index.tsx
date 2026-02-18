import "./tailwind.css";
import "./index.scss";
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Star, Archive, Trash2, Inbox as InboxIcon, Star as StarIcon, Plus, Search, Menu, ChevronDown } from "lucide-react";

export const title = "Inbox Zero";
export const description =
  "A Gmail-style inbox simulation — star, archive, or delete with smooth animations and progress toward inbox zero.";

export type Email = {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  date: string;
  starred: boolean;
  unread: boolean;
};

const MOCK_EMAILS: Email[] = [
  { id: "1", from: "Team Ascent", subject: "Weekly design sync — agenda", snippet: "Hi! Here's the agenda for Thursday's sync. We'll cover the new component library and…", date: "10:42 AM", starred: false, unread: true },
  { id: "2", from: "Notion", subject: "Your doc \"Q1 Goals\" was updated", snippet: "Sarah mentioned you in a comment. Open the doc to see what changed.", date: "9:18 AM", starred: true, unread: true },
  { id: "3", from: "Stripe", subject: "Receipt for your payment", snippet: "You paid Acme Inc. $29.00. Receipt and invoice are attached.", date: "Yesterday", starred: false, unread: true },
  { id: "4", from: "Linear", subject: "Issue ENG-421 moved to In Progress", snippet: "You were assigned to this issue. Due: Feb 20.", date: "Yesterday", starred: false, unread: false },
  { id: "5", from: "Figma", subject: "You have 3 new comments", snippet: "Comments from the team on the checkout flow frames.", date: "Mon", starred: true, unread: false },
  { id: "6", from: "GitHub", subject: "Pull request #142 merged", snippet: "Your PR into main was merged. Great work on the refactor.", date: "Mon", starred: false, unread: false },
  { id: "7", from: "Calendar", subject: "Reminder: Interview at 2:00 PM", snippet: "Design interview with candidate — Product role. Meet in Room 4.", date: "Sun", starred: false, unread: true },
  { id: "8", from: "Slack", subject: "Summary of your unread threads", snippet: "You have 4 unread threads in #design and #product.", date: "Sat", starred: false, unread: false },
  { id: "9", from: "Newsletter", subject: "Design systems weekly #89", snippet: "This week: accessibility in design tokens, new Figma plugins, and more.", date: "Fri", starred: true, unread: false },
  { id: "10", from: "Support", subject: "Your ticket #8821 was resolved", snippet: "We've marked your request as resolved. Reply to reopen.", date: "Fri", starred: false, unread: false },
  { id: "11", from: "HR", subject: "Benefits open enrollment ends soon", snippet: "Reminder: open enrollment closes next Friday. Review your selections in the portal.", date: "Thu", starred: false, unread: true },
  { id: "12", from: "Alex Chen", subject: "Quick question about the prototype", snippet: "Hey! Can we jump on a 15-min call to walk through the interaction on the modal?", date: "Thu", starred: false, unread: false },
  { id: "13", from: "Vercel", subject: "Deployment ready: ascent-spark", snippet: "Your deployment to production completed successfully.", date: "Wed", starred: false, unread: false },
  { id: "14", from: "Loom", subject: "New video shared with you", snippet: "Jordan shared a Loom about the onboarding flow. Watch it here.", date: "Wed", starred: false, unread: false },
  { id: "15", from: "Spotify", subject: "Your Discover Weekly is ready", snippet: "We picked 30 new songs we think you'll love. Listen now.", date: "Tue", starred: false, unread: false },
];

const INITIAL_COUNT = MOCK_EMAILS.length;

function useExitAnimation(remove: (id: string) => void, delayMs = 320) {
  const [exiting, setExiting] = useState<Set<string>>(new Set());

  const startExit = useCallback(
    (id: string) => {
      setExiting((prev) => new Set(prev).add(id));
      const t = setTimeout(() => {
        remove(id);
        setExiting((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, delayMs);
      return () => clearTimeout(t);
    },
    [remove, delayMs]
  );

  return { exiting, startExit };
}

type View = "inbox" | "starred";

export default function Inbox() {
  const [emails, setEmails] = useState<Email[]>(() => [...MOCK_EMAILS]);
  const [view, setView] = useState<View>("inbox");

  const removeFromInbox = useCallback((id: string) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const { exiting, startExit } = useExitAnimation(removeFromInbox);

  const archive = (id: string) => startExit(id);
  const deleteEmail = (id: string) => startExit(id);

  const toggleStar = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e))
    );
  };

  const markRead = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, unread: false } : e))
    );
  };

  const visibleEmails =
    view === "starred"
      ? emails.filter((e) => e.starred)
      : emails;

  const cleared = INITIAL_COUNT - emails.length;
  const progressPercent = Math.round((cleared / INITIAL_COUNT) * 100);

  return (
    <div className="gmail-layout bg-background text-foreground">
      <aside className="gmail-sidebar gmail-sidebar-expanded">
        <Link to="/" className="gmail-all-projects">
          <Menu size={20} strokeWidth={1.5} className="shrink-0 text-foreground" aria-hidden />
          <span className="min-w-0 truncate">All projects</span>
          <ChevronDown size={18} strokeWidth={2} className="shrink-0 text-muted-foreground" aria-hidden />
        </Link>
        <button type="button" className="gmail-compose-btn" aria-label="Compose">
          <Plus size={20} strokeWidth={2} />
          Compose
        </button>
        <nav className="flex flex-col gap-0.5">
          <button
            type="button"
            onClick={() => setView("inbox")}
            className={`gmail-nav-item ${view === "inbox" ? "active" : ""}`}
          >
            <InboxIcon size={20} strokeWidth={1.5} />
            <span className="min-w-0 truncate">Inbox</span>
            {emails.length > 0 && (
              <span className="gmail-nav-count">{emails.length}</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setView("starred")}
            className={`gmail-nav-item ${view === "starred" ? "active" : ""}`}
          >
            <StarIcon size={20} strokeWidth={1.5} />
            <span className="min-w-0 truncate">Starred</span>
            {emails.filter((e) => e.starred).length > 0 && (
              <span className="gmail-nav-count">{emails.filter((e) => e.starred).length}</span>
            )}
          </button>
        </nav>
        <div className="mt-auto w-full border-t border-border px-3 py-3">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Inbox zero</span>
            <span>{cleared}/{INITIAL_COUNT}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="progress-bar-fill h-full rounded-full bg-primary"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </aside>

      <main className="gmail-main">
        <div className="gmail-search-wrap">
          <div className="gmail-search">
            <Search size={20} className="shrink-0 text-muted-foreground" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search mail"
              className="ml-3 flex-1 min-w-0 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              aria-label="Search mail"
            />
          </div>
        </div>

        <div className="gmail-tabs">
          <button type="button" className="gmail-tab active">
            Primary
          </button>
          <button type="button" className="gmail-tab">
            Social
          </button>
          <button type="button" className="gmail-tab">
            Promotions
          </button>
        </div>

        <div className="gmail-list">
          {visibleEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground">
                {view === "starred"
                  ? "No starred messages."
                  : "No mail here."}
              </p>
              {emails.length === 0 && (
                <p className="mt-1 text-sm font-medium text-foreground">
                  Inbox zero! Nice work.
                </p>
              )}
            </div>
          ) : (
            <ul>
              {visibleEmails.map((email) => (
                <li
                  key={email.id}
                  className={`gmail-row ${email.unread ? "from-unread" : ""} ${exiting.has(email.id) ? "exiting" : ""}`}
                  onDoubleClick={() => markRead(email.id)}
                >
                  <div className="gmail-row-checkbox" aria-hidden />
                  <button
                    type="button"
                    onClick={() => toggleStar(email.id)}
                    className={`gmail-row-star ${email.starred ? "starred" : ""}`}
                    aria-label={email.starred ? "Unstar" : "Star"}
                  >
                    <Star
                      size={18}
                      strokeWidth={1.5}
                      fill={email.starred ? "currentColor" : "none"}
                    />
                  </button>
                  <div className="gmail-row-content">
                    <span className={`gmail-row-from ${email.unread ? "unread" : ""}`}>
                      {email.from}
                    </span>
                    <span className="gmail-row-subject-snippet">
                      <span className="subject">{email.subject}</span>
                      <span className="mx-1"> — </span>
                      <span>{email.snippet}</span>
                    </span>
                    <span className="gmail-row-date">{email.date}</span>
                  </div>
                  <div className="gmail-row-actions">
                    <button
                      type="button"
                      onClick={() => archive(email.id)}
                      className="gmail-row-action-btn"
                      aria-label="Archive"
                    >
                      <Archive size={18} strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEmail(email.id)}
                      className="gmail-row-action-btn delete"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export const routes = [{ path: "/", Component: () => null }];
