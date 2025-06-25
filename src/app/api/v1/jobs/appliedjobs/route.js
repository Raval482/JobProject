import { NextResponse } from "next/server";

import applicationModel from "../../../../../../schema/ApplicationSchema";
import connection from "../../../../../../connection/connection";

export async function GET(request) {
  try {
    await connection;

    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const applications = await applicationModel.find({ userId })
      .populate("jobId", "title company location salary")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: applications
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
