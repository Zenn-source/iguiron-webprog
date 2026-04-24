import { Link } from "react-router-dom";
import Button from "../components/Button";

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article
          key={article.name}
          className="overflow-hidden rounded-2xl border border-white/[8%] bg-[#171f33]">
          <img
            src={article.image}
            alt={article.title}
            className="aspect-4/3 w-full object-cover"
          />
          <div className="p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#8ed5ff]">
              Article {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-[24px] font-semibold leading-[1.4] text-[#dae2fd]">
              {article.title}
            </h3>
            <p className="mt-2 text-sm leading-[1.5] text-[#bdc8d1]">
              {article.content[0].substring(0, 150)}...
            </p>
            <Link to={`/articles/${article.name}`}>
              <Button className="mt-4" variant="link">
                Read More →
              </Button>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
