"use client";

import { useState } from "react";

export default function AdminPage() {

  const [org, setOrg] = useState("solalive");
  const [handle, setHandle] = useState("");
  const [fullName, setFullName] = useState("");
  const [tagline, setTagline] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function createProfile() {

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/admin/create-profile", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        org,
        handle,
        fullName,
        tagline,
        profileImage,
        bannerImage,

      }),

    });

    const data = await res.json();

    setLoading(false);

    if (data.error) {
      setMessage(data.error);
    } else {
      setMessage("Profile created successfully.");
    }

  }

  return (

    <div style={{ padding: 40, maxWidth: 500 }}>

      <h1>Shakecards Admin</h1>

      <input
        placeholder="handle (example: jane)"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />

      <input
        placeholder="full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        placeholder="tagline"
        value={tagline}
        onChange={(e) => setTagline(e.target.value)}
      />

      <input
        placeholder="profile image url"
        value={profileImage}
        onChange={(e) => setProfileImage(e.target.value)}
      />

      <input
        placeholder="banner image url"
        value={bannerImage}
        onChange={(e) => setBannerImage(e.target.value)}
      />

      <button onClick={createProfile} disabled={loading}>

        {loading ? "Creating..." : "Create Profile"}

      </button>

      {message && (
        <div style={{ marginTop: 20 }}>
          {message}
        </div>
      )}

    </div>

  );

}
