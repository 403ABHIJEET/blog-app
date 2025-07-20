import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {
    try {
        const { blogId } = await params
        const { userId } = await request.json()

        await prisma.like.create({
            data: {
                blogId: parseInt(blogId),
                userId: userId
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Liked successfully.'
        }, {status: 209})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, {status: 500})
    }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {

    try {
        const { blogId } = await params
        const searchParams = request.nextUrl.searchParams
        const userId = searchParams.get('userId')

        await prisma.like.findMany({
            where: {
                blogId: parseInt(blogId),
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Liked successfully.'
        }, {status: 209})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, {status: 500})
    }
}