import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ blogId: string }> }) {

    try {
        const { blogId } = await params
        
        const likes = await prisma.like.count({
            where: {
                blogId: parseInt(blogId)
            }
        })

        return NextResponse.json({
            success: true,
            message: "Liked fetched successfully.",
            data: likes
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, {status: 500})
    }
}