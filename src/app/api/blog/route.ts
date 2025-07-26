import prisma from "@/lib/prisma";
import { ERROR_MESSAGE } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { userId, title, content } = await request.json()

        if (userId && title && content) {
            const blog = await prisma.blog.create({
                data: {
                    userId,
                    title,
                    content,
                }
            })
            return NextResponse.json({
                success: true,
                message: "Blog saved successfully.",
                data: blog
            }, { status: 201 })
        }

        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.CLIENT
        }, {status: 400})

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
        const id = searchParams.get('id')

        if (id) {
            const blog = await prisma.blog.findFirst({
                where: {
                    id: parseInt(id)
                }
            })

            return NextResponse.json({
                success: true,
                message: "blog fetched successfully.",
                data: blog
            }, { status: 200 })
        } else {
            const blogs = await prisma.blog.findMany()

            return NextResponse.json({
                success: true,
                message: "blogs fetched successfully.",
                data: blogs
            }, { status: 200 })
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong."
        }, { status: 500 })
    }
}

