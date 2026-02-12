import "./tailwind.css";
import "./index.scss";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "./components/button";
import { Input } from "./components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/card";

export const title = "PR Link Launcher";
export const description =
  "Enter a PR number to open your PR and test links in dev environments.";

function getPrUrls(prNumber: string): string[] {
  const num = prNumber.trim().replace(/^#/, "");
  if (!num) return [];
  return [
    `https://www.klaviyo.com/dashboard?assetSource=pr-${num}`,
    `http://style-guide.klaviyo-dev.com/PR/${num}`,
    `https://github.com/klaviyo/fender/pull/${num}`,
  ];
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function OpenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

function PrLinkLauncher() {
  const [prInput, setPrInput] = useState("5332");
  const urls = useMemo(() => getPrUrls(prInput), [prInput]);
  const hasUrls = urls.length > 0;

  const handleCopy = async () => {
    if (!hasUrls) return;
    try {
      await navigator.clipboard.writeText(urls.join("\n"));
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = urls.join("\n");
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };

  const handleOpen = () => {
    urls.forEach((url) => window.open(url, "_blank", "noopener,noreferrer"));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-xl space-y-6">
        <nav className="flex items-center border-b border-border pb-4">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← All projects
          </Link>
        </nav>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">PR Link Launcher</CardTitle>
            <CardDescription>
              Enter a PR number to open your PR and test links.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 5332"
              value={prInput}
              onChange={(e) => setPrInput(e.target.value)}
              aria-label="PR number"
            />
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={handleCopy}
                disabled={!hasUrls}
                type="button"
              >
                <CopyIcon />
                Copy
              </Button>
              <Button
                onClick={handleOpen}
                disabled={!hasUrls}
                type="button"
              >
                <OpenIcon />
                Open
              </Button>
            </div>
            {hasUrls && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Will open:
                </p>
                <ul className="space-y-1.5 text-sm">
                  {urls.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-2 hover:opacity-80"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PrLinkLauncher;
export const routes = [{ path: "/", Component: () => null }];
