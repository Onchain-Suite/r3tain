import { prisma } from "@/lib/prisma";

export interface UserProject {
  projectId: string;
  projectName: string;
  projectSlug: string;
  organizationName: string | null;
  userRole: string;
  isActive: boolean;
  joinedAt: Date;
}

/**
 * Add a user to a project
 */
export async function addUserToProject(
  projectId: string,
  userId: string,
  role: "owner" | "admin" | "member" | "viewer" = "member",
  invitedBy?: string
): Promise<string> {
  // Check if user is already a member
  const existingMember = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  if (existingMember) {
    // Update existing member
    const updatedMember = await prisma.projectMember.update({
      where: { id: existingMember.id },
      data: {
        role,
        isActive: true,
        updatedAt: new Date(),
      },
    });
    return updatedMember.id;
  }

  // Create new project member
  const member = await prisma.projectMember.create({
    data: {
      projectId,
      userId,
      role,
      invitedBy,
      invitedAt: invitedBy ? new Date() : null,
    },
  });

  // Create onboarding progress for the new project member
  await prisma.onboardingProgress.create({
    data: {
      userId,
      projectId,
      currentStep: "welcome",
      totalSteps: 5,
    },
  });

  return member.id;
}

/**
 * Remove a user from a project
 */
export async function removeUserFromProject(
  projectId: string,
  userId: string
): Promise<void> {
  await prisma.projectMember.update({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
    data: {
      isActive: false,
      updatedAt: new Date(),
    },
  });
}

/**
 * Get all projects a user has access to
 */
export async function getUserProjects(userId: string): Promise<UserProject[]> {
  const projectMembers = await prisma.projectMember.findMany({
    where: {
      userId,
      isActive: true,
    },
    include: {
      project: {
        include: {
          organization: true,
        },
      },
    },
    orderBy: {
      joinedAt: "desc",
    },
  });

  return projectMembers
    .filter((member) => member.project.isActive)
    .map((member) => ({
      projectId: member.project.id,
      projectName: member.project.name,
      projectSlug: member.project.slug,
      organizationName: member.project.organization?.name ?? null,
      userRole: member.role,
      isActive: member.isActive,
      joinedAt: member.joinedAt,
    }));
}

/**
 * Get project members
 */
export async function getProjectMembers(projectId: string) {
  return await prisma.projectMember.findMany({
    where: {
      projectId,
      isActive: true,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
      inviter: {
        select: {
          id: true,
          email: true,
        },
      },
    },
    orderBy: {
      joinedAt: "asc",
    },
  });
}

/**
 * Update user's role in a project
 */
export async function updateUserRoleInProject(
  projectId: string,
  userId: string,
  newRole: "owner" | "admin" | "member" | "viewer"
) {
  return await prisma.projectMember.update({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
    data: {
      role: newRole,
      updatedAt: new Date(),
    },
  });
}

/**
 * Check if user has access to a project
 */
export async function userHasProjectAccess(
  userId: string,
  projectId: string
): Promise<boolean> {
  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  return member?.isActive === true;
}

/**
 * Get user's role in a project
 */
export async function getUserRoleInProject(
  userId: string,
  projectId: string
): Promise<string | null> {
  const member = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId,
      },
    },
  });

  return member?.isActive ? member.role : null;
}

/**
 * Create a new project
 */
export async function createProject(
  name: string,
  slug: string,
  description: string | null,
  organizationId: string | null,
  ownerId: string
) {
  const project = await prisma.project.create({
    data: {
      name,
      slug,
      description,
      organizationId,
    },
  });

  // Add the creator as the owner
  await addUserToProject(project.id, ownerId, "owner");

  return project;
}

/**
 * Get project by ID with organization details
 */
export async function getProjectById(projectId: string) {
  return await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      organization: true,
      projectMembers: {
        where: { isActive: true },
        include: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Switch user's current project (this would be stored in session/context)
 */
export async function switchUserProject(
  userId: string,
  projectId: string
): Promise<boolean> {
  const hasAccess = await userHasProjectAccess(userId, projectId);

  if (!hasAccess) {
    throw new Error("User does not have access to this project");
  }

  // Update user's last active time
  await prisma.user.update({
    where: { id: userId },
    data: { lastActiveAt: new Date() },
  });

  return true;
}
