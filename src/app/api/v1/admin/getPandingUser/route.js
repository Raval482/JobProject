import { NextResponse } from "next/server";
import userModel from "../../../../../../schema/UserSchema";
import connection from "../../../../../../connection/connection";



export async function GET(request) {
    try {
        await connection
        const userRole = request.headers.get("x-user-role");
        if (userRole === "admin") {
            const pendingUserData = await userModel.find({ status: { $ne: "active" } });

            return NextResponse.json({
                success: true,
                data: pendingUserData
            }, { status: 200 })


        } else {
            return NextResponse.json({
                success: true,
                message: "You are not Authorize"
            }, { status: 403 })
        }

    } catch (error) {
        return NextResponse.json({
            success: true,
            message: error.message
        }, { status: 500 })
    }
}