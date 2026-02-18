import styles from "./ProfileCard.module.css";

import { Profile } from "@/types/profile";

import {
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  User,
  Link as LinkIcon,
} from "lucide-react";

type Link = {
  id: string;
  url: string;
  label: string;
  icon?: string;
};

type Props = {
  profile?: Profile;
};

export default function ProfileCard({ profile }: Props) {

  if (!profile) return null;

  /**
   * PROGRAM LINKS (BOTTOM BUTTONS)
   * Static — always the accelerator links
   */
  const programLinks: Link[] = [
    {
      id: "program-website",
      label: "SoLa Live Accelerator Website",
      url: "https://solaliveaccelerator.com",
      icon: "website",
    },
    {
      id: "program-instagram",
      label: "SoLa Live Accelerator Instagram",
      url: "https://instagram.com/solaliveaccelerator",
      icon: "instagram",
    },
  ];

  /**
   * PERSONAL LINKS (TOP SOCIAL ICONS)
   * Dynamic — pulled from profile
   */
  const socialLinks: Link[] = [
    profile.instagram_url && {
      id: "instagram",
      label: "Instagram",
      url: profile.instagram_url,
      icon: "instagram",
    },

    profile.linkedin_url && {
      id: "linkedin",
      label: "LinkedIn",
      url: profile.linkedin_url,
      icon: "linkedin",
    },

    profile.email && {
      id: "email",
      label: "Email",
      url: `mailto:${profile.email}`,
      icon: "email",
    },

  ].filter(Boolean) as Link[];

  function isEmailLink(url: string) {
    return url.startsWith("mailto:");
  }

  /**
   * BUTTON ICON RENDER
   */
  function renderIcon(icon?: string) {

    const size = 20;

    switch (icon) {

      case "email":
        return <Mail size={size} />;

      case "phone":
        return <Phone size={size} />;

      case "website":
        return <Globe size={size} />;

      case "instagram":
        return <Instagram size={size} />;

      case "linkedin":
        return <Linkedin size={size} />;

      case "facebook":
        return <Facebook size={size} />;

      case "twitter":
        return <Twitter size={size} />;

      case "youtube":
        return <Youtube size={size} />;

      case "profile":
        return <User size={size} />;

      default:
        return <LinkIcon size={size} />;

    }

  }

  /**
   * SOCIAL ICON RENDER
   */
  function renderSocialIcon(icon?: string) {

    const size = 26;

    switch (icon) {

      case "instagram":
        return <Instagram size={size} />;

      case "linkedin":
        return <Linkedin size={size} />;

      case "email":
        return <Mail size={size} />;

      case "website":
        return <Globe size={size} />;

      case "facebook":
        return <Facebook size={size} />;

      case "twitter":
        return <Twitter size={size} />;

      case "youtube":
        return <Youtube size={size} />;

      default:
        return null;

    }

  }

  return (
    <div className={styles.viewport}>

      <div className={styles.scaleWrapper}>

        <div className={styles.card}>

          {/* Banner */}
          <div className={styles.banner}>
            {profile.banner_image_url && (
              <img
                src={profile.banner_image_url}
                alt="Banner"
              />
            )}
          </div>

          {/* Avatar */}
          <div className={styles.avatar}>
            {profile.profile_image_url && (
              <img
                src={profile.profile_image_url}
                alt={profile.full_name ?? "Profile"}
              />
            )}
          </div>

          {/* Name */}
          <div className={styles.name}>
            {profile.full_name}
          </div>

          {/* Tagline */}
          <div className={styles.role}>
            {profile.tagline}
          </div>

          {/* PERSONAL SOCIAL ICONS */}
          <div className={styles.socialRow}>

            {socialLinks.map(link => {

              const isEmail = isEmailLink(link.url);

              return (
                <a
                  key={link.id}
                  href={link.url}
                  className={styles.socialIcon}
                  {...(!isEmail && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {renderSocialIcon(link.icon)}
                </a>
              );

            })}

          </div>

          {/* PROGRAM BUTTON LINKS */}
          <div className={styles.links}>

            {programLinks.map(link => {

              const isEmail = isEmailLink(link.url);

              return (
                <a
                  key={link.id}
                  href={link.url}
                  className={styles.link}
                  {...(!isEmail && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >

                  <div className={styles.linkLeft}>

                    <div className={styles.icon}>
                      {renderIcon(link.icon)}
                    </div>

                    <div className={styles.linkLabel}>
                      {link.label}
                    </div>

                  </div>

                </a>
              );

            })}

          </div>

        </div>

      </div>

    </div>
  );
}
