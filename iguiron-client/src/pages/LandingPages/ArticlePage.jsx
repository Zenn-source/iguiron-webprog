import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import ArticleService from "../../services/ArticleService.js";

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ArticleService.getArticleBySlug(slug)
      .then(setArticle)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y border-[#3e484f] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-[#87929a]">Loading…</p>
          </div>
        </section>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y border-[#3e484f] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-[30px] font-semibold leading-[1.3] text-[#dae2fd]">
              Article not found
            </h1>
            <Button to="/articles" variant="secondary" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-b border-[#3e484f] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/articles" variant="secondary">
              Back to Articles
            </Button>
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
            Article
          </p>
          <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#dae2fd] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-[#87929a]">
            {article.slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </p>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="mb-8 w-full rounded-2xl object-cover"
            />
          )}

          <div className="space-y-4">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-[1.6] text-[#bdc8d1] whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-[#3e484f] pt-6">
            <Button to="/articles" variant="secondary">
              Back to Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
