import { NextResponse } from 'next/server';
import connection from '../../../../../../connection/connection';
import userModel from '../../../../../../schema/UserSchema';
import jobModel from '../../../../../../schema/JobSchema';

export async function DELETE(request) {
  try {
    await connection;
    const body = await request.json();
    const { id, type } = body;

    if (!id || !type) {
      return NextResponse.json({
        success: false,
        message: "Missing ID or type",
      }, { status: 400 });
    }

    if (type === "user") {
      await userModel.findByIdAndDelete(id);
    } else if (type === "job") {
      await jobModel.findByIdAndDelete(id);
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid delete type",
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `${type} deleted successfully`,
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}