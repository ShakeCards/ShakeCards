import styles from "./ProfileCard.module.css";

export default function ProfileCard({
  profile,
  links,
  organizationLinks,
}: any) {

  return (

    <div className={styles.wrapper}>

      <div className={styles.card}>

        {/* Banner */}
        <div className={styles.cover}>
          {profile.banner_image_url && (
            <img src={profile.banner_image_url} />
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>

          {/* Header */}
          <div className={styles.header}>

            <div className={styles.avatar}>
              {profile.profile_image_url && (
                <img src={profile.profile_image_url} />
              )}
            </div>

            <div className={styles.textBlock}>

              <div className={styles.title}>
                {profile.full_name}
              </div>

              {profile.tagline && (
                <div className={styles.tagline}>
                  {profile.tagline}
                </div>
              )}

            </div>

          </div>

          {/* Personal Links */}
          <div className={styles.links}>

            {links.map((link: any) => (

              <a
                key={link.id}
                href={link.url}
                className={styles.link}
                target="_blank"
              >

                <div className={styles.left}>
                  <div className={styles.icon}>
                    •
                  </div>

                  <div className={styles.label}>
                    {link.label}
                  </div>
                </div>

                <div className={styles.arrow}>
                  →
                </div>

              </a>

            ))}

            {/* Program Section */}
            {organizationLinks.length > 0 && (

              <>
                <div className={styles.sectionLabel}>
                  SoLa Live Accelerator
                </div>

                {organizationLinks.map((link: any) => (

                  <a
                    key={link.id}
                    href={link.url}
                    className={styles.link}
                    target="_blank"
                  >

                    <div className={styles.left}>
                      <div className={styles.icon}>
                        •
                      </div>

                      <div className={styles.label}>
                        {link.label}
                      </div>
                    </div>

                    <div className={styles.arrow}>
                      →
                    </div>

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
