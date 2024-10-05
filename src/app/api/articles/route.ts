import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/Utils/data";
import { CreateArticleSchema } from "@/Utils/validationSchema";
import { CreateArticleDto } from "@/Utils/dtos";
import { Article } from "@prisma/client";
import prisma from "@/Utils/db"
import { ARTICLE_PER_PAGE } from "@/Utils/constants";
import { verifyToken } from "@/Utils/verifyToken";


/**
 * @method GET
 * @route ~/api/articles
 * @desc Get Articles by page number
 * @access public 
 */

export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1"
        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) -1),
            take: ARTICLE_PER_PAGE,
            orderBy: {createdAt: 'desc'}
        });
        return NextResponse.json(articles, {status: 200})
    } catch(error) {
        return NextResponse.json(
            {message: "internal server error"},
            {status: 500}
        )
    }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc create new Article
 * @access private (only admin can create article) 
 */

export async function POST(request:NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json(
                {message: 'only admin, access denied'},
                {status: 403}
            )
        }
        const body = await request.json() as CreateArticleDto;

        const validation = CreateArticleSchema.safeParse(body)

        if(!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400})
        }
        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description
            }
        })
        return NextResponse.json({message: 'created'}, {status:201})
    } catch (error) {
        return NextResponse.json(
            {message: "internal server error"},
            {status: 500}
        )
    }
}