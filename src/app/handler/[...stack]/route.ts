import { StackHandler, type StackServerApp } from "@stackframe/stack";
// GET handler
import type { NextRequest } from "next/server";

import { stackServerApp } from "@/lib/stack";

export async function GET(
  request: NextRequest,
  context: { params: { stack: string[] } }
) {
  const res = await StackHandler({
    app: stackServerApp as StackServerApp<true, string>,
    fullPage: false,
    routeProps: { request, context },
  });

  return res ?? new Response("StackHandler returned nothing", { status: 500 });
}

export async function POST(
  request: NextRequest,
  context: { params: { stack: string[] } }
) {
  const res = await StackHandler({
    app: stackServerApp as StackServerApp<true, string>,
    fullPage: false,
    routeProps: { request, context },
  });

  return res ?? new Response("StackHandler returned nothing", { status: 500 });
}
