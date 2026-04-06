const Footer = () => {
  return (
    <footer className="border-t-2 border-[#C5C5E8] bg-white/40 backdrop-blur-sm">
      <div className="flex w-full items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-900">
          Iguiron
        </span>
        <p className="text-[11px] text-stone-500">
          &copy; {new Date().getFullYear()} Iguiron. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
