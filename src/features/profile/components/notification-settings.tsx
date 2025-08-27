"use client";

import {
  Bell,
  type LucideIcon,
  Mail,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface NotificationPreferences {
  email_campaigns: boolean;
  email_reports: boolean;
  email_security: boolean;
  push_campaigns: boolean;
  push_reports: boolean;
  push_security: boolean;
  marketing_emails: boolean;
  product_updates: boolean;
}

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);

  // Default preferences
  const currentPreferences: NotificationPreferences = {
    email_campaigns: true,
    email_reports: true,
    email_security: true,
    push_campaigns: true,
    push_reports: false,
    push_security: true,
    marketing_emails: false,
    product_updates: true,
  };

  const [preferences, setPreferences] =
    useState<NotificationPreferences>(currentPreferences);

  const updatePreference = (
    key: keyof NotificationPreferences,
    value: boolean
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const savePreferences = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to update notification preferences", {
          description: errorData.error ?? "An error occurred",
        });
        return;
      }

      toast.success("Notification preferences updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const NotificationItem = ({
    icon: Icon,
    title,
    description,
    checked,
    onCheckedChange,
  }: {
    icon: LucideIcon;
    title: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
  }) => (
    <div className="flex items-center justify-between space-x-4 p-4">
      <div className="flex items-start space-x-3">
        <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <div className="space-y-1">
          <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {title}
          </Label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Choose what email notifications you&apos;d like to receive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <NotificationItem
            icon={TrendingUp}
            title="Campaign Updates"
            description="Get notified about your campaign performance and results"
            checked={preferences.email_campaigns}
            onCheckedChange={(checked) =>
              updatePreference("email_campaigns", checked)
            }
          />
          <Separator />
          <NotificationItem
            icon={TrendingUp}
            title="Analytics Reports"
            description="Weekly and monthly analytics reports"
            checked={preferences.email_reports}
            onCheckedChange={(checked) =>
              updatePreference("email_reports", checked)
            }
          />
          <Separator />
          <NotificationItem
            icon={Bell}
            title="Security Alerts"
            description="Important security updates and login alerts"
            checked={preferences.email_security}
            onCheckedChange={(checked) =>
              updatePreference("email_security", checked)
            }
          />
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Manage your browser and mobile push notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <NotificationItem
            icon={MessageSquare}
            title="Campaign Alerts"
            description="Real-time notifications for campaign milestones"
            checked={preferences.push_campaigns}
            onCheckedChange={(checked) =>
              updatePreference("push_campaigns", checked)
            }
          />
          <Separator />
          <NotificationItem
            icon={TrendingUp}
            title="Performance Updates"
            description="Notifications about significant performance changes"
            checked={preferences.push_reports}
            onCheckedChange={(checked) =>
              updatePreference("push_reports", checked)
            }
          />
          <Separator />
          <NotificationItem
            icon={Bell}
            title="Security Notifications"
            description="Immediate alerts for security-related events"
            checked={preferences.push_security}
            onCheckedChange={(checked) =>
              updatePreference("push_security", checked)
            }
          />
        </CardContent>
      </Card>

      {/* Marketing & Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Marketing & Updates
          </CardTitle>
          <CardDescription>
            Stay informed about new features and marketing insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <NotificationItem
            icon={Mail}
            title="Marketing Tips"
            description="Best practices and tips to improve your campaigns"
            checked={preferences.marketing_emails}
            onCheckedChange={(checked) =>
              updatePreference("marketing_emails", checked)
            }
          />
          <Separator />
          <NotificationItem
            icon={Bell}
            title="Product Updates"
            description="New features, improvements, and platform updates"
            checked={preferences.product_updates}
            onCheckedChange={(checked) =>
              updatePreference("product_updates", checked)
            }
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={savePreferences} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
