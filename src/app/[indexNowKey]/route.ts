import { indexNowKeyResponse } from "@/lib/indexnow";

export async function GET(_request: Request, { params }: { params: Promise<{ indexNowKey: string }> }) {
  const { indexNowKey } = await params;
  const result = indexNowKeyResponse(indexNowKey, process.env.INDEXNOW_KEY);
  return new Response(result.body, {
    status: result.status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
