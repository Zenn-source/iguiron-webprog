import { NavLink, Link } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "px-1 py-2 text-sm font-medium tracking-[0.01em] transition-colors duration-200",
    isActive
      ? "text-[#dae2fd] border-b-2 border-[#8ed5ff]"
      : "text-[#bdc8d1] border-b-2 border-transparent hover:text-[#dae2fd]",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 border-b border-[#3e484f] bg-[#0b1326]/95 backdrop-blur-sm z-50">
      <div className="flex w-full items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Logo size={32} className="text-[#8ed5ff]" />
          <span className="hidden sm:inline text-sm font-bold text-[#dae2fd] tracking-wide">IGUIRON</span>
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

        <Link
          to="/auth/signin"
          className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium tracking-[0.01em] rounded-lg bg-[#8ed5ff] text-[#00354a] transition-colors hover:bg-[#7bd0ff]">
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
