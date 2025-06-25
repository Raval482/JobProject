import { NextResponse } from 'next/server';
import connection from '../../../../../../connection/connection';
import userModel from '../../../../../../schema/UserSchema';

export async function PUT(request, { params }) {
  try {
    await connection

    const userIdFromHeader = request.headers.get("x-user-id");
    const userIdFromParam = params.id;


    if (!userIdFromHeader || userIdFromHeader !== userIdFromParam) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized: You can only change your own password",
      }, { status: 401 });
    }

    const { oldPassword, newPassword } = await request.json();

    if (!oldPassword || !newPassword) {
      return NextResponse.json({
        success: false,
        message: "Both old and new passwords are required",
      }, { status: 400 });
    }

    const user = await userModel.findById(userIdFromHeader);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      }, { status: 404 });
    }

    if (user.password !== oldPassword) {
      return NextResponse.json({
        success: false,
        message: "Old password is incorrect",
      }, { status: 403 });
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    }, { status: 500 });
  }
}
