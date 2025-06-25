import { NextResponse } from "next/server";
import userModel from "../../../../../../schema/UserSchema";
import connection from "../../../../../../connection/connection";


export async function PUT(request) {
    try {
        const userRole = request.headers.get("x-user-role");

        await connection

        if (userRole === "admin") {

            const { userId, status } = await request.json()

            await userModel.updateOne({ _id: userId }, {
                $set: {
                    status: status
                }
            })

            return NextResponse.json({
                message: "User Status Update SuccessFully  "
            })


        } else {
            return NextResponse.json({
                message: "You are not Authorize person",
                success: false
            }, { status: 403 })
        }

    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false
        }, { status: 500 })
    }
}