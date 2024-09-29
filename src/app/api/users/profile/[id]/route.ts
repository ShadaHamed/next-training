import { NextRequest, NextResponse } from "next/server";
import prisma from '@/Utils/db'
import { parse } from "path";
import jwt from 'jsonwebtoken'
import { JWTPayload } from "@/Utils/types";
import { verifyToken } from "@/Utils/verifyToken";

interface Props {
    params: {id: string}
}

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete profile
 * @access private 
 */

export async function DELETE(request: NextRequest, {params} : Props) { 
    try {
        const user = await prisma.user.findUnique({where: {id:parseInt(params.id)}});
        if(!user) {
            return NextResponse.json(
                {message: 'user not found'},
                {status: 404}
            )
        }
        //get token from header
        // const authToken =  request.headers.get('authToken') as string;
        
        const userFromToken = verifyToken(request)
        
            if(userFromToken !== null && userFromToken.id === user.id) {
                await prisma.user.delete({where: {id: parseInt(params.id)}});
                return NextResponse.json(
                    {message: 'your profile (account) has been deleted'},
                    {status: 200}
                )
            }

            return NextResponse.json(
                {message:'only user himself can delete his profile, forbidden'},
                {status:403} //forbidden
            )
        

    } catch(error) {
        return NextResponse.json(
            {message: 'internal server error'},
            {status: 500}
        )
    }
}