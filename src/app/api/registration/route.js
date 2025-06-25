import { NextResponse } from "next/server";
import userModel from "../../../../schema/UserSchema";
import connection from "../../../../connection/connection"


export async function POST(request) {
    try {
        await connection
        const { name, email, password } = await request.json()

        const existUser = await userModel.findOne({ email: email })
        if (!existUser) {
            const userData = new userModel({
                name: name,
                email: email,
                password: password,
                role: email === "raval@gmail.com" ? "admin" : "user",
                status: email === "raval@gmail.com" ? "active" : "pending",
            })
            await userData.save()

            return NextResponse.json({
                status: 200,
                success: true,
                message: "user Registration SuccessFully"
            })
        } else {
            return NextResponse.json({
                status: 403,
                success: true,
                message: "user Is Already  Registed "
            })
        }

    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: true,
            message: error.message
        })
    }
}