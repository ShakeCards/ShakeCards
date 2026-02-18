import { supabase } from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

type Params = Promise<{ cardId: string }>;

type Profile = {
  id: string;
  full_name: string | null;
  tagline: string | null;
  profile_image_url: string | null;
  banner_image_url: string | null;
  organization_id: string | null;

  instagram_url: string | null;
  linkedin_url: string | null;
  email: string | null;
};

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
        organization_id,
        instagram_url,
        linkedin_url,
        email
      )
    `)
    .eq("card_id", cardId)
    .maybeSingle();

  /*
    Handle missing card
  */
  if (cardError || !card || !card.profiles) {

    return (
      <div
        style={{
          minHeight: "100dvh",
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
    Normalize relational response safely
  */
  const profile: Profile | null = Array.isArray(card.profiles)
    ? card.profiles[0] ?? null
    : card.profiles;

  /*
    Final guard
  */
  if (!profile) {

    return (
      <div
        style={{
          minHeight: "100dvh",
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
    Render card
  */
  return (

    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        background: "#1c1c1e",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >

      <ProfileCard profile={profile} />

    </div>

  );

}
