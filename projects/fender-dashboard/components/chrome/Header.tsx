import { Link } from "react-router-dom";
import { Bell, Search, ChevronDown } from "lucide-react";
import { KlaviyoLogomark } from "./KlaviyoLogo";

export function Header() {
  return (
    <header className="fender-header">
      <div className="fender-header__context">
        <Link
          to="/fender-dashboard"
          className="fender-header__logo"
          aria-label="Dashboard"
        >
          <KlaviyoLogomark />
        </Link>
      </div>
      <div className="fender-header__search">
        <span className="fender-header__search-placeholder">
          <Search size={18} strokeWidth={1.5} aria-hidden />
          <span>Search...</span>
        </span>
      </div>
      <div className="fender-header__actions">
        <Link to="/" className="fender-header__back">
          ← All projects
        </Link>
        <button
          type="button"
          className="fender-header__icon-btn"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="fender-header__user"
          aria-label="Account menu"
        >
          <span className="fender-header__avatar">JD</span>
          <ChevronDown size={16} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
