import { NextResponse } from "next/server";
import connection from "../../../../../../connection/connection";
import applicationModel from "../../../../../../schema/ApplicationSchema";
import jobModel from "../../../../../../schema/JobSchema";
import userModel from "../../../../../../schema/UserSchema";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connection;

    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");

    // ✅ Validate jobId
    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid or missing jobId",
      }, { status: 400 });
    }

    // ✅ Fetch only relevant application and user data
    const applications = await applicationModel.find({ jobId: new mongoose.Types.ObjectId(jobId) })
      .select("status message userId") // only needed fields from application
      .populate({
        path: "userId",
        select: "name email", // only needed fields from user
        model: userModel,
      });

    // ✅ Format result
    const result = applications.map(app => ({
      _id: app._id,
      status: app.status,
      message: app.message,
      user: {
        name: app.userId.name,
        email: app.userId.email,
      },
    }));

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    await connection;

    const userRole = request.headers.get("x-user-role");
    const reviewerId = request.headers.get("x-user-id");

    if (userRole === "user" ) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized"
      }, { status: 403 });
    }

    const { applicationId, status, rejectionMessage } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields"
      }, { status: 400 });
    }

    const updateFields = {
      status,
      reviewedBy: reviewerId,
    };

    if (status === "rejected") {
      if (!rejectionMessage) {
        return NextResponse.json({
          success: false,
          message: "Rejection reason is required"
        }, { status: 400 });
      }
      updateFields.rejectionMessage = rejectionMessage;
    }

    const updatedApp = await applicationModel.findByIdAndUpdate(
      applicationId,
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApp
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}