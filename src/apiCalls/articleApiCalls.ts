import { DOMAIN } from "@/Utils/constants";
import { SingleArticle } from "@/Utils/types";
import { Article } from "@prisma/client";


//Get articles based on page number
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const response = await fetch(
      `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    { cache: 'no-cache'}
  );
  
    if(!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    return response.json();
  
  }
  
  //Get articles count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(
    `${DOMAIN}/api/articles/count`,
     { cache: 'no-cache'}
  );

  if(!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const {count} = await response.json() as {count : number};
  return count
}

//Get articles based on searchText
export async function getArticlesBasedOnSearch(searchText: string): Promise<Article[]> {
  const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);

  if(!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  return response.json();

}

//Get single article by id
export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    cache: 'no-store'
  });
  if(!response.ok){
      throw new Error('Failed to fetch Article')
  }
return response.json()  
}