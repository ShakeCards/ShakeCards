import styles from "./ProfileCard.module.css";

export default function ProfileCard({
  profile,
  links,
  organizationLinks,
}: any) {

  // Critical guard — prevents build crashes
  if (!profile) {
    return null;
  }

  const safeLinks = links ?? [];
  const safeOrgLinks = organizationLinks ?? [];

  return (

    <div className={styles.wrapper}>

      <div className={styles.card}>

        {/* Banner */}
        <div className={styles.cover}>
          {profile?.banner_image_url && (
            <img src={profile.banner_image_url} alt="" />
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* Header */}
          <div className={styles.header}>

            <div className={styles.avatar}>
              {profile?.profile_image_url && (
                <img src={profile.profile_image_url} alt="" />
              )}
            </div>

            <div className={styles.textBlock}>

              <div className={styles.title}>
                {profile?.full_name}
              </div>

              {profile?.tagline && (
                <div className={styles.tagline}>
                  {profile.tagline}
                </div>
              )}

            </div>

          </div>

          {/* Personal Links */}
          <div className={styles.links}>

            {safeLinks.map((link: any) => (

              <a
                key={link.id}
                href={link.url}
                className={styles.link}
                target="_blank"
              >

                <div className={styles.left}>
                  <div className={styles.icon}>•</div>

                  <div className={styles.label}>
                    {link.label}
                  </div>
                </div>

                <div className={styles.arrow}>→</div>

              </a>

            ))}

            {/* Program Links */}
            {safeOrgLinks.length > 0 && (

              <>
                <div className={styles.sectionLabel}>
                  SoLa Live Accelerator
                </div>

                {safeOrgLinks.map((link: any) => (

                  <a
                    key={link.id}
                    href={link.url}
                    className={styles.link}
                    target="_blank"
                  >

                    <div className={styles.left}>
                      <div className={styles.icon}>•</div>

                      <div className={styles.label}>
                        {link.label}
                      </div>
                    </div>

                    <div className={styles.arrow}>→</div>

                  </a>

                ))}

              </>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}
