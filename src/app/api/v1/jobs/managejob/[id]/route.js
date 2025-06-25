import { NextResponse } from "next/server";
import jobModel from "../../../../../../../schema/JobSchema"
import connection from "../../../../../../../connection/connection";

export async function GET(request, { params }) {
    try {
        await connection;

        const Job = await jobModel.findOne({ _id: params.id })
        return NextResponse.json({
            success: true,
            data: Job
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, { status: 500 });
    }

}

export async function DELETE(request, { params }) {
  try {
    await connection;

    const jobId = params.id;
   const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");;

    if (!userId || !userRole) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized: missing user credentials",
      }, { status: 401 });
    }

    const job = await jobModel.findById(jobId);
    if (!job) {
      return NextResponse.json({
        success: false,
        message: "Job not found",
      }, { status: 404 });
    }

    // Admin can delete any job
    // Provider can only delete if they posted it
    if (userRole !== "admin" && job.postedBy.toString() !== userId) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to delete this job",
      }, { status: 403 });
    }

    await jobModel.findByIdAndDelete(jobId);

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    await connection;

    const jobId = params.id;
   const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");

    const updatedData = await request.json();

    if (!userId || !userRole) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized: missing user credentials",
      }, { status: 401 });
    }

    const job = await jobModel.findById(jobId);
    if (!job) {
      return NextResponse.json({
        success: false,
        message: "Job not found",
      }, { status: 404 });
    }

    // Only admin or provider can update
    if (userRole !== "admin" && userRole !== "provider") {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to update jobs",
      }, { status: 403 });
    }

    // Provider can only update their own job
    if (userRole === "provider" && job.postedBy.toString() !== userId) {
      return NextResponse.json({
        success: false,
        message: "You are not allowed to update this job",
      }, { status: 403 });
    }

    const updatedJob = await jobModel.findByIdAndUpdate(
      jobId,
      { $set: updatedData },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}