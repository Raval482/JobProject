import { NextResponse } from "next/server";
import connection from "../../../../../../connection/connection";
import jobModel from "../../../../../../schema/JobSchema";



export async function GET(request) {
    try {
        const userId = request.headers.get("x-user-id");
        const userRole = request.headers.get("x-user-role");
        await connection;

        if (userRole === "admin") {
            const allJob = await jobModel.find({ postedBy: userId })
            return NextResponse.json({
                success: true,
                data: allJob
            }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }

}

