import prisma from "@/lib/prisma";
import { ERROR_MESSAGE } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId, blogId, parentId, content } = await request.json()

        const comment = await prisma.comment.create({
            data: { 
                userId, 
                blogId: parseInt(blogId), 
                parentId: parseInt(parentId), 
                content 
            }
        })

        return NextResponse.json({
            success: true,
            message: "Comment saved successfuly.",
            data: comment
        }, { status: 209 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong."
        }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const blogId = searchParams.get('blogId')
        const parentId = searchParams.get('parentId')

        if (blogId && parentId) {

            const blogIdInt = parseInt(blogId)
            const parentIdInt = parseInt(parentId)

            if ((typeof blogIdInt == 'number') && (typeof parentIdInt == 'number')) {
                
                const comments = await prisma.comment.findMany({
                    where: {
                        blogId: parseInt(blogId),
                        parentId: parseInt(parentId)
                    }
                })

                return NextResponse.json({
                    success: true,
                    message: "Comments fetched successfully.",
                    data: comments
                }, { status: 200 })
            }
        }

        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.CLIENT
        }, { status: 400 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.SERVER
        }, { status: 400 })
    }
}

