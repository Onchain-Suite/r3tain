import { type NextRequest, NextResponse } from "next/server";

import {
  addUserToProject,
  getProjectMembers,
  removeUserFromProject,
  updateUserRoleInProject,
} from "@/lib/projects";
import { stackServerApp } from "@/lib/stack";

interface RouteParams {
  params: {
    projectId: string;
  };
}

// Get project members
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const members = await getProjectMembers(params.projectId);
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error getting project members:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Add user to project
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, role = "member" } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const memberId = await addUserToProject(
      params.projectId,
      userId,
      role,
      user.id // inviter
    );

    return NextResponse.json({ success: true, memberId });
  } catch (error) {
    console.error("Error adding user to project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update user role or remove user from project
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId, role, action } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (action === "remove") {
      await removeUserFromProject(params.projectId, userId);
      return NextResponse.json({ success: true });
    } else if (role) {
      const updatedMember = await updateUserRoleInProject(
        params.projectId,
        userId,
        role
      );
      return NextResponse.json({ success: true, member: updatedMember });
    } else {
      return NextResponse.json(
        { error: "Either role or action=remove is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating project member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
