import Button from "../components/Button";

const services = [
  {
    title: "Frontend Development",
    description:
      "Building interactive, performant web applications with modern frameworks like React, Vue, and Next.js. Custom solutions tailored to your vision.",
    image: "/frontend.jpg",
  },
  {
    title: "UI/UX Design",
    description:
      "Crafting beautiful, intuitive interfaces that users love. From wireframes to pixel-perfect designs, we create experiences that convert.",
    image: "/uiux.jpg",
  },
  {
    title: "Full-Stack Solutions",
    description:
      "End-to-end development from concept to deployment. Scalable architectures, robust backends, and seamless integrations.",
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
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Welcome
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              Building Digital Experiences That Matter
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
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

          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="relative min-h-65 overflow-hidden rounded-[1.25rem] bg-zinc-200">
              <img
                src="/example.jpeg"
                alt="Project Screenshot"
                className="h-full w-full object-cover"
              />
              {/* <div className="absolute bottom-4 left-4 rounded-lg bg-white/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                Featured Project
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            By The Numbers
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Our Track Record
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
              <p className="text-2xl font-bold text-zinc-900">
                {highlight.number}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {highlight.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services/Features Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Expertise
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            What We Do Best
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service, idx) => (
            <article
              key={idx}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
              <img
                src={service.image}
                alt={service.title}
                className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
              />
              <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {service.description}
              </p>
              <Button className="mt-4" variant="primary">
                Learn More
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
