import { StackHandler, type StackServerApp } from "@stackframe/stack";

import { stackServerApp } from "@/lib/stack";

export async function GET() {
  return StackHandler({
    app: stackServerApp as StackServerApp<true, string>,
    fullPage: false,
  });
}

export async function POST() {
  return StackHandler({
    app: stackServerApp as StackServerApp<true, string>,
    fullPage: false,
  });
}
