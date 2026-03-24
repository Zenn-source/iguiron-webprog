import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition-all duration-200",
    isActive
      ? "text-zinc-900 border-b-2 border-zinc-900"
      : "text-zinc-600 border-b-2 border-transparent hover:text-zinc-900 hover:border-zinc-300",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 border-b-2 border-zinc-200 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="flex w-full items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={32} className="text-zinc-900" />
          <span className="hidden sm:inline text-sm font-bold text-zinc-900">IGUIRON</span>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
