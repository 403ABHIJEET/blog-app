import dbConnect from "@/lib/db";
import UserModel from "@/models/user";
import { RESPONSE } from "@/util/constants";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()

    try {
        const { fname, lname, email, profile } = await request.json()
        const username = email.split('@')[0]

        const user = new UserModel({
            username: username,
            fname: fname,
            lname: lname,
            email: email,
            profile: profile
        })

        await user.save()

        return NextResponse.json({
            success: true,
            message: RESPONSE.USER.SAVED
        }, {status: 201})
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: RESPONSE.SERVER_ERROR,
            error: error
        }, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        const username = queryParam.username

        if(username) {
            const user = await UserModel.findOne({username})

            return NextResponse.json({
                success: true,
                message: RESPONSE.USER.FETCHED,
                data: user
            }, {status: 200})
        }

        return NextResponse.json({
            success: false,
            message: RESPONSE.USER.NOTFOUND
        }, {status: 404})
    } catch (error) {
        console.log(error)

        return NextResponse.json({
            success: false,
            message: RESPONSE.SERVER_ERROR,
            error: error
        }, {status: 500})
    }
}

// export async function DELETE(request: NextRequest) {
//     await dbConnect()

//     try {
//         const {searchParams} = new URL(request.url)
//         const queryParam = {
//             username: searchParams.get('username')
//         }
//         const username = queryParam.username

//         if(username)
//     } catch (error) {
        
//     }
// }