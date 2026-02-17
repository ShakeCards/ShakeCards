"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const [fullName, setFullName] = useState("");
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);

  async function uploadImage(file: File, bucket: string) {

    const fileName = crypto.randomUUID();

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl.publicUrl;
  }

  async function createProfile() {

    let profileImageUrl = null;
    let bannerImageUrl = null;

    if (profileImageFile) {
      profileImageUrl = await uploadImage(profileImageFile, "profile-images");
    }

    if (bannerImageFile) {
      bannerImageUrl = await uploadImage(bannerImageFile, "banner-images");
    }

    await fetch("/api/admin/create-profile", {
      method: "POST",
      body: JSON.stringify({
        fullName,
        profileImage: profileImageUrl,
        bannerImage: bannerImageUrl,
      }),
    });

  }

  return (
    <div>

      <input
        type="text"
        placeholder="Full name"
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProfileImageFile(e.target.files?.[0] ?? null)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setBannerImageFile(e.target.files?.[0] ?? null)}
      />

      <button onClick={createProfile}>
        Create Profile
      </button>

    </div>
  );
}
