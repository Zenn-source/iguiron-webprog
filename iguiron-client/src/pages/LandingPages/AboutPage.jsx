import Button from "../../components/Button";

const experienceItems = [
  {
    title: "Senior Full-Stack Developer",
    description:
      "Lead development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and architected microservices solutions.",
  },
  {
    title: "UI/UX Design Specialist",
    description:
      "Designed and prototyped user interfaces for 50+ projects. Conducted user research, created design systems, and improved user engagement by 40%.",
  },
  {
    title: "Digital Product Strategy",
    description:
      "Collaborated with startups and enterprises to define product vision and roadmaps. Launched 15+ successful digital products with combined user base of 500K+.",
  },
];

const metrics = [
  { number: "3", label: "Years In Tech" },
  { number: "5+", label: "Projects Completed" },
  { number: "3+", label: "Design Awards" },
  { number: "500K", label: "Users Impacted" },
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-2xl border border-white/[8%] bg-[#171f33] p-4">
            <img
              src="/example.jpeg"
              alt="Profile Photo"
              className="min-h-72 w-full rounded-lg object-cover"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
              About
            </p>
            <h1 className="max-w-xl text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#dae2fd] sm:text-5xl">
              Mackenzie Iguiron, Full-Stack Designer & Developer
            </h1>
            <p className="mt-4 max-w-lg text-base leading-[1.6] text-[#bdc8d1]">
              Passionate about creating beautiful, functional digital products
              that solve real problems. With 3 years of experience spanning
              design and development, I bridge the gap between concept and
              execution. Always learning, always building.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/articles" variant="secondary">
                View Articles
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="border-y border-[#3e484f] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
            Impact
          </p>
          <h2 className="mt-2 text-[30px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#dae2fd]">
            Career Highlights
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/[8%] bg-[#171f33] p-5">
              <p className="text-2xl font-bold text-[#dae2fd]">
                {metric.number}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.05em] text-[#87929a]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Background Section */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
              Career
            </p>
            <h2 className="mt-2 text-[30px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#dae2fd]">
              Professional Journey
            </h2>

            <div className="mt-6 space-y-4">
              {experienceItems.map((item, idx) => (
                <article
                  key={idx}
                  className="rounded-2xl border border-white/[8%] bg-[#171f33] p-5">
                  <h3 className="text-[24px] font-semibold leading-[1.4] text-[#dae2fd]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.5] text-[#bdc8d1]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Portfolio/Gallery Section */}
          <div className="rounded-2xl border border-white/[8%] bg-[#171f33] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
              Portfolio
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                "/frontend.jpg",
                "/uiux.jpg",
                "/solution.jpg",
                "/example.jpeg",
              ].map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Project ${idx + 1}`}
                  className="aspect-square w-full rounded-lg object-cover"
                />
              ))}
            </div>
            <Button className="mt-5" variant="secondary">
              View Full Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
