import React from "react";

import Link from "next/link";

import styles from "./sectionCard.module.css";
import Card from "./Card";

const Sectioncard = ({ title, videos = [], size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => (
          <Link href={`/video/${video.id}`}>
            <a>
              <Card id={index} key={index} imgUrl={video.imgUrl} size={size} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Sectioncard;
