import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";

/**
 * @method GET
 * @route ~/api/articles/count
 * @desc Get Article count
 * @access public 
 */

export async function GET(request:NextRequest) {
    try {
        const count = await prisma.article.count();
        return NextResponse.json({count}, {status: 200})
    } catch (error) {
        return NextResponse.json(
            { message: "internal server error" },
            { status: 500 })
    }
}