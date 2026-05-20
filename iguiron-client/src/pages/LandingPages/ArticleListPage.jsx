import { useState, useEffect } from "react";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import ArticleService from "../../services/ArticleService.js";

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    ArticleService.getArticles()
      .then(setArticles)
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
          Articles
        </p>
        <h1 className="max-w-xl text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#dae2fd] sm:text-5xl">
          Thoughts on Frontend Development & UI/UX Design
        </h1>
        <p className="mt-4 max-w-lg text-base leading-[1.6] text-[#bdc8d1]">
          Practical insights on building performant interfaces, accessible
          experiences, and designs that feel as good as they look.
        </p>
        <div className="mt-6">
          <Button to="/" variant="secondary">
            Back Home
          </Button>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
            Featured Articles
          </p>
          <h2 className="mt-2 text-[30px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#dae2fd]">
            Latest Reads
          </h2>
        </div>

        {loading && (
          <p className="text-sm text-[#87929a]">Loading articles…</p>
        )}
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        {!loading && !error && articles.length === 0 && (
          <p className="text-sm text-[#87929a]">No articles available.</p>
        )}
        {!loading && !error && articles.length > 0 && (
          <ArticleList articles={articles} />
        )}
      </section>
    </div>
  );
};

export default ArticleListPage;
