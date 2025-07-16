import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET({params}: {params: {id: string}}) {
    try {
        const { id } = params

        if(!id) {
            return NextResponse.json({
                success: false,
                message: "Invalid id."
            }, {status: 400})
        }

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User doesn't exist."
            }, {status: 404})
        }

        return NextResponse.json({
            success: true,
            message: "User data fetched successfully.",
        }, {status: 204})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong."
        }, {status: 500})
    }
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    try {
        const { username } = await request.json()
        const { id } = params

        if(!id) {
            return NextResponse.json({
                success: false,
                message: "Invalid id."
            }, {status: 400})
        }

        if(!username) {
            return NextResponse.json({
                success: false,
                message: "Username not found."
            }, {status: 400})
        }

        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username
            }
        })

        return NextResponse.json({
            success: true,
            message: "Username updated successfully.",
            data: user
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong."
        }, {status: 500})
    }
}

export async function DELETE({params}: {params: {id: string}}) {
    try {
        const { id } = params

        if(!id) {
            return NextResponse.json({
                success: false,
                message: "Invalid id."
            }, {status: 400})
        }

        const user = await prisma.user.delete({
            where: {
                id: id
            },
        })

        return NextResponse.json({
            success: true,
            message: "User deleted successfully.",
            data: user
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong."
        }, {status: 500})
    }
}