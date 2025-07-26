import prisma from "@/lib/prisma"
import { ERROR_MESSAGE } from "@/util/constants"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        
        const {userId, blogId} = await request.json()

        if(userId && blogId) {
            const blogIdNumber = parseInt(blogId)
            if(typeof blogIdNumber === 'number') {
                const isAlreadyLiked = await prisma.like.findFirst({
                    where: {
                        AND: {
                            blogId: blogId,
                            userId: userId
                        }
                    }
                })

                if(isAlreadyLiked) {
                    return NextResponse.json({
                        success: false,
                        message: "Blog already liked."
                    }, {status:409})
                }

                const like = await prisma.like.create({
                    data: {
                        blogId: blogId,
                        userId: userId
                    }
                })

                return NextResponse.json({
                    success: true,
                    message: "Blog liked successfully."
                }, {status: 201})
            }
        }

        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.CLIENT
        }, {status: 400})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.SERVER
        }, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const userEmail = searchParams.get('userEmail')
        const blogId = searchParams.get('blogId')

        if(userEmail && blogId) {

            const user = await prisma.user.findFirst({
                where:{
                    email: userEmail
                }
            })

            const blogIdInt = parseInt(blogId)
            if(user && user.id && (typeof blogIdInt === "number")) {

                const liked = await prisma.like.findFirst({
                    where: {
                        AND: {
                            userId: user.id,
                            blogId: blogIdInt
                        }
                    }
                })

                return NextResponse.json({
                    success: true,
                    message: "Like fecthed successfully.",
                    data: liked
                }, {status: 200})
            }

        }

        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.CLIENT
        }, {status: 400})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.SERVER
        }, {status: 500})
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const userEmail = searchParams.get('userEmail')
        const blogId = searchParams.get('blogId')

        if(userEmail && blogId) {

            const user = await prisma.user.findFirst({
                where:{
                    email: userEmail
                }
            })

            const blogIdInt = parseInt(blogId)
            if(user && user.id && (typeof blogIdInt === "number")) {

                const liked = await prisma.like.deleteMany({
                    where: {
                        AND: {
                            userId: user.id,
                            blogId: blogIdInt
                        }
                    }
                })

                return NextResponse.json({
                    success: true,
                    message: "Like fecthed successfully.",
                    data: liked
                }, {status: 200})
            }

        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: ERROR_MESSAGE.SERVER
        }, {status: 500})
    }
}