import { stackServerApp } from "@/lib/stack";

export async function GET(request: Request) {
  return stackServerApp.handler(request);
}

export async function POST(request: Request) {
  return stackServerApp.handler(request);
}
