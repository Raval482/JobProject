import { NextResponse } from "next/server";
import connection from "../../../../../connection/connection";
import userModal from "../../../../../schema/UserSchema"

export async function GET(request) {
    try {
        await connection
         const userId = request.headers.get("x-user-id");
         const data = await userModal.findOne({_id : userId })

         return NextResponse.json({
            success : true,
            data : data
         },{status:200})

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
}