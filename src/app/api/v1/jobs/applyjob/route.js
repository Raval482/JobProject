import { NextResponse } from "next/server";
import connection from "../../../../../../connection/connection";
import applicationModel from "../../../../../../schema/ApplicationSchema";

export async function POST(request) {
  try {
    await connection

    const userId = request.headers.get("x-user-id"); // From middleware
  

    const { jobId, message } = await request.json();

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized: User ID missing",
      }, { status: 401 });
    }

    if (!jobId || !message) {
      return NextResponse.json({
        success: false,
        message: "Job ID and message are required",
      }, { status: 400 });
    }
    
    const existingApplication = await applicationModel.findOne({ jobId, userId });
    if (existingApplication) {
      return NextResponse.json({
        success: false,
        message: "You have already applied for this job",
      }, { status: 409 });
    }

    const newApplication = await applicationModel.create({
      jobId,
      userId,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Job application submitted successfully",
      data: newApplication,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}
