export default function Logo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>

      <path d="M20 4L28 16H20V28L12 16H20Z" fill="currentColor" opacity="0.9" />

      <path d="M14 12L20 8L26 12L22 18H18Z" fill="currentColor" opacity="0.6" />
      
      <line
        x1="20"
        y1="4"
        x2="20"
        y2="28"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />

      <circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="28" cy="16" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
