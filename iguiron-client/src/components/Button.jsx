import { Link } from "react-router-dom";

const variantClasses = {
  primary:
    "bg-[#8ed5ff] text-[#00354a] border-[#8ed5ff] hover:bg-[#7bd0ff] hover:border-[#7bd0ff]",
  secondary:
    "bg-transparent text-[#dae2fd] border-white/15 hover:bg-white/5",
  link: "text-[#8ed5ff] border-transparent bg-transparent hover:underline underline-offset-2 px-0 py-0",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium tracking-[0.01em] transition",
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
