"use client";

import { ImportProvider } from "@/community/context";

export default function AddSubscribersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ImportProvider>{children}</ImportProvider>;
}
