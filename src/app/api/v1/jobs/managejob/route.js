import { NextResponse } from "next/server";
import jobModel from "../../../../../../schema/JobSchema"
import connection from "../../../../../../connection/connection";

export async function POST(request) {
  try {
    await connection;

    const userId = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");

    if (!userId || !userRole) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized: Missing headers",
      }, { status: 401 });
    }

    if (userRole !== "provider" && userRole !== "admin") {
      return NextResponse.json({
        success: false,
        message: "Access denied. Only providers or admins can post jobs.",
      }, { status: 403 });
    }

    const body = await request.json();

    const { title, company, description, location, salary, type } = body;

    if (!title || !company || !description || !location) {
      return NextResponse.json({
        success: false,
        message: "Please fill all required fields",
      }, { status: 400 });
    }

    const newJob = await jobModel.create({
      title,
      company,
      description,
      location,
      salary,
      type,
      postedBy: userId,
    });

    return NextResponse.json({
      success: true,
      message: "Job posted successfully",
      data: newJob,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}


export async function GET(request) {
  try {

    const userId = request.headers.get("x-user-id");
    console.log(userId)
    const userRole = request.headers.get("x-user-role");
    await connection;

    if (userRole === "provider") {
      const allJob = await jobModel.find({ postedBy: userId })
      return NextResponse.json({
        success: true,
        data: allJob
      }, { status: 200 })
    } else {
      const allJob = await jobModel.find({})
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