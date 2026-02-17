import { supabase } from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

type Params = Promise<{ cardId: string }>;

export default async function Page({
  params,
}: {
  params: Params;
}) {

  const { cardId } = await params;

  if (!cardId) {
    return null;
  }

  /*
    Fetch card and joined profile
  */
  const { data: card, error: cardError } = await supabase
    .from("cards")
    .select(`
      card_id,
      profiles (
        id,
        full_name,
        tagline,
        profile_image_url,
        banner_image_url,
        organization_id
      )
    `)
    .eq("card_id", cardId)
    .maybeSingle();

  /*
    Handle missing card or profile safely
  */
  if (cardError || !card || !card.profiles) {

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#1c1c1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        Card not found
      </div>
    );

  }

  /*
    Normalize Supabase relational response
    Supabase may return either:
    profiles: Profile
    OR
    profiles: Profile[]
  */
  const profile = Array.isArray(card.profiles)
    ? card.profiles[0]
    : card.profiles;

  /*
    Final safety guard
  */
  if (!profile) {

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#1c1c1e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
        }}
      >
        Profile missing
      </div>
    );

  }

  /*
    Fetch personal links
  */
  const { data: links, error: linksError } = await supabase
    .from("links")
    .select(`
      id,
      label,
      url,
      icon,
      sort_order
    `)
    .eq("profile_id", profile.id)
    .order("sort_order", { ascending: true });

  /*
    Fetch organization links
  */
  const { data: organizationLinks, error: orgError } = await supabase
    .from("organization_links")
    .select(`
      id,
      label,
      url,
      icon,
      sort_order
    `)
    .eq("organization_id", profile.organization_id)
    .order("sort_order", { ascending: true });

  /*
    Render card
  */
  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1c1c1e",
      }}
    >

      <ProfileCard
        profile={profile}
        links={links ?? []}
        organizationLinks={organizationLinks ?? []}
      />

    </div>

  );

}
