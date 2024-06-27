import { authOptions } from "@/lib/authOptions";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let user = await User.findOne({ id: session?.user.id });

    if (!user) {
      user = await User.create({ id: session.user.id });
      await user.save();
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[users_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
