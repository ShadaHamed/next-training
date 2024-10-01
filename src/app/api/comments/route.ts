import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import { verifyToken } from "@/Utils/verifyToken";
import { CreateCommentDto } from "@/Utils/dtos";
import { createCommentSchema } from "@/Utils/validationSchema";

/**
 * @method POST
 * @route ~/api/comments
 * @desc create new comment
 * @access private 
 */

export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if(!user) {
            return NextResponse.json(
                {message: 'only logged in user, access denied'},
                {status: 401}
            )
        }

        const body = await request.json() as CreateCommentDto;

        const validation = createCommentSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status:200})
        }

        const newComment = await prisma.comment.create({
            data: { 
                text:body.text,
                articleId: body.articleId,
                userId: user.id
            }
        })
        return NextResponse.json(newComment, {status: 201})
    }  catch (error) {
        return NextResponse.json(
            {message: 'internal server error'},
            {status: 500}
        )
    }
}

/**
 * @method GET
 * @route ~/api/comments
 * @desc Get All comment
 * @access private (only admin)
 */

export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if(user === null || user.isAdmin === false) {
            return NextResponse.json(
                {message: 'only admin, access denied'},
                {status: 403}
            )
        }

        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments, {status:200})
        
    } catch (error) {
        return NextResponse.json(
            {message: 'internal server error'},
            {status: 500}
        )
    }
}