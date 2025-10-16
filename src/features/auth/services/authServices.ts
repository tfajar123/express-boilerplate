import { Role } from "@prisma/client";
import { prismaClient } from "../../../config/prisma"
import bcrypt from 'bcrypt'
import { generateToken } from "../../../utils/jwt";

interface RegisterPayload {
    name: string,
    email: string,
    password: string,
    role: string
}

export const registerUserService = async ({
    name, email, password, role
}: RegisterPayload ) => {
    const existing = await prismaClient.user.findFirst({
        where: {
            email
        },
    });
    if (existing) {
        throw Object.assign(new Error('Email already exists'), {
            statusCode: 409
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prismaClient.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role as Role
        }
    })

    return { user }
}

export const loginUserService = async (
    userIndetity: string,
    password: string
) => {
    const user = await prismaClient.user.findFirst({
        where: {
            email: userIndetity
        }
    })

    if(!user) {
        throw Object.assign(new Error('User not found'), {
            statusCode: 404
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw Object.assign(new Error('Invalid password'), {
            statusCode: 401
        })
    }

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    
    return { 
        token
    }
}

