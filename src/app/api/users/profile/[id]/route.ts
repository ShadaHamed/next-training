import { NextRequest, NextResponse } from "next/server";
import prisma from '@/Utils/db'
import { parse } from "path";
import jwt from 'jsonwebtoken'
import { JWTPayload } from "@/Utils/types";
import { verifyToken } from "@/Utils/verifyToken";
import { UpdadteUserDto } from "@/Utils/dtos";
import bcrypt from 'bcryptjs'
import { comment } from "postcss";
import { updateUserSchema } from "@/Utils/validationSchema";

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
        const user = await prisma.user.findUnique({
            where: {id:parseInt(params.id)},
            include: {comments: true}
        });
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
                //deleting the user
                await prisma.user.delete({where: {id: parseInt(params.id)}});
                
                //deleting the comments that belong to this user
                const commentsIds = user?.comments.map(comment => comment.id);
                await prisma.comment.deleteMany({
                    where:{
                        id: {in: commentsIds}
                    }
                })
                
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

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc Get profile by id
 * @access private 
 */

export async function GET(request:NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(params.id)},
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                isAdmin: true,
            }
        });

        if(!user) {
            return NextResponse.json({message: 'user not found'}, {status:404})
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json(
                {message: 'you are not allowed, access denied'},
                {status: 403}
            )
        }
        
        return NextResponse.json(user, {status: 200})

    } catch(error) {
        return NextResponse.json(
            {message: 'internal server error'},
            {status: 500}
        )
    }
}

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update profile
 * @access private 
 */

export async function PUT(request: NextRequest, {params}: Props) {
    try {
        const user = await prisma.user.findUnique({ where: {id: parseInt(params.id)}});
        if(!user) {
            return NextResponse.json({message: 'user not found'}, {status: 404})
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json(
                {message: 'you are not allowed, access denied'},
                {status: 403}
            )
        }

        const body = await request.json() as UpdadteUserDto;
        const validation = updateUserSchema.safeParse(body);
        if(!validation.success) {
            return NextResponse.json(
                {message: validation.error.errors[0].message},
                {status: 400}
            )
        }
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt)
        }

        const updateUser = await prisma.user.update({
            where: {id: parseInt(params.id)},
            data: {
                username: body.username,
                email: body.email,
                password:body.password
            }
        })
        // take all user info except password
        const {password, ...other} = updateUser;
        return NextResponse.json({...other}, {status: 200})

        } catch(error) {
        return NextResponse.json(
            {message: 'internal server error'},
            {status: 500}
        )
    }
}