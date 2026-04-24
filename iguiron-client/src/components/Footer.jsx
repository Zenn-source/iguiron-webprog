const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "Status", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t border-[#3e484f] bg-[#0b1326]">
      <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <span className="text-sm font-bold text-[#dae2fd]">Iguiron</span>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#87929a] transition-colors hover:text-[#dae2fd]">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-[#87929a]">
          &copy; {new Date().getFullYear()} Iguiron. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
