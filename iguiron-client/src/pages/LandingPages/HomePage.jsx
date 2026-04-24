import Button from "../../components/Button";

const services = [
  {
    title: "Frontend Development",
    description:
      "Crafting interactive, performant web applications with an emphasis on speed, accessibility, and flawless execution.",
    image: "/frontend.jpg",
  },
  {
    title: "UI/UX Design",
    description:
      "Designing beautiful, intuitive interfaces that align complex user journeys with elegant visual systems.",
    image: "/uiux.jpg",
  },
  {
    title: "Full-Stack Solutions",
    description:
      "Delivering end-to-end development, ensuring secure, scalable architectures from database infrastructure to user delivery.",
    image: "/solution.jpg",
  },
];

const highlights = [
  { number: "5+", label: "Projects Shipped" },
  { number: "1M+", label: "Happy Clients" },
  { number: "3", label: "Years Experience" },
  { number: "67+", label: "Features Delivered" },
];

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
              Welcome
            </p>
            <h1 className="max-w-xl text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#dae2fd] sm:text-5xl">
              Building Digital Experiences That Matter
            </h1>
            <p className="mt-4 max-w-lg text-base leading-[1.6] text-[#bdc8d1]">
              We create innovative web solutions that blend stunning design with
              powerful functionality. From concept to launch, we're your
              partners in digital transformation.
            </p>
            <div className="mt-6">
              <Button to="/about" variant="primary">
                Learn More
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[8%] bg-[#171f33] p-4">
            <div className="relative min-h-65 overflow-hidden rounded-lg bg-[#0b1326]">
              <img
                src="/example.jpeg"
                alt="Project Screenshot"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="border-y border-[#3e484f] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
            By The Numbers
          </p>
          <h2 className="mt-2 text-[30px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#dae2fd]">
            Our Track Record
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/[8%] bg-[#171f33] p-5">
              <p className="text-2xl font-bold text-[#dae2fd]">
                {highlight.number}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.05em] text-[#87929a]">
                {highlight.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8">
          <h2 className="text-[30px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#dae2fd]">
            What We Do Best
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-[1.6] text-[#bdc8d1]">
            We engineer high-performance digital solutions, blending structural
            integrity with refined aesthetic precision to drive enterprise
            growth.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service, idx) => (
            <article
              key={idx}
              className="overflow-hidden rounded-2xl border border-white/[8%] bg-[#171f33]">
              <img
                src={service.image}
                alt={service.title}
                className="aspect-video w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-[24px] font-semibold leading-[1.4] text-[#dae2fd]">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.5] text-[#bdc8d1]">
                  {service.description}
                </p>
                <Button className="mt-4" variant="link">
                  Learn More →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
