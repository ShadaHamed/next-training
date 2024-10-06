import ArticleItem from "@/components/articles/ArticleItem";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import {Article} from '@/Utils/types'
import { cache } from "react";

const ArticlePage = async() => {

  // // delay 10s
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    'https://jsonplaceholder.org/posts'
  );

  if(!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  const articles: Article[] = await response.json();

  return (
    <section className="container m-auto px-5 py-5">
      <SearchArticleInput />
      <div className="flex text-center justify-center flex-wrap gap-7">
        {articles.slice(0,6).map(article => 
          <ArticleItem article={article} key={article.id} />
        )}
      </div>
      <Pagination />
    </section>
  )
}

export default ArticlePage