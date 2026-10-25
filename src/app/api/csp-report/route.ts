// Receives Content-Security-Policy-Report-Only violations (see next.config.ts)
// and writes them to the function log. Nothing is stored.
export async function POST(request: Request) {
  const body = (await request.text()).slice(0, 4000);
  console.warn("csp-report", body);
  return new Response(null, { status: 204 });
}
