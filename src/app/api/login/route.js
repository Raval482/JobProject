import { NextResponse } from "next/server"
import userModal from "../../../../schema/UserSchema"
import connection from "../../../../connection/connection"
import { generateToken } from "../../../../lib/utils/jwt"

export async function POST(request) {
    try {
        await connection
        const { email, password } = await request.json()
        const user = await userModal.findOne({ email: email })
        if (!user) {
            return NextResponse.json({
                status: 404,
                success: false,
                message: "User not Found"
            })
        } else {
            const checkPassword = user.password === password
            if (checkPassword) {
                if (user.status === "active") {
                    const token = await generateToken({
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role,
                        status: user.status
                    })
                  const response =  NextResponse.json({
                        data: user,
                        success: true,
                        message: "Login Successfully",
                        token: token

                    }, { status: 200 })
                    response.cookies.set('token', token)
                    return response
                } else {
                    return NextResponse.json({
                        success: false,
                        message: `You are not Verify because your status is a ${user.status} `
                    }, { status: 403 })
                }

            } else {
                return NextResponse.json({
                    success: false,
                    message: "Your password is Wrong"
                }, {
                    status: 404
                }
                )
            }
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        },
            {
                status: 500,
            })
    }
}