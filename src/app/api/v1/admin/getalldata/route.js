import connection from "../../../../../../connection/connection";
import userModal from "../../../../../../schema/UserSchema"
import jobModal from "../../../../../../schema/JobSchema"
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connection
        const userRole = request.headers.get("x-user-role");
        if(userRole === "admin"){
            const userData = await userModal.find({status : "active"})
            const jobData = await jobModal.find({})

            return NextResponse.json({
                success:true,
                data : {
                    userData,
                    jobData
                }
            },{status : 200})
        }else{
             NextResponse.json({
                success:false,
                message : "You are not admin you are not authorize"
            },{status : 403})
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }
}   