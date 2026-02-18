import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  PaperAirplaneIcon,
  FlowsIcon,
  PageIcon,
  PeopleIcon,
  NewspaperIcon,
  BarChartIcon,
  MessageIcon,
} from "../icons/NavIcons";

const SIDEBAR_WIDTH = 228;

const NAV_ITEMS: Array<{
  id: string;
  name: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
  children?: Array<{ id: string; name: string; url: string }>;
}> = [
  { id: "home", name: "Home", url: "/fender-dashboard", Icon: HomeIcon },
  { id: "campaigns", name: "Campaigns", url: "#campaigns", Icon: PaperAirplaneIcon },
  { id: "flows", name: "Flows", url: "#flows", Icon: FlowsIcon },
  { id: "forms", name: "Sign-up forms", url: "#forms", Icon: PageIcon },
  {
    id: "audience",
    name: "Audience",
    url: "#audience",
    Icon: PeopleIcon,
    children: [
      { id: "groups", name: "Lists & segments", url: "#lists" },
      { id: "customers", name: "Profiles", url: "#people" },
    ],
  },
  {
    id: "content",
    name: "Content",
    url: "#content",
    Icon: NewspaperIcon,
    children: [
      { id: "templates", name: "Templates", url: "#templates" },
      { id: "catalogs", name: "Products", url: "#catalogs" },
      { id: "assets", name: "Media & brand", url: "#assets" },
      { id: "coupons", name: "Coupons", url: "#coupons" },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    url: "#analytics",
    Icon: BarChartIcon,
    children: [
      { id: "dashboards", name: "Dashboards", url: "#dashboards" },
      { id: "metrics", name: "Metrics", url: "#metrics" },
      { id: "benchmarks", name: "Benchmarks", url: "#benchmarks" },
      { id: "reports", name: "Custom reports", url: "#reports" },
    ],
  },
  { id: "atlas", name: "Conversations", url: "#inbox", Icon: MessageIcon },
];

function isActive(pathname: string, url: string): boolean {
  if (url.startsWith("#")) return false;
  return pathname === url || pathname.startsWith(`${url}/`);
}

export function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="fender-sidebar" style={{ width: SIDEBAR_WIDTH }}>
      <nav className="fender-sidebar__nav" aria-label="Main">
        <ul className="fender-sidebar__list">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.url);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li key={item.id} className="fender-sidebar__item">
                {hasChildren ? (
                  <div className="fender-sidebar__group">
                    <a
                      href={item.url}
                      className={`fender-sidebar__link ${active ? "fender-sidebar__link--active" : ""}`}
                    >
                      <span className="fender-sidebar__link-inner">
                        <item.Icon className="fender-sidebar__icon" />
                        <span>{item.name}</span>
                      </span>
                    </a>
                    <ul className="fender-sidebar__sublist">
                      {item.children!.map((child) => (
                        <li key={child.id}>
                          <a href={child.url} className="fender-sidebar__sublink">
                            {child.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : item.url.startsWith("#") ? (
                  <a
                    href={item.url}
                    className={`fender-sidebar__link ${active ? "fender-sidebar__link--active" : ""}`}
                  >
                    <span className="fender-sidebar__link-inner">
                      <item.Icon className="fender-sidebar__icon" />
                      <span>{item.name}</span>
                    </span>
                  </a>
                ) : (
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive: linkActive }) =>
                      `fender-sidebar__link ${linkActive ? "fender-sidebar__link--active" : ""}`
                    }
                  >
                    <span className="fender-sidebar__link-inner">
                      <item.Icon className="fender-sidebar__icon" />
                      <span>{item.name}</span>
                    </span>
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
