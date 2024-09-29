import { LoginUserDto } from "@/Utils/dtos";
import { loginSchema } from "@/Utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Utils/db";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { use } from "react";
import { setCookie } from "@/Utils/generateToken";

/**
 * @method POST
 * @route ~/api/users/login
 * @desc login User [(log in) (Sign in) ]
 * @access public 
 */

export async function POST(request:NextRequest) {
    try {
        const body  = await request.json() as LoginUserDto;
        
        const validation = loginSchema.safeParse(body)
        if(!validation.success) {
            return NextResponse.json({message: validation.error.errors[0].message}, {status: 400})
        }

        const user = await prisma.user.findUnique({where: {email: body.email}})

        if (!user) {
            return NextResponse.json(
                {message: 'invalid email or password'}, 
                {status: 400}
            )
        }

        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if(!isPasswordMatch) {
            return NextResponse.json(
                {message: 'invalid email or password'},
                {status: 400}
            );
        }
        
        // const token = generateJWT(jwtPayload);
        const cookie = setCookie({
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username
        });

        return NextResponse.json(
            {message: 'Authenticated'},
            {
                status: 200,
                headers: {'Set-Cookie': cookie}
            }
        )

    } catch (error) {
        return NextResponse.json(
            {message: 'internal server error'},
            {status: 500}
        )
    }
    
}