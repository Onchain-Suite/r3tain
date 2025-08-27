"use client";

import { useUser } from "@stackframe/stack";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

interface UserProfile {
  name?: string;
  email?: string;
  profilePicture?: string;
  createdAt?: string;
}

export function ProfileHeader() {
  const user = useUser();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fetch user profile data from our database
      const fetchUserProfile = async () => {
        try {
          const response = await fetch("/api/user/profile");
          if (response.ok) {
            const profile = await response.json();
            setUserProfile(profile);
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Loading profile...</p>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            Please sign in to view your profile.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Use Stack Auth data as primary source, with database profile as fallback
  const displayName =
    user.displayName ??
    userProfile?.name ??
    user.primaryEmail?.split("@")[0] ??
    "User";
  const profileImage = user.profileImageUrl ?? userProfile?.profilePicture;
  const email = user.primaryEmail ?? userProfile?.email ?? "";
  const joinDate = userProfile?.createdAt
    ? `Member since ${format(new Date(userProfile.createdAt), "MMM yyyy")}`
    : "Member";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={profileImage ?? undefined}
              alt={displayName}
              className="object-cover"
            />
            <AvatarFallback className="text-lg">
              {getInitials(displayName)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div>
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <p className="text-muted-foreground">{email}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{joinDate}</Badge>
              {user.primaryEmailVerified && (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Verified
                </Badge>
              )}
              {user.profileImageUrl && (
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Google Account
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
