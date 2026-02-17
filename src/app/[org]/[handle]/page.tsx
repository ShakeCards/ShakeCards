import { supabase } from "@/lib/supabase";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

export default async function Page({
  params,
}: {
  params: Promise<{ org: string; handle: string }>;
}) {

  const { org, handle } = await params;

  const { data: organization } = await supabase
    .from("organizations")
    .select("*")
    .eq("slug", org)
    .single();

  if (!organization) {
    return <div>Organization not found</div>;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("organization_id", organization.id)
    .eq("handle", handle)
    .single();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("sort_order");

  const { data: orgLinks } = await supabase
    .from("organization_links")
    .select("*")
    .eq("organization_id", organization.id)
    .order("sort_order");

  return (
    <ProfileCard
      profile={profile}
      links={links ?? []}
      organizationLinks={orgLinks ?? []}
    />
  );

}
