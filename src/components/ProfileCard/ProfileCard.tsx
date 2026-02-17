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
  full_name?: string | null;
  tagline?: string | null;
  profile_image_url?: string | null;
  banner_image_url?: string | null;
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

  const allLinks = [
    ...links,
    ...organizationLinks,
    ...extraLinks,
  ];

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

      <div className={styles.scaleWrapper}>

        <div className={styles.card}>

          <div className={styles.banner}>
            {profile.banner_image_url && (
              <img src={profile.banner_image_url} alt="" />
            )}
          </div>

          <div className={styles.avatar}>
            {profile.profile_image_url && (
              <img src={profile.profile_image_url} alt="" />
            )}
          </div>

          <div className={styles.name}>
            {profile.full_name}
          </div>

          <div className={styles.role}>
            {profile.tagline}
          </div>

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

    </div>
  );
}
