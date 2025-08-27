import { type NextRequest, NextResponse } from "next/server";

import { createProject, getUserProjects } from "@/lib/projects";
import { stackServerApp } from "@/lib/stack";

// Get user's projects
export async function GET() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await getUserProjects(user.id);
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error getting user projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create a new project
export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, organizationId } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    const project = await createProject(
      name,
      slug,
      description ?? null,
      organizationId ?? null,
      user.id
    );

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
