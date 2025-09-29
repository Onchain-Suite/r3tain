import { type ReactNode } from "react";

import { ProtectedLayout } from "@/guard/auth.guard";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default DashboardLayout;
