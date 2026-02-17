import styles from "./ProfileCard.module.css";

import {
  Mail,
  Phone,
  Globe,
  Instagram,
  Linkedin,
  Ticket,
  User,
  Link as LinkIcon,
} from "lucide-react";

type Link = {
  id: string;
  url: string;
  label: string;
  icon?: string;
};

type Profile = {
  full_name?: string;
  tagline?: string;
  profile_image_url?: string;
  banner_image_url?: string;
};

type Props = {
  profile?: Profile;
  links?: Link[];
  organizationLinks?: Link[];
};

export default function ProfileCard({
  profile,
  links = [],
  organizationLinks = [],
}: Props) {

  if (!profile) return null;

  /*
    Frontend-only additional links
    These preserve backend integration while allowing design testing
  */
  const extraLinks: Link[] = [
    {
      id: "buy-tickets",
      label: "Buy Tickets",
      url: "https://tickets.solalive.com",
      icon: "ticket",
    },
    {
      id: "sola-live-website",
      label: "SoLa Live Website",
      url: "https://solalive.com",
      icon: "website",
    },
    {
      id: "sola-live-instagram",
      label: "SoLa Live Instagram",
      url: "https://instagram.com/solalive",
      icon: "instagram",
    },
  ];

  /*
    Final merged links
    Supabase links remain primary source
  */
  const allLinks = [
    ...links,
    ...organizationLinks,
    ...extraLinks,
  ];

  /*
    Lucide icon renderer
  */
  function renderIcon(icon?: string) {

    const size = 18;
    const strokeWidth = 1.75;

    switch (icon) {

      case "email":
        return <Mail size={size} strokeWidth={strokeWidth} />;

      case "phone":
        return <Phone size={size} strokeWidth={strokeWidth} />;

      case "website":
        return <Globe size={size} strokeWidth={strokeWidth} />;

      case "instagram":
        return <Instagram size={size} strokeWidth={strokeWidth} />;

      case "linkedin":
        return <Linkedin size={size} strokeWidth={strokeWidth} />;

      case "ticket":
        return <Ticket size={size} strokeWidth={strokeWidth} />;

      case "profile":
        return <User size={size} strokeWidth={strokeWidth} />;

      default:
        return <LinkIcon size={size} strokeWidth={strokeWidth} />;

    }

  }

  return (
    <div className={styles.viewport}>

      <div className={styles.card}>

        {/* Banner */}
        <div className={styles.banner}>
          {profile.banner_image_url && (
            <img src={profile.banner_image_url} alt="" />
          )}
        </div>

        {/* Avatar */}
        <div className={styles.avatar}>
          {profile.profile_image_url && (
            <img src={profile.profile_image_url} alt="" />
          )}
        </div>

        {/* Name */}
        <div className={styles.name}>
          {profile.full_name}
        </div>

        {/* Role */}
        <div className={styles.role}>
          {profile.tagline}
        </div>

        {/* Links */}
        <div className={styles.links}>

          {allLinks.map(link => (

            <a
              key={link.id}
              href={link.url}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
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

          ))}

        </div>

      </div>

    </div>
  );
}
