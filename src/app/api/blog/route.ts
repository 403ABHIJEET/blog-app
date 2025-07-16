import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const {userId, title, content } = await request.json()
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
        }, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong."
        }, {status: 500})
    }
}

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany() 

        return NextResponse.json({
            success: true,
            message: "blogs fetched successfully.",
            data: blogs
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong."
        }, {status: 500})
    }
}

