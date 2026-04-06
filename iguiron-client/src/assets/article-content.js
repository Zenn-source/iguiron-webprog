const articles = [
  {
    name: "css-grid-and-flexbox",
    title: "Mastering CSS Grid and Flexbox",
    image: "/flex.png",
    content: [
      "CSS Grid and Flexbox are the two layout systems that define modern web design — understanding when to use each one is one of the most valuable skills a frontend developer can have.",
      "Flexbox is a one-dimensional layout system. It distributes space along a single axis — either a row or a column. It excels at aligning items, distributing space between them, and handling dynamic content where the exact size of elements is unknown. Navigation bars, button groups, and card headers are natural fits.",
      "Grid is two-dimensional. It lets you place items across both rows and columns simultaneously, which makes it ideal for page-level layouts, image galleries, and any design where alignment across both axes matters:\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 1.5rem;\n}",
      "A common mistake is reaching for Grid for everything. If you only need to align items in one direction, Flexbox is simpler and more readable. Reserve Grid for cases where two-dimensional placement is genuinely needed.",
      "The gap property works in both systems and replaces the old margin hacks. Combined with auto-fill and minmax, Grid's intrinsic sizing makes truly responsive layouts possible with zero media queries.",
      "Modern CSS also introduces Subgrid, which lets a grid child participate in the parent grid's tracks. This solves the classic card-footer-alignment problem — where you want the button at the bottom of every card to line up regardless of content height.",
    ],
  },
  {
    name: "core-web-vitals-and-performance",
    title: "Core Web Vitals and Frontend Performance",
    image: "/front.png",
    content: [
      "Core Web Vitals are Google's user-centered metrics for measuring real-world performance — and they directly affect both user experience and search ranking.",
      "The three key metrics are Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). LCP measures how quickly the main content loads. INP measures responsiveness to user input. CLS measures visual stability — how much the layout jumps around as the page loads.",
      "The most impactful LCP fix is almost always image optimization. Use modern formats like WebP or AVIF, set explicit width and height attributes to reserve space, and add loading='eager' with fetchpriority='high' on the hero image to make sure the browser prioritizes it:\n<img\n  src='/hero.webp'\n  alt='Hero image'\n  width='1200'\n  height='600'\n  fetchpriority='high'\n/>",
      "For CLS, the most common culprit is images and embeds without reserved dimensions. When the browser loads an image and doesn't know its size, the surrounding content shifts to make room. Setting explicit width and height in the HTML (not just CSS) tells the browser to reserve the space before the image loads.",
      "JavaScript is the biggest threat to INP. Long tasks on the main thread block the browser from responding to user input. Break up long tasks with scheduler.yield() or by deferring non-critical work with requestIdleCallback. Lazy-load components and routes so the initial bundle stays small.",
      "Use Lighthouse in Chrome DevTools for local audits, and PageSpeed Insights for field data from real users. The difference between lab and field performance is often significant — real users on slow networks and low-end devices experience your site very differently than a developer on a MacBook.",
    ],
  },
  {
    name: "building-accessible-interfaces",
    title: "Building Accessible Web Interfaces",
    image: "/webint.png",
    content: [
      "Accessibility is not a feature to add at the end — it is a quality attribute of the work itself. An interface that excludes users with disabilities is simply an incomplete interface.",
      "Semantic HTML is the foundation. Using the right element for the right purpose — button for actions, a for navigation, h1–h6 for heading hierarchy, nav for navigation regions — gives screen readers the structure they need to understand your page without extra ARIA attributes.",
      "ARIA (Accessible Rich Internet Applications) fills the gaps where HTML semantics fall short, particularly for custom interactive components:\n<div\n  role='combobox'\n  aria-expanded={isOpen}\n  aria-haspopup='listbox'\n  aria-controls='options-list'\n>\n  {selectedOption}\n</div>",
      "Keyboard navigation is non-negotiable. Every interactive element must be reachable and operable via keyboard. Custom components like modals need focus trapping — when a modal opens, focus must be moved into it and prevented from leaving until it is closed. The focus-trap-react library handles this reliably.",
      "Color contrast is the most commonly failed WCAG criterion. Normal text requires a 4.5:1 contrast ratio against its background. Large text (18pt or 14pt bold) requires 3:1. Use tools like the WebAIM Contrast Checker or the built-in contrast checker in browser DevTools to verify every text/background combination.",
      "Test with a screen reader, not just automated tools. Axe and Lighthouse catch roughly 30–40% of accessibility issues. The rest require manual testing. VoiceOver on macOS and NVDA on Windows are the most common screen readers. Navigating your own interface with a screen reader will reveal problems no automated scan will catch.",
    ],
  },
  {
    name: "visual-hierarchy-and-typography",
    title: "Visual Hierarchy and Typography in UI Design",
    image: "/visual.jpg",
    content: [
      "Visual hierarchy is the arrangement of elements to guide a user's eye through the interface in the order that serves them best — it is the invisible structure beneath every great design.",
      "Size is the most powerful hierarchy tool. Larger elements attract attention first. A clear progression from display text to headings to body copy to captions gives readers a mental model of the page before they read a single word. Avoid using more than 3–4 distinct sizes on a single screen.",
      "Weight, color, and spacing reinforce hierarchy without changing size. A semibold label at 11px in muted gray is clearly secondary to a bold heading at 32px, even though the size difference alone does not communicate importance. Combining multiple cues — size, weight, color, spacing — creates hierarchy that feels natural rather than forced.",
      "Type scale is the set of sizes you allow in a design. Rather than choosing arbitrary values, define a modular scale (a sequence of sizes derived from a ratio like 1.25 or 1.5) and stick to it. This ensures consistent rhythm across the interface and makes spacing decisions easier.",
      "Line length significantly affects reading comfort. Research consistently shows that 45–75 characters per line is optimal for body text. Too wide, and readers lose their place. Too narrow, and the eye makes too many jumps. In CSS, the ch unit makes this constraint easy to enforce: max-width: 65ch.",
      "White space — often called negative space — is not empty space; it is active design. Generous margins and padding signal quality and calm. Tight, dense layouts feel overwhelming. The first instinct of most beginners is to fill space. The discipline is learning to leave it empty.",
    ],
  },
  {
    name: "designing-for-mobile-first",
    title: "Designing for Mobile-First Experiences",
    image: "/mobile.png",
    content: [
      "Mobile-first is both a CSS strategy and a design philosophy: start with the most constrained context and scale up, rather than starting with a full desktop layout and stripping it down.",
      "On mobile, every design decision is forced — you cannot rely on hover states, you have a fraction of the screen real estate, and touch targets have strict minimum size requirements (44x44px per Apple's guidelines, 48x48dp per Google's). These constraints are clarifying: they force you to prioritize ruthlessly.",
      "In CSS, mobile-first means writing base styles for small screens and using min-width media queries to add complexity:\n.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}",
      "Navigation is the hardest mobile UX problem. The desktop pattern of a horizontal nav bar simply does not translate to a 375px screen. Common solutions are the hamburger menu (familiar but hides navigation behind an extra tap), a bottom tab bar (fast access, but limited to 4–5 items), and progressive disclosure (showing only the most critical links inline and tucking the rest).",
      "Touch gestures require deliberate design. Swipe, pinch, and long-press need to be discoverable and consistent. Never rely on gestures as the only way to perform an action — they must complement, not replace, tappable controls.",
      "Test on real devices, not just browser DevTools. Simulated touch in a browser does not reproduce the actual touch latency, font rendering, or viewport behavior of a real phone. Keep at least one low-end Android device in your testing setup — it will expose performance issues that never appear in DevTools.",
    ],
  },
];

export default articles;
