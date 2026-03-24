import Button from "../components/Button";

const articles = [
  {
    id: 1,
    title: "The Rise of Modern Web Design",
    description:
      "Exploring the latest trends in web design: minimalism, dark mode, micro-interactions, and how they're reshaping user experiences across the digital landscape.",
    category: "Design",
    date: "March 2024",
    image: "/uiux.jpg",
  },
  {
    id: 2,
    title: "React Performance: Best Practices",
    description:
      "Dive deep into optimizing React applications. Learn about memoization, code splitting, lazy loading, and real-world strategies to boost your app's performance.",
    category: "Development",
    date: "March 2024",
    image: "/frontend.jpg",
  },
  {
    id: 3,
    title: "UX Principles That Actually Work",
    description:
      "Timeless UX principles backed by psychology and research. Discover how to design interfaces that feel intuitive and keep users engaged longer.",
    category: "Design",
    date: "February 2024",
    image: "/uiux.jpg",
  },
  {
    id: 4,
    title: "Building Scalable Web Architecture",
    description:
      "Learn the fundamentals of scalable system design. From microservices to API design, this guide covers essential concepts for modern web development.",
    category: "Development",
    date: "February 2024",
    image: "/solution.jpg",
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Blog
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Insights on Design & Development
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Thoughts on web design trends, development practices, and digital
          innovation. Straight from the field, filtered through years of
          experience.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      {/* Article Grid Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Stories
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Featured Articles
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
              <img
                src={article.image}
                alt={article.title}
                className="aspect-4/3 w-full rounded-[1.25rem] object-cover"
              />

              <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
                <p className="font-semibold uppercase tracking-[0.24em]">
                  {article.category}
                </p>
                <p>{article.date}</p>
              </div>

              <h3 className="mt-2 text-lg font-semibold text-zinc-900">
                {article.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {article.description}
              </p>

              <Button className="mt-4">Read More</Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
