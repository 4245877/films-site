export const dynamic = "force-static";

export async function GET(_req: Request) {
  return new Response("Not available on GitHub Pages (static site).", { status: 404 });
}

export async function POST(_req: Request) {
  return new Response("Not available on GitHub Pages (static site).", { status: 404 });
}
