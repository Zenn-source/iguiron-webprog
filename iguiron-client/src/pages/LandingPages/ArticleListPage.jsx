import Button from "../../components/Button";
import ArticleList from "../../components/ArticleList";
import articles from "../../assets/article-content.js";

const ArticleListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-[#ADADD8] bg-white/30 backdrop-blur-sm px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8888C0]">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-stone-900 sm:text-4xl">
          Thoughts on Frontend Development & UI/UX Design
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-stone-600 sm:text-base">
          Practical insights on building performant interfaces, accessible
          experiences, and designs that feel as good as they look.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

      <section className="border-y-2 border-[#ADADD8] bg-white/30 backdrop-blur-sm px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8888C0]">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">
            Latest Reads
          </h2>
        </div>

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticleListPage;
