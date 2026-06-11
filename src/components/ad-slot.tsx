export function AdSlot({ className = "" }: { className?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
  if (!client || !slot) return null;
  return <aside className={`ad-slot ${className}`.trim()} aria-label="광고"><span>광고</span><ins className="adsbygoogle" data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" /></aside>;
}
