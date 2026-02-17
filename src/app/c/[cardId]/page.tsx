import { supabase } from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

export default async function Page({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {

  const { cardId } = await params;

  const { data: card } = await supabase
    .from("cards")
    .select(`
      *,
      profiles (*)
    `)
    .eq("card_id", cardId)
    .single();

  if (!card) return <div>Card not found</div>;

  const profile = card.profiles;

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("sort_order");

  const { data: orgLinks } = await supabase
    .from("organization_links")
    .select("*")
    .eq("organization_id", profile.organization_id)
    .order("sort_order");

  return (
    <ProfileCard
      profile={profile}
      links={links ?? []}
      organizationLinks={orgLinks ?? []}
    />
  );
}
