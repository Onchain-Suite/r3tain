import { StackHandler, type StackServerApp } from "@stackframe/stack";
import type { NextRequest } from "next/server";

import { stackServerApp } from "@/lib/stack";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ stack: string[] }> }
) {
  const params = await context.params;

  return StackHandler({
    app: stackServerApp as StackServerApp<true, string>,
    fullPage: false,
    routeProps: { request, context: { params } },
  });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ stack: string[] }> }
) {
  const params = await context.params;

  return StackHandler({
    app: stackServerApp as StackServerApp<true, string>,
    fullPage: false,
    routeProps: { request, context: { params } },
  });
}
