import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import {Article} from '@prisma/client'
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCalls";
import { ARTICLE_PER_PAGE } from "@/Utils/constants";

interface ArticlesPageProps {
  searchParams: {pageNumber: string}
}

const ArticlePage = async({searchParams}: ArticlesPageProps) => {
  
  // // delay 10s
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  
  const {pageNumber} = searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  const count = await getArticlesCount();

  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  return (
    <section className="container m-auto px-5 py-5">
      <SearchArticleInput />
      <div className="flex text-center justify-center flex-wrap gap-7">
        {articles.map(item => 
          <ArticleItem article={item} key={item.id} />
        )};
      </div>
      <Pagination pageNumber={parseInt(pageNumber)} route="/articles" pages={pages} />
    </section>
  )
}

export default ArticlePage