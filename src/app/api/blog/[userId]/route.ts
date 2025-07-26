import prisma from "@/lib/prisma"
import { ERROR_MESSAGE } from "@/util/constants"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {

        const { userId } = await params

        if(!userId) {
            return NextResponse.json({
                success: false,
                message: ERROR_MESSAGE.CLIENT
            }, {status: 400})
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User doesn't exist"
            }, {status: 404})
        }

        const blogs = await prisma.blog.findMany({
            where: {
                userId: userId
            }
        }) 

        return NextResponse.json({
            success: true,
            message: "blogs fetched successfully.",
            data: blogs
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.SERVER
        }, {status: 500})
    }
}